import { type Page, type Locator, expect } from '@playwright/test';

/**
 * InventoryPage - 로그인 후 상품 목록/장바구니 화면 POM
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly addFirstItemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addFirstItemButton = page.locator('button:has-text("Add to cart")').first();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async addFirstItemToCart(): Promise<void> {
    await this.addFirstItemButton.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
