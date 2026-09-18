# TMAP QA Automation Demo

> **QA Automation Engineer 자동화 테스트 데모** — Playwright 기반 UI/API/Mocking 자동화 테스트를 GitHub Actions로 실행하고, 결과 HTML 리포트를 GitHub Pages로 자동 배포합니다.

<!-- 아래 USERNAME/REPO를 본인 GitHub 계정·레포명으로 교체하세요 -->
![CI](https://github.com/sunwook-dev/qa-automation-demo/actions/workflows/ci.yml/badge.svg)

- 📊 **테스트 리포트(HTML)** : https://sunwook-dev.github.io/qa-automation-demo/
- ⚙️ **CI 실행 결과** : https://github.com/sunwook-dev/qa-automation-demo/actions
- 📋 **테스트 케이스 명세** : [docs/test-cases.md](docs/test-cases.md)

> ⚠️ 본 레포는 공개 샌드박스(`saucedemo.com`, `reqres.in`) 및 목킹 환경을 대상으로 작성한 **시연용 데모**입니다. 회사 서비스/데이터는 포함하지 않습니다.

---

## 프로젝트 구조

```
tmap-qa-automation-demo/
├─ tests/
│  ├─ pages/                 # Page Object Model
│  │  ├─ LoginPage.ts
│  │  └─ InventoryPage.ts
│  ├─ ui/                    # UI 자동화 (saucedemo.com)
│  │  ├─ login.spec.ts
│  │  └─ inventory.spec.ts
│  ├─ api/                   # API 자동화 (reqres.in)
│  │  └─ users-api.spec.ts
│  └─ mocking/               # API Mocking (page.route)
│     └─ route-search.mock.spec.ts
├─ docs/test-cases.md        # 테스트 케이스 명세
├─ .github/workflows/ci.yml  # CI/CD + Pages 배포
├─ playwright.config.ts
└─ package.json
```

## 로컬 실행

```bash
npm ci
npx playwright install --with-deps chromium
npm test                # 전체 실행
npm run test:ui         # UI 테스트만
npm run test:api        # API 테스트만
npm run test:mock       # 목킹 테스트만
npm run report          # HTML 리포트 열기
```

## 적용 기술

- **Playwright** (UI 자동화 · API 검증 · 네트워크 목킹 통합)
- **POM(Page Object Model)** 패턴으로 유지보수성 확보
- **테스트 설계 기법**: 동등분할 · 경계값 분석 · 상태전이 · 시나리오 테스트
- **GitHub Actions**: push/PR 시 자동 실행, HTML 리포트 Pages 배포
- **TypeScript**

---

## 배포(1회) 세팅

1. 이 폴더를 본인 GitHub에 새 **public 레포**로 푸시
2. 레포 **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택
3. main 브랜치 push 시 CI가 실행되고 `https://<username>.github.io/<repo>/` 에 리포트가 배포됨
4. 위 README의 `USERNAME/REPO` 를 실제 값으로 교체

자세한 셋업은 [`docs/SETUP.md`](docs/SETUP.md) 참고.