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
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

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
