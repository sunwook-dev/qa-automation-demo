import { test, expect } from '@playwright/test';

/**
 * [API Mocking] 경로 검색 API 목킹 데모
 * 채용공고의 "API Mocking 관련 테스트 도구 개발 및 활용" 요건 대응.
 *
 * 실제 백엔드/외부 사이트 없이 Playwright의 network interception(page.route)만으로
 * 모빌리티 성격의 "경로 검색(route search)" API 응답을 목킹하고,
 * (1) 정상 응답, (2) 오류 응답에 대한 동작을 검증합니다.
 * 외부 네트워크에 의존하지 않아 CI에서 항상 결정적으로 통과합니다.
 *
 * 대응 TC: TC-MOCK-001 ~ TC-MOCK-002
 */

const APP_ORIGIN = 'https://demo.local';
const ROUTE_SEARCH_API = '**/api/route-search*';

test.describe('경로 검색 API Mocking', () => {
  // 앱 셸(HTML 문서)도 목킹으로 제공하여 동일 출처(same-origin) fetch 환경을 구성
  test.beforeEach(async ({ page }) => {
    await page.route(`${APP_ORIGIN}/`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<!doctype html><html><body><h1>Demo</h1></body></html>',
      });
    });
  });

  test('TC-MOCK-001 | 정상 경로 응답을 목킹하고 데이터 정합성을 검증한다', async ({ page }) => {
    await page.route(ROUTE_SEARCH_API, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          origin: '서울역',
          destination: '판교역',
          routes: [
            { id: 1, type: 'fastest', durationMin: 34, distanceKm: 26.1 },
            { id: 2, type: 'free', durationMin: 41, distanceKm: 24.7 },
          ],
        }),
      });
    });

    await page.goto(`${APP_ORIGIN}/`);

    // 프론트엔드가 호출하는 상황을 재현(fetch)하여 목킹된 응답을 검증
    const result = await page.evaluate(async () => {
      const r = await fetch('/api/route-search?from=서울역&to=판교역');
      return r.json();
    });

    expect(result.routes).toHaveLength(2);
    expect(result.routes[0]).toMatchObject({ type: 'fastest', durationMin: 34 });
    // 경계 검증: 최단 경로 소요시간이 대안 경로보다 작아야 함
    expect(result.routes[0].durationMin).toBeLessThan(result.routes[1].durationMin);
  });

  test('TC-MOCK-002 | 서버 오류(503)를 목킹하여 예외 처리를 검증한다', async ({ page }) => {
    await page.route(ROUTE_SEARCH_API, async (route) => {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'service_unavailable' }),
      });
    });

    await page.goto(`${APP_ORIGIN}/`);

    const status = await page.evaluate(async () => {
      const r = await fetch('/api/route-search?from=서울역&to=판교역');
      return r.status;
    });

    expect(status).toBe(503);
  });
});
