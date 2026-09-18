# TMAP QA Automation Demo

> **QA Automation Engineer 지원용 자동화 테스트 데모** — Playwright 기반 UI/API/Mocking 자동화 테스트를 GitHub Actions로 실행하고, 결과 HTML 리포트를 GitHub Pages로 자동 배포합니다.

<!-- 아래 USERNAME/REPO를 본인 GitHub 계정·레포명으로 교체하세요 -->
![CI](https://github.com/USERNAME/REPO/actions/workflows/ci.yml/badge.svg)

- 📊 **테스트 리포트(HTML)** : https://USERNAME.github.io/REPO/
- ⚙️ **CI 실행 결과** : https://github.com/USERNAME/REPO/actions
- 📋 **테스트 케이스 명세** : [docs/test-cases.md](docs/test-cases.md)

> ⚠️ 본 레포는 공개 샌드박스(`saucedemo.com`, `reqres.in`) 및 목킹 환경을 대상으로 작성한 **역량 시연용 데모**입니다. 회사 서비스/데이터는 포함하지 않습니다.

---

## 채용공고 요건 매핑

| 티맵모빌리티 채용 요건 | 본 데모에서의 증빙 |
| --- | --- |
| 자동화 테스트 플랫폼 구축·운영·개선 | Playwright 프레임워크 + GitHub Actions CI + Pages 리포트 배포 파이프라인 |
| UI/API 자동화 TC 작성 (python/java/**js**) | `tests/ui` (POM 기반 UI), `tests/api` (REST API 검증) — TypeScript |
| 개발·자동화 도구 (github, CI/CD, Selenium/postman) | GitHub Actions CI/CD, Playwright(UI·API 통합) |
| 비기능 영역 / 예외 상황 테스트 | 오류 응답(503) 목킹, 실패 시 trace·스크린샷 자동 수집 |
| **API Mocking** 관련 테스트 개발·활용 | `tests/mocking` — `page.route`로 경로 검색 API 응답 목킹 |
| 생성형 AI 활용 자동화 *(우대)* | (별도) AI Agent 기반 TC 자동 생성 경험 — 이력서 참조 |

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
