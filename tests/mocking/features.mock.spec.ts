import { test, expect } from '@playwright/test';

/**
 * [API Mocking] 부가 기능 목킹 데모 (즐겨찾기 / 장소추천 / 경로검색 엣지케이스)
 * 채용공고의 "API Mocking" 요건 대응 + 모빌리티 도메인 시나리오 시연.
 *
 * 주의: 실제 서비스 API가 아니라, page.route로 만든 "가상(mock) 응답"에 대한 검증입니다.
 * 외부 네트워크에 의존하지 않아 CI에서 항상 결정적으로 통과합니다.
 *
 * 대응 TC: TC-MOCK-003 ~ TC-MOCK-006
 */

const APP_ORIGIN = 'https://demo.local';

test.describe('부가 기능 API Mocking', () => {
  // 상대경로 fetch가 동작하도록 앱 셸(HTML)도 목킹으로 제공
  test.beforeEach(async ({ page }) => {
    await page.route(`${APP_ORIGIN}/`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<!doctype html><html><body><h1>Demo</h1></body></html>',
      });
    });
    await page.goto(`${APP_ORIGIN}/`);
  });

  test('TC-MOCK-003 | 즐겨찾기 목록 조회 정상 응답을 목킹하고 스키마를 검증한다', async ({ page }) => {
    await page.route('**/api/favorites', async (route) => {
      // GET만 목킹 (POST는 다음 테스트에서 별도 검증)
      if (route.request().method() !== 'GET') return route.fallback();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: 1, name: '회사', lat: 37.4979, lng: 127.0276 },
            { id: 2, name: '집', lat: 37.5665, lng: 126.978 },
          ],
        }),
      });
    });

    const body = await page.evaluate(async () => {
      const r = await fetch('/api/favorites');
      return r.json();
    });

    expect(body.items).toHaveLength(2);
    body.items.forEach((it: any) => {
      expect(it).toHaveProperty('name');
      expect(it).toHaveProperty('lat');
      expect(it).toHaveProperty('lng');
    });
  });

  test('TC-MOCK-004 | 즐겨찾기 추가(POST) 시 201과 반영 데이터를 검증한다', async ({ page }) => {
    await page.route('**/api/favorites', async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      const payload = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 3, ...payload }),
      });
    });

    const res = await page.evaluate(async () => {
      const r = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '판교역', lat: 37.3947, lng: 127.1112 }),
      });
      return { status: r.status, body: await r.json() };
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: '판교역' });
    expect(res.body).toHaveProperty('id');
  });

  test('TC-MOCK-005 | 장소추천 목록이 평점 내림차순으로 정렬돼 있는지 검증한다', async ({ page }) => {
    await page.route('**/api/places/recommend*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          places: [
            { id: 1, name: '로컬 맛집 A', rating: 4.8 },
            { id: 2, name: '로컬 맛집 B', rating: 4.5 },
            { id: 3, name: '로컬 맛집 C', rating: 4.1 },
          ],
        }),
      });
    });

    const body = await page.evaluate(async () => {
      const r = await fetch('/api/places/recommend?lat=37.4&lng=127.1');
      return r.json();
    });

    const ratings = body.places.map((p: any) => p.rating);
    const sorted = [...ratings].sort((a, b) => b - a);
    expect(ratings).toEqual(sorted); // 평점 내림차순 정합
    expect(body.places[0].rating).toBeGreaterThanOrEqual(body.places[body.places.length - 1].rating);
  });

  test('TC-MOCK-006 | 경로 검색 결과가 없을 때 빈 목록을 정상 처리하는지 검증한다', async ({ page }) => {
    await page.route('**/api/route-search*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ origin: '서울역', destination: '서울역', routes: [] }),
      });
    });

    const body = await page.evaluate(async () => {
      const r = await fetch('/api/route-search?from=서울역&to=서울역');
      return r.json();
    });

    expect(body.routes).toEqual([]);
    expect(Array.isArray(body.routes)).toBe(true); // 빈 결과도 배열 타입 유지(예외 아님)
  });
});
