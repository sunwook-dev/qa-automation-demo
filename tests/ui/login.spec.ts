import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * [UI 자동화] 로그인 시나리오
 * 대상: https://www.saucedemo.com (공개 QA 실습용 샌드박스)
 * 테스트 설계 기법: 동등분할(정상/비정상 계정), 상태전이(로그인→목록)
 * 대응 TC: TC-UI-001 ~ TC-UI-003
 */
test.describe('로그인 기능', () => {
  test('TC-UI-001 | 정상 계정으로 로그인하면 상품 목록으로 이동한다', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.expectLoaded();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-UI-002 | 잠긴 계정으로 로그인하면 오류 메시지를 노출한다', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectLoginError('locked out');
  });

  test('TC-UI-003 | 비밀번호 미입력 시 필수값 오류를 노출한다', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', '');

    await loginPage.expectLoginError('Password is required');
  });
});
