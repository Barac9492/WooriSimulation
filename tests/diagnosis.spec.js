// 진단실(diagnosis.html) 스모크 테스트.
// 진단 전용 화면: 모형 없이 관찰 기록만 읽는다. 기본 화면은 상황판(관제실) — 머리 문장·사슬·
// 활력 징후·실측 관계망(캔버스)·검사 보드 타일. 전체 기록(검사 패널 17개·증상 지도·불일치 지도·
// 측정 가이드)은 자세히 화면에 있다. 모든 검사는 양호/주의/경고/미검사 네 상태를 가진다.
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'diagnosis.html');

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

test('상황판 부팅: 머리 문장·사슬·검사 보드 17타일·관계망 캔버스가 그려진다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  // 기본 화면은 상황판, 자세히는 숨김
  await expect(page.locator('#view-board')).toBeVisible();
  await expect(page.locator('#view-detail')).toBeHidden();
  await expect(page.locator('#headline-big')).toHaveText(/.+/);
  await expect(page.locator('#chain-hero svg')).toBeVisible();
  await expect(page.locator('.tile')).toHaveCount(17);
  await expect(page.locator('#board-vitals')).toContainText('재적');
  // 실측 관계망: 내장 예시는 친구이름이 있어 점·선이 올라간다
  const n = await page.locator('#net').getAttribute('data-n');
  const e = await page.locator('#net').getAttribute('data-e');
  expect(Number(n)).toBeGreaterThan(0);
  expect(Number(e)).toBeGreaterThan(0);
  // 미검사 타일은 사라지지 않고 점선으로 선다
  await expect(page.locator('.tile.lv-na').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('타일 → 자세히: 타일을 누르면 그 검사 카드로 들어가고, 미검사는 여는 법이 보인다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('.tile[data-t="T4"]').click();
  await expect(page.locator('#view-detail')).toBeVisible();
  await expect(page.locator('#view-board')).toBeHidden();
  await expect(page.locator('.test')).toHaveCount(17);
  await expect(page.locator('#t-T4 .chip')).toHaveText('미검사');
  await expect(page.locator('#t-T4')).toContainText('여는 법');
  await expect(page.locator('#collect')).toContainText('열린다');
  // 상황판 복귀
  await page.locator('#tab-board').click();
  await expect(page.locator('#view-board')).toBeVisible();
  expect(errors).toEqual([]);
});

test('관계망 소견: 점을 고르면 상황판 곁에 관찰된 사실·증상이 뜬다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.evaluate(() => window.__diag.pick(0));
  await expect(page.locator('#board-stud')).toContainText('관찰된 사실');
  await expect(page.locator('#board-stud')).toContainText('증상');
  expect(errors).toEqual([]);
});

test('새 양식 CSV: 4단계가 다 차면 검사 12/17이 돌고 가정 대화 검사가 열린다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#tab-detail').click();
  const csv = [
    '이름,학년,부,출석4주,소그룹,멘토,봉사역할,부모출석,다락방,친구이름,자기말표현,의심질문,예배후머묾,챙기는어른,신앙대화,가정예배,부모관계,내면화점수',
    '김민수,중3,1,4,Y,N,Y,2,Y,박지훈,2,Y,2,3,5,4,4,4',
    '이서연,고1,2,0,N,N,N,0,N,,0,N,0,0,0,1,2,2',
    '박지훈,고2,1,3,Y,Y,N,1,Y,김민수,1,N,1,2,2,3,3,3',
    '최하늘,고3,2,2,N,N,N,1,N,이서연,0,N,0,0,0,2,2,1'
  ].join('\n');
  await page.locator('#csv-file').setInputFiles({ name: 'f.csv', mimeType: 'text/csv', buffer: Buffer.from('﻿' + csv, 'utf-8') });
  await expect(page.locator('#fid-line')).toContainText('2단계 교사 ✓');
  await expect(page.locator('#fid-line')).toContainText('3단계 학부모 ✓');
  await expect(page.locator('#fid-line')).toContainText('4단계 학생 ✓');
  await expect(page.locator('#fid-line')).toContainText('친구망 실측');
  await expect(page.locator('#fid-line')).toContainText('검사 12/17 가동');
  await expect(page.locator('#t-F4 .chip')).not.toHaveText('미검사');
  await expect(page.locator('#t-F4')).toContainText('0회인 가정');
  expect(errors).toEqual([]);
});

test('수집 양식(글 값) 호환: 친한친구·상중하·예아니오가 그대로 읽힌다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#tab-detail').click();
  const csv = [
    '이름,학년,신앙배경,코어,외톨이,출석상태,내면화,의심나눔,부모관계,가정신앙,곁의어른수,친한친구',
    '김민수,중3,모태,Y,N,활발,상,예,따뜻,열심,3,"박지훈, 이서연"',
    '이서연,고1,비신앙,N,Y,위기,하,아니오,소원,없음,0,',
    '박지훈,고2,일반,N,N,느슨,중,예,보통,보통,1,김민수'
  ].join('\n');
  await page.locator('#csv-file').setInputFiles({ name: 't.csv', mimeType: 'text/csv', buffer: Buffer.from('﻿' + csv, 'utf-8') });
  await expect(page.locator('#src-line')).toContainText('3명');
  await expect(page.locator('#fid-line')).toContainText('친구망 실측');
  await expect(page.locator('#t-T1 .chip')).not.toHaveText('미검사');
  await expect(page.locator('#t-F3 .chip')).not.toHaveText('미검사');
  expect(errors).toEqual([]);
});

test('소견 드릴다운(자세히): 증상 지도 점을 누르면 소견이 펼쳐진다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#tab-detail').click();
  await page.locator('#map .dot').first().click();
  await expect(page.locator('#stud-card')).toBeVisible();
  await expect(page.locator('#stud-card')).toContainText('관찰된 사실');
  await expect(page.locator('#stud-card')).toContainText('다음 관찰 한 가지');
  expect(errors).toEqual([]);
});

test('불일치 지도: 두 목소리가 갈리면 갈리는 자리를 짚고, 상황판에도 한 줄이 뜬다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#tab-detail').click();
  await page.evaluate(() => {
    document.getElementById('vf-d0').value = 4;
    document.getElementById('vf-d1').value = 1;
  });
  await page.locator('#vf-add').click();
  await page.evaluate(() => {
    document.getElementById('vf-d0').value = 0;
    document.getElementById('vf-d1').value = 4;
  });
  await page.locator('#vf-add').click();
  await expect(page.locator('#voices-find')).toContainText('가장 갈리는 곳');
  await expect(page.locator('#voices-plot .dq-dot')).toHaveCount(10);
  await page.locator('#tab-board').click();
  await expect(page.locator('#board-voice')).toContainText('가장 갈리는 곳');
  expect(errors).toEqual([]);
});

test('늑대의 눈: 같은 데이터를 적의 정찰로 거꾸로 읽고, 미검사를 적의 지도로 짚는다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#btn-wolf').click();
  await expect(page.locator('#wolf')).toBeVisible();
  // 거울 면책(혈과 육이 아니다) + 공격 절 + 방어 절 + 미검사를 어둠의 지도로
  await expect(page.locator('#wolf')).toContainText('혈과 육이 아니다');
  await expect(page.locator('#wolf-body')).toContainText('내가 두려워하는 것');
  await expect(page.locator('#wolf-body')).toContainText('재지 않는 곳');
  await expect(page.locator('#wolf-body')).toContainText('근거 :');
  // 닫기(단추·ESC 둘 다)
  await page.locator('#wolf-close').click();
  await expect(page.locator('#wolf')).toBeHidden();
  await page.locator('#btn-wolf').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#wolf')).toBeHidden();
  expect(errors).toEqual([]);
});

test('직접 입력: 분모·반 담임 수를 넣으면 닿음·역량 검사가 바로 열린다', async ({ page }) => {
  const errors = [];
  collectErrors(page, errors);
  await freshPage(page);
  await page.locator('#tab-detail').click();
  await expect(page.locator('#t-R1 .chip')).toHaveText('미검사');
  await page.locator('#in-ly').fill('160');
  await page.locator('#in-ly').dispatchEvent('change');
  await expect(page.locator('#t-R1 .chip')).not.toHaveText('미검사');
  await expect(page.locator('#t-R1')).toContainText('작년 재적 160명 대비');
  await page.locator('#tab-detail').click();
  await page.locator('#in-tc').fill('4');
  await page.locator('#in-tc').dispatchEvent('change');
  await expect(page.locator('#t-C1')).toContainText('1인당');
  expect(errors).toEqual([]);
});
