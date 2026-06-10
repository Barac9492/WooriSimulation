// 실제 브라우저 스모크 테스트 — 목회 수첩(3탭) UI.
// 단위 테스트가 캔버스·DOM 콜백을 안 태우는 맹점(빈 화면 사고)을 막기 위해
// file://로 index.html을 열어 핵심 흐름(온보딩 → 예시 명단 → 세 탭 → 모의 실험 → 수집 양식 호환)을
// 돌리고 콘솔·페이지 오류를 잡는다.
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

// file:// 환경의 리소스·파비콘 소음은 무시하고 진짜 오류만 모은다.
function collectErrors(page, errors) {
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    if (/net::|favicon|ERR_FILE_NOT_FOUND/i.test(t)) return;
    errors.push('console: ' + t);
  });
}

async function freshPage(page) {
  await page.goto(FILE_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

test('부팅(첫 방문): 예시 명단이 자동 로드되고 배너·진단·양떼 지도가 보인다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await expect(page.locator('#view-week')).toBeVisible();
  await expect(page.locator('#view-plan')).toBeHidden();
  await expect(page.locator('#view-detail')).toBeHidden();
  // 빈 화면 대신 예시 명단 브리핑 + 배너
  await expect(page.locator('#sample-banner')).toBeVisible();
  await expect(page.locator('#pv-verdict .vtext')).toHaveText(/.+/);
  const lw = await page.locator('#flock').getAttribute('data-lw');
  expect(Number(lw)).toBeGreaterThan(100);
  // 배너를 누르면 온보딩 3걸음이 펼쳐진다
  await expect(page.locator('#onboard')).toBeHidden();
  await page.locator('#banner-open').click();
  await expect(page.locator('#onboard')).toBeVisible();
  expect(errors).toEqual([]);
});

test('양떼 지도: 점을 누르면 그 아이 요약이 인라인으로 펼쳐진다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  const box = await page.locator('#flock').boundingBox();
  await page.mouse.click(box.x + 30, box.y + 40);
  await expect(page.locator('#pv-stud')).toContainText('필요한 한 가지');
  expect(errors).toEqual([]);
});

test('예시 명단: 진단 문장·만날 아이·충실도 배지가 나온다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);

  await expect(page.locator('#onboard')).toBeHidden();
  await expect(page.locator('#pv-verdict .vtext')).toHaveText(/.+/);
  await expect(page.locator('#data-badge')).toContainText('명단');
  await expect(page.locator('#data-badge')).toContainText('친구망');
  expect(errors).toEqual([]);
});

test('올해 계획 탭: 설교 칩과 픽토그램(열 명 중 N)이 그려진다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);

  await page.locator('#tab-plan').click();
  await expect(page.locator('#view-plan')).toBeVisible();
  await expect(page.locator('#sermon-pick .chip')).toHaveCount(6);
  await expect(page.locator('#pv-outcome .ten span')).toHaveCount(10);
  await expect(page.locator('#pv-outcome')).toContainText('열 명 중');
  // 결을 바꾸고 적용해도 오류 없이 다시 그려진다
  await page.locator('#sermon-pick .chip[data-f="word"]').click();
  await page.locator('#apply-plan').click();
  await expect(page.locator('#pv-outcome')).toContainText('열 명 중', { timeout: 20000 });
  expect(errors).toEqual([]);
});

test('자세히 탭: 모의 실험(다음 주 ▶)이 주차를 올리고 차트를 그린다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);

  await page.locator('#tab-detail').click();
  await expect(page.locator('#view-detail')).toBeVisible();
  const wk0 = await page.locator('#wk').textContent();
  await page.locator('#btn-step').click();
  await page.locator('#btn-step').click();
  const wk1 = await page.locator('#wk').textContent();
  expect(Number(wk1)).toBeGreaterThan(Number(wk0));
  // 추이 캔버스가 실제 크기로 다시 그려졌다(논리 폭 dataset)
  const lw = await page.locator('#trend').getAttribute('data-lw');
  expect(Number(lw)).toBeGreaterThan(100);
  expect(errors).toEqual([]);
});

test('수집 양식 호환: collection-template(글 값)이 그대로 읽힌다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  const csv = [
    '이름,학년,신앙배경,코어,외톨이,출석상태,내면화,의심나눔,부모관계,가정신앙,곁의어른수,친한친구',
    '김민수,중3,모태,Y,N,활발,상,예,따뜻,열심,3,"박지훈, 이서연"',
    '이서연,고1,비신앙,N,Y,위기,하,아니오,소원,없음,0,',
    '박지훈,고2,일반,N,N,느슨,중,예,보통,보통,1,김민수'
  ].join('\n');
  await page.locator('#ob-file').setInputFiles({ name: 't.csv', mimeType: 'text/csv', buffer: Buffer.from('﻿' + csv, 'utf-8') });
  await expect(page.locator('#data-badge')).toContainText('명단 3명');
  await expect(page.locator('#data-badge')).toContainText('친구망 실측');
  // 이름이 친구 칸에 가로채이지 않았다(헤더 최장 일치) — 위기인 이서연이 만날 아이에 뜬다
  await expect(page.locator('#pv-visit')).toContainText('이서연');
  expect(errors).toEqual([]);
});

test('새로고침 복원: 명단과 탭이 유지된다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);

  await page.locator('#tab-plan').click();
  await page.reload();
  await expect(page.locator('#view-plan')).toBeVisible();
  await expect(page.locator('#data-badge')).toContainText('명단');
  expect(errors).toEqual([]);
});
