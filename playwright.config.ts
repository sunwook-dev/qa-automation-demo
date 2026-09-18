import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 설정
 * - HTML 리포트를 생성해 GitHub Pages로 배포합니다(진행 결과 링크).
 * - 실패 시 trace/스크린샷을 남겨 결함 재현·원인 분석에 활용합니다.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  // HTML 리포트: playwright-report/ 폴더로 출력 → CI에서 Pages로 배포
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    // UI 테스트는 목킹된 데모 앱 오리진을 사용합니다(page.route로 화면·API 제공).
    baseURL: 'https://tmap.demo',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // 필요 시 모바일 뷰포트 검증도 확장 가능
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
