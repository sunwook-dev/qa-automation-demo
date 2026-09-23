# QA Automation Demo

> **QA Automation Engineer 지원용 자동화 테스트 데모** — Playwright(UI·API·Mocking)와 Postman/Newman(API)으로 자동화 테스트를 작성하고, GitHub Actions로 실행해 결과 HTML 리포트를 GitHub Pages로 자동 배포합니다. 요구사항 정의 → 테스트 설계 → 추적성(RTM)까지 QA 전 과정을 담았습니다.

![CI](https://github.com/sunwook-dev/qa-automation-demo/actions/workflows/ci.yml/badge.svg)

- 📊 **테스트 리포트(메인)** : https://sunwook-dev.github.io/qa-automation-demo/
  - Playwright 리포트 : https://sunwook-dev.github.io/qa-automation-demo/playwright/
  - Postman/Newman 리포트 : https://sunwook-dev.github.io/qa-automation-demo/newman/
- ⚙️ **CI 실행 결과** : https://github.com/sunwook-dev/qa-automation-demo/actions
- 📋 **요구사항 정의서** : [docs/requirements.md](docs/requirements.md)
- 🧪 **테스트 케이스 명세** : [docs/test-cases.md](docs/test-cases.md) · [Excel](docs/test-cases.xlsx)
- 🔗 **요구사항 추적 매트릭스(RTM)** : [docs/traceability-matrix.md](docs/traceability-matrix.md)

> ⚠️ 본 레포는 **역량 시연용 데모**입니다. 회사 서비스/데이터는 포함하지 않습니다. UI는 데모 앱(로그인 → 경로검색)을, API는 공개 REST API(`reqres.in`)를 대상으로 하며, 로그인·경로검색·즐겨찾기·장소추천은 `page.route` 목킹(가상 응답) 기반입니다.

---

## 현황 요약

| 항목 | 값 |
| --- | --- |
| 요구사항 | 18건 (기능 15 · 비기능 3) |
| 테스트 케이스 | 16건 (UI 6 · API 4 · Mocking 6) |
| 자동화 도구 | Playwright · Postman/Newman |
| 요구사항 커버리지 | 100% |
| 최종 판정 | Pass 100% |
| 커버 품질특성 | 기능적합성·성능효율성·호환성·신뢰성·보안·사용성 |

---

## 프로젝트 구조

```
qa-automation-demo/
├─ app/
│  └─ index.html                    # 데모 앱(로그인 → 경로검색, UI 테스트 대상)
├─ tests/
│  ├─ pages/                        # Page Object Model
│  │  └─ DemoAppPage.ts             #  로그인·경로검색 POM
│  ├─ ui/                           # UI 자동화 (데모 앱)
│  │  └─ app.ui.spec.ts             #  로그인 3 + 경로검색 화면 3 (목킹)
│  ├─ api/                          # API 자동화 (reqres.in)
│  │  └─ users-api.spec.ts
│  └─ mocking/                      # API Mocking (page.route)
│     ├─ route-search.mock.spec.ts  #  경로검색 정상/오류
│     └─ features.mock.spec.ts      #  즐겨찾기·장소추천·빈결과
├─ postman/                         # Postman/Newman API 자동화
│  ├─ qa-api.postman_collection.json
│  └─ reqres.postman_environment.json
├─ docs/
│  ├─ requirements.md               # 요구사항 정의서
│  ├─ test-cases.md                 # 테스트 케이스 명세
│  ├─ traceability-matrix.md        # 요구사항 추적 매트릭스(RTM)
│  ├─ test-cases.xlsx               # 위 3종 통합 Excel(필터·커버리지 집계)
│  └─ SETUP.md                      # 배포·노션 연결 가이드
├─ .github/workflows/ci.yml         # CI/CD + 통합 리포트 Pages 배포
├─ playwright.config.ts
└─ package.json
```

## 로컬 실행

```bash
npm ci
npx playwright install --with-deps chromium
npm test                # Playwright 전체(UI·API·Mocking)
npm run test:ui         # UI 테스트만
npm run test:api        # API 테스트만
npm run test:mock       # 목킹 테스트만
npm run report          # Playwright HTML 리포트 열기

# Postman/Newman
npm install -g newman newman-reporter-htmlextra
newman run postman/qa-api.postman_collection.json -e postman/reqres.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export newman-report/index.html
```

## 적용 기술

- **Playwright** (UI 자동화 · API 검증 · 네트워크 목킹 통합) + **POM 패턴**
- **Postman / Newman** (REST API 자동화, htmlextra 리포트)
- **테스트 설계 기법**: 동등분할 · 경계값 분석 · 상태전이 · 시나리오 · Risk-Based
- **GitHub Actions**: push/PR 자동 실행, 두 리포트를 하나의 사이트로 묶어 Pages 배포
- **TypeScript / JavaScript**

---

## 배포(1회) 세팅

1. 이 폴더를 GitHub `sunwook-dev/qa-automation-demo` 로 push
2. 레포 **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택
3. main 브랜치 push 시 CI 실행 → `https://sunwook-dev.github.io/qa-automation-demo/` 에 리포트 배포

자세한 셋업·노션 연결은 [`docs/SETUP.md`](docs/SETUP.md) 참고.
