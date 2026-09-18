import { test, expect } from '@playwright/test';
import { TmapAppPage } from '../pages/TmapAppPage';

/**
 * [UI 자동화] 티맵 데모 앱 (로그인 → 경로검색)
 * POM(TmapAppPage) 기반. 화면·API를 목킹하여 외부 네트워크 없이 결정적으로 검증합니다.
 * 실제 티맵 서비스가 아니라, 동일한 검증 방식을 재현한 데모입니다.
 *
 * 대응 TC: TC-UI-001 ~ TC-UI-006
 */

const okRoutes = {
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify({
    routes: [
      { id: 1, type: 'fastest', durationMin: 34, distanceKm: 26.1 },
      { id: 2, type: 'free', durationMin: 41, distanceKm: 24.7 },
    ],
  }),
};

test.describe('티맵 앱 - 로그인', () => {
  test('TC-UI-001 | 유효 계정으로 로그인하면 경로검색 화면으로 진입한다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.open();
    await app.mockLogin(true);

    await app.login('tmap_user', 'secret');

    await expect(app.appView).toBeVisible();
    await expect(app.loginView).toBeHidden();
  });

  test('TC-UI-002 | 잘못된 자격증명이면 오류 메시지를 표시한다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.open();
    await app.mockLogin(false);

    await app.login('tmap_user', 'wrong');

    await expect(app.loginError).toContainText('올바르지 않습니다');
    await expect(app.appView).toBeHidden();
  });

  test('TC-UI-003 | 아이디/비밀번호 미입력 시 필수값 안내를 표시한다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.open();

    await app.login('', ''); // 필수값 누락

    await expect(app.loginValidation).toContainText('입력해 주세요');
    await expect(app.appView).toBeHidden();
  });
});

test.describe('티맵 앱 - 경로검색 (로그인 후)', () => {
  test.beforeEach(async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.open();
    await app.mockLogin(true);
    await app.login('tmap_user', 'secret');
    await expect(app.appView).toBeVisible();
  });

  test('TC-UI-004 | 정상 경로 응답 시 결과 카드가 렌더링된다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.mockRouteSearch((route) => route.fulfill(okRoutes));

    await app.searchRoute('서울역', '판교역');

    await expect(app.routeCards).toHaveCount(2);
    await expect(app.routeCards.first()).toContainText('최단');
    await expect(app.routeCards.first()).toContainText('34분');
  });

  test('TC-UI-005 | 경로가 없으면 안내 메시지를 표시한다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.mockRouteSearch((route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ routes: [] }) }),
    );

    await app.searchRoute('서울역', '서울역');

    await expect(app.emptyState).toBeVisible();
    await expect(app.routeCards).toHaveCount(0);
  });

  test('TC-UI-006 | 조회 오류(503) 시 오류 메시지를 표시한다', async ({ page }) => {
    const app = new TmapAppPage(page);
    await app.mockRouteSearch((route) =>
      route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'service_unavailable' }) }),
    );

    await app.searchRoute('서울역', '판교역');

    await expect(app.errorState).toBeVisible();
    await expect(app.routeCards).toHaveCount(0);
  });
});
