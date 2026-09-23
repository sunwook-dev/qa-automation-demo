import { type Page, type Locator, type Route, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';

/**
 * DemoAppPage - 데모 앱(로그인 → 경로검색) Page Object
 * 화면(app/index.html)과 API를 목킹으로 제공하여, 외부 네트워크 없이 UI를 검증합니다.
 */
const APP_ORIGIN = 'https://demo.local';
const PAGE_HTML = readFileSync(path.join(__dirname, '..', '..', 'app', 'index.html'), 'utf-8');

export class DemoAppPage {
  readonly page: Page;
  readonly loginView: Locator;
  readonly appView: Locator;
  readonly userId: Locator;
  readonly userPw: Locator;
  readonly loginBtn: Locator;
  readonly loginError: Locator;
  readonly loginValidation: Locator;
  readonly origin: Locator;
  readonly destination: Locator;
  readonly searchBtn: Locator;
  readonly routeCards: Locator;
  readonly emptyState: Locator;
  readonly errorState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginView = page.getByTestId('login-view');
    this.appView = page.getByTestId('app-view');
    this.userId = page.locator('#userid');
    this.userPw = page.locator('#userpw');
    this.loginBtn = page.getByRole('button', { name: '로그인' });
    this.loginError = page.getByTestId('login-error');
    this.loginValidation = page.getByTestId('login-validation');
    this.origin = page.locator('#origin');
    this.destination = page.locator('#destination');
    this.searchBtn = page.getByRole('button', { name: '경로 검색' });
    this.routeCards = page.getByTestId('route-card');
    this.emptyState = page.getByTestId('empty');
    this.errorState = page.getByTestId('error');
  }

  /** 앱 화면(HTML)을 목킹으로 제공하고 진입 */
  async open(): Promise<void> {
    await this.page.route(`${APP_ORIGIN}/`, (route: Route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: PAGE_HTML }),
    );
    await this.page.goto(`${APP_ORIGIN}/`);
  }

  /** 로그인 API 목킹 (success=true → 200, false → 401) */
  async mockLogin(success: boolean): Promise<void> {
    await this.page.route('**/api/login', (route: Route) =>
      route.fulfill({
        status: success ? 200 : 401,
        contentType: 'application/json',
        body: JSON.stringify(success ? { token: 'demo-token' } : { error: 'invalid_credentials' }),
      }),
    );
  }

  /** 경로검색 API 목킹 */
  async mockRouteSearch(handler: (route: Route) => Promise<void> | void): Promise<void> {
    await this.page.route('**/api/route-search*', handler);
  }

  async login(id: string, pw: string): Promise<void> {
    await this.userId.fill(id);
    await this.userPw.fill(pw);
    await this.loginBtn.click();
  }

  async searchRoute(from: string, to: string): Promise<void> {
    await this.origin.fill(from);
    await this.destination.fill(to);
    await this.searchBtn.click();
  }
}
