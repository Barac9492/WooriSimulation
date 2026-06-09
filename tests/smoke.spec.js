// Real-browser smoke test. Exists because node tests stub Chart.js, so chart
// callbacks/plugins never run there — which is exactly how the blank-screen
// incident (#7, a wrong Chart.js v4 legend-filter signature) slipped through.
// This loads the actual index.html in headless Chromium, exercises both tabs,
// hover, and every scenario, and fails on ANY console/page error or any card
// that failed to render (#render-warn).
const { test, expect } = require('@playwright/test');
const path = require('path');

const url = 'file://' + path.resolve(__dirname, '..', 'index.html');

test('boots, renders charts on both tabs, hover + every scenario, no errors', async ({ page }) => {
  const errors = [];
  // Uncaught exceptions (the blank-screen class, e.g. incident #7) are the primary signal.
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  // Console errors too, but ignore resource/network noise (file:// favicon, CDN hiccups)
  // so the test fails on real JS errors only.
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/Failed to load resource|favicon|net::ERR|ERR_FILE_NOT_FOUND/i.test(t)) return;
    errors.push('console: ' + t);
  });

  await page.goto(url);

  // Boot finishes when the loading panel is hidden (renderAll ran).
  await page.waitForFunction(() => {
    const l = document.getElementById('loading');
    return l && l.hidden === true;
  }, null, { timeout: 20000 });

  // At least one chart instance was actually created (pastor tab).
  const pastorCharts = await page.evaluate(() => (window.charts ? Object.keys(window.charts).length : 0));
  expect(pastorCharts, 'pastor tab should have rendered at least one chart').toBeGreaterThan(0);

  // Team tab forces the heavy renderers + all plugins (bands, crosshair, event shading).
  await page.click('#tab-team');
  await page.waitForTimeout(600);

  // Hover the comparison chart to fire tooltip/crosshair callbacks (the #7 class).
  const tbox = await page.locator('#c-compare').boundingBox();
  if (tbox) {
    await page.mouse.move(tbox.x + tbox.width / 2, tbox.y + tbox.height / 2);
    await page.waitForTimeout(150);
  }

  // Back to pastor, hover the trend chart (legend filter + tooltip afterBody + crosshair).
  await page.click('#tab-pastor');
  await page.waitForTimeout(400);
  const box = await page.locator('#c-trend').boundingBox();
  if (box) {
    for (let i = 1; i <= 6; i++) {
      await page.mouse.move(box.x + (box.width * i) / 7, box.y + box.height / 2);
      await page.waitForTimeout(60);
    }
  }

  // "이렇게 바꿔보기": moving an inline lever must overlay a dotted what-if trajectory.
  await page.evaluate(() => {
    const e = document.getElementById('mn-sg');
    e.value = Math.min(100, (+e.value) + 25);
    e.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(700); // debounced sim (260ms) + redraw
  const overlayDrawn = await page.evaluate(() =>
    window.charts['c-trend'].data.datasets.some(d => d.label && d.label.indexOf('바꾼 계획') >= 0));
  expect(overlayDrawn, 'moving a what-if lever should overlay a dotted changed-plan trajectory').toBeTruthy();

  // Care list moved off the main tab — it now lives in the team tab.
  await page.click('#tab-team');
  await page.waitForTimeout(300);
  const careOnTeam = await page.evaluate(() => {
    const e = document.getElementById('care-list');
    return !!(e && e.innerText.trim().length > 1);
  });
  expect(careOnTeam, 'care list should render on the team tab').toBeTruthy();
  await page.click('#tab-pastor');
  await page.waitForTimeout(300);

  // Cycle every built-in scenario (rebuilds + re-renders each).
  for (const v of ['plan', 'base', 'decline', 'data']) {
    await page.selectOption('#scenario-sel', v);
    await page.waitForTimeout(500);
  }

  // No card was allowed to fail (the resilience banner must stay hidden).
  const warnShown = await page.evaluate(() => {
    const w = document.getElementById('render-warn');
    return !!(w && !w.hidden);
  });
  expect(warnShown, 'a render card failed — see #render-warn / console').toBeFalsy();

  // The actual guard that would have caught incident #7.
  expect(errors, 'console/page errors:\n' + errors.join('\n')).toEqual([]);
});
