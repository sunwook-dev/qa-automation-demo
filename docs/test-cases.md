# 테스트 케이스 명세 (Test Case Specification)

> UI는 데모 앱(로그인 → 경로검색), API는 공개 REST API(reqres.in) 및 목킹 환경을 대상으로 합니다.
> [요구사항 정의서](requirements.md) → 본 명세 → [요구사항 추적 매트릭스](traceability-matrix.md) 로 연결됩니다.

## 요약

| 구분 | 케이스 수 | 자동화 | 판정 |
| --- | --- | --- | --- |
| UI 자동화 | 6 | Playwright(POM) — 로그인 3 · 경로검색 화면 3 | Pass |
| API 자동화 | 4 | Playwright request / Postman·Newman | Pass |
| API Mocking | 6 | Playwright page.route | Pass |
| **합계** | **16** | | **Pass 100%** |

> 로그인·경로검색·즐겨찾기·장소추천은 실제 서비스 API가 아니라 목킹(가상 응답) 기준 시나리오입니다.

## 구성 요소 설명

- **TC ID** : 유니크 식별자
- **분류** : 기능 분류(계층형, `대분류 > 중분류 > 소분류`)
- **Summary** : 테스트 요약(선택)
- **사전조건** : 테스트 수행 전 상태
- **Step** : 테스트 시나리오(수행 절차)
- **기대결과** : Expected result
- **판정** : Pass / Fail
- **우선순위** : P1(High) · P2(Medium) · P3(Low)
- **구분** : 기능 / 비기능
- **품질특성** : ISO/IEC 25010 기준
- **요구사항 ID** : 대응 요구사항 식별자
- **자동화 도구** : 실행 도구

## 테스트 케이스

| TC ID | 분류 | Summary | 사전조건 | Step | 기대결과 | 판정 | 우선순위 | 구분 | 품질특성 | 요구사항 ID | 자동화 도구 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-UI-001 | 인증 > 로그인 > 정상 | 로그인 성공 진입 | 앱 로그인 화면 | 1. 아이디/비밀번호 입력<br>2. 로그인 클릭<br>3. (로그인 API 200 목킹) | 경로검색 화면으로 진입 | Pass | P1 | 기능 | 기능적합성 | REQ-AUTH-01, REQ-COMPAT-01 | Playwright |
| TC-UI-002 | 인증 > 로그인 > 차단 | 잘못된 자격증명 차단 | 앱 로그인 화면 | 1. 잘못된 계정 입력<br>2. 로그인 클릭<br>3. (로그인 API 401 목킹) | '올바르지 않습니다' 오류, 진입 차단 | Pass | P1 | 기능 | 보안 | REQ-AUTH-02, REQ-COMPAT-01 | Playwright |
| TC-UI-003 | 인증 > 로그인 > 입력검증 | 필수값 미입력 검증 | 앱 로그인 화면 | 1. 아이디/비밀번호 공란<br>2. 로그인 클릭 | '입력해 주세요' 안내, 진입 차단 | Pass | P2 | 기능 | 기능적합성 | REQ-AUTH-03, REQ-COMPAT-01 | Playwright |
| TC-UI-004 | 경로검색 > 결과화면 > 정상 | 경로 결과 화면 렌더링 | 로그인 완료 | 1. 출발/도착 입력<br>2. 검색 클릭<br>3. (경로 API 200 목킹) | 결과 카드 2건 렌더링, 최단 34분 표시 | Pass | P1 | 기능 | 기능적합성 | REQ-ROUTE-UI-01, REQ-COMPAT-01 | Playwright + Mock |
| TC-UI-005 | 경로검색 > 결과화면 > 빈결과 | 경로 없음 화면 안내 | 로그인 완료 | 1. 검색 클릭<br>2. (빈 routes 목킹) | '추천 경로가 없습니다' 안내, 카드 0건 | Pass | P2 | 기능 | 사용성 | REQ-ROUTE-UI-02, REQ-COMPAT-01 | Playwright + Mock |
| TC-UI-006 | 경로검색 > 결과화면 > 오류 | 조회 오류 화면 안내 | 로그인 완료 | 1. 검색 클릭<br>2. (503 목킹) | 오류 안내 메시지 표시, 카드 0건 | Pass | P2 | 기능 | 사용성 | REQ-ROUTE-UI-03, REQ-COMPAT-01 | Playwright + Mock |
| TC-API-001 | API > 사용자 > 조회 | 단일 사용자 조회 | API 접근 가능 | 1. GET /users/2 호출 | 200 반환, data 필드 정합, 응답시간 2초 이내 | Pass | P1 | 기능/비기능 | 기능적합성/성능효율성 | REQ-API-01, REQ-PERF-01 | Playwright / Postman |
| TC-API-002 | API > 사용자 > 조회 | 미존재 사용자 처리 | API 접근 가능 | 1. GET /users/23 호출 | 404 반환 | Pass | P2 | 기능 | 신뢰성 | REQ-API-02 | Playwright / Postman |
| TC-API-003 | API > 사용자 > 생성 | 사용자 생성 | API 접근 가능 | 1. POST /users (name, job) 호출 | 201 반환, 요청 데이터 반영 + id/createdAt 존재 | Pass | P1 | 기능 | 기능적합성 | REQ-API-03 | Playwright / Postman |
| TC-API-004 | API > 사용자 > 목록 | 목록/페이징 조회 | API 접근 가능 | 1. GET /users?page=1 호출 | 200 반환, data 배열 + page/per_page/total 정합 | Pass | P2 | 기능 | 기능적합성 | REQ-API-04 | Postman |
| TC-MOCK-001 | 경로검색 > 조회 > 정상 | 경로 검색 정상 응답 목킹 | 목킹 라우트 등록 | 1. /api/route-search 200 목킹<br>2. fetch 호출 | routes 2건, 최단경로 소요시간 < 대안경로 | Pass | P1 | 기능 | 기능적합성 | REQ-ROUTE-01 | Playwright(page.route) |
| TC-MOCK-002 | 경로검색 > 예외 > 오류 | 경로 검색 오류 응답 처리 | 목킹 라우트 등록 | 1. /api/route-search 503 목킹<br>2. fetch 호출 | 503 상태 정상 수신(예외 인지) | Pass | P2 | 비기능 | 신뢰성 | REQ-ROUTE-02 | Playwright(page.route) |
| TC-MOCK-003 | 경로검색 > 즐겨찾기 > 조회 | 즐겨찾기 목록 조회 | 목킹 라우트 등록 | 1. GET /api/favorites 200 목킹<br>2. fetch 호출 | items 각 항목에 name/lat/lng 존재 | Pass | P2 | 기능 | 기능적합성 | REQ-FAV-01 | Playwright(page.route) |
| TC-MOCK-004 | 경로검색 > 즐겨찾기 > 추가 | 즐겨찾기 추가 | 목킹 라우트 등록 | 1. POST /api/favorites 201 목킹<br>2. 좌표 포함 요청 | 201 반환, 요청(name/좌표) 반영 + id 발급 | Pass | P2 | 기능 | 기능적합성 | REQ-FAV-02 | Playwright(page.route) |
| TC-MOCK-005 | 장소추천 > 로컬맛집 > 조회 | 장소추천 평점 정렬 | 목킹 라우트 등록 | 1. GET /api/places/recommend 200 목킹<br>2. fetch 호출 | places가 rating 내림차순 정합 | Pass | P2 | 기능 | 기능적합성 | REQ-PLACE-01 | Playwright(page.route) |
| TC-MOCK-006 | 경로검색 > 조회 > 빈결과 | 경로 없음 처리(API) | 목킹 라우트 등록 | 1. /api/route-search 빈 routes 목킹<br>2. fetch 호출 | routes 빈 배열([]) 반환, 배열 타입 유지 | Pass | P3 | 기능 | 사용성 | REQ-ROUTE-03 | Playwright(page.route) |

> Step의 `<br>`은 GitHub/노션에서 줄바꿈으로 렌더링됩니다. 필터·정렬이 필요하면 `test-cases.xlsx` 를 사용하세요.
