import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * [UI 자동화] 장바구니 담기 시나리오
 * 테스트 설계 기법: 시나리오 테스트(로그인 → 상품 담기 → 카운트 검증)
 * 대응 TC: TC-UI-004
 */
test.describe('상품 목록', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-UI-004 | 상품을 장바구니에 담으면 배지 카운트가 1 증가한다', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.expectCartCount(1);
  });
});
