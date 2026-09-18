# 요구사항 추적 매트릭스 (RTM, Requirements Traceability Matrix)

> 요구사항(REQ) ↔ 테스트 케이스(TC) 매핑으로, 모든 요구사항이 테스트로 커버되는지 확인합니다.
> [요구사항 정의서](requirements.md) · [테스트 케이스 명세](test-cases.md)

## 커버리지 요약

| 항목 | 값 |
| --- | --- |
| 전체 요구사항 | 18 |
| 커버된 요구사항 | 18 |
| **요구사항 커버리지** | **100%** |
| 전체 테스트 케이스 | 16 |
| 최종 판정 | Pass 100% |

## 요구사항 → 테스트 케이스

| 요구사항 ID | 요구사항 설명 | 구분 | 대응 TC | 커버 | 판정 |
| --- | --- | --- | --- | --- | --- |
| REQ-AUTH-01 | 유효 계정 로그인 성공 | 기능 | TC-UI-001 | ✅ | Pass |
| REQ-AUTH-02 | 잘못된 자격증명 차단 | 기능 | TC-UI-002 | ✅ | Pass |
| REQ-AUTH-03 | 필수 입력값 검증 | 기능 | TC-UI-003 | ✅ | Pass |
| REQ-API-01 | 단일 사용자 조회 | 기능 | TC-API-001 | ✅ | Pass |
| REQ-API-02 | 미존재 사용자 404 | 기능 | TC-API-002 | ✅ | Pass |
| REQ-API-03 | 사용자 생성 | 기능 | TC-API-003 | ✅ | Pass |
| REQ-API-04 | 사용자 목록/페이징 | 기능 | TC-API-004 | ✅ | Pass |
| REQ-ROUTE-01 | 경로 검색 정상 응답 | 기능 | TC-MOCK-001 | ✅ | Pass |
| REQ-ROUTE-03 | 경로 검색 빈 결과 처리(API) | 기능(사용성) | TC-MOCK-006 | ✅ | Pass |
| REQ-FAV-01 | 즐겨찾기 목록 조회 | 기능 | TC-MOCK-003 | ✅ | Pass |
| REQ-FAV-02 | 즐겨찾기 추가 | 기능 | TC-MOCK-004 | ✅ | Pass |
| REQ-PLACE-01 | 장소추천 평점 정렬 | 기능 | TC-MOCK-005 | ✅ | Pass |
| REQ-ROUTE-UI-01 | 경로 결과 화면 렌더링 | 기능 | TC-UI-004 | ✅ | Pass |
| REQ-ROUTE-UI-02 | 경로 없음 화면 안내 | 기능(사용성) | TC-UI-005 | ✅ | Pass |
| REQ-ROUTE-UI-03 | 조회 오류 화면 안내 | 기능(사용성) | TC-UI-006 | ✅ | Pass |
| REQ-ROUTE-02 | 경로 검색 오류(5xx) 처리 | 비기능(신뢰성) | TC-MOCK-002 | ✅ | Pass |
| REQ-PERF-01 | API 응답시간 2초 이내 | 비기능(성능) | TC-API-001 | ✅ | Pass |
| REQ-COMPAT-01 | 데스크톱/모바일 뷰포트 호환 | 비기능(호환성) | TC-UI-001~006 | ✅ | Pass |

## 테스트 케이스 → 요구사항 (역방향)

| TC ID | 대응 요구사항 | 자동화 도구 |
| --- | --- | --- |
| TC-UI-001 | REQ-AUTH-01, REQ-COMPAT-01 | Playwright |
| TC-UI-002 | REQ-AUTH-02, REQ-COMPAT-01 | Playwright |
| TC-UI-003 | REQ-AUTH-03, REQ-COMPAT-01 | Playwright |
| TC-UI-004 | REQ-ROUTE-UI-01, REQ-COMPAT-01 | Playwright + Mock |
| TC-UI-005 | REQ-ROUTE-UI-02, REQ-COMPAT-01 | Playwright + Mock |
| TC-UI-006 | REQ-ROUTE-UI-03, REQ-COMPAT-01 | Playwright + Mock |
| TC-API-001 | REQ-API-01, REQ-PERF-01 | Playwright / Postman |
| TC-API-002 | REQ-API-02 | Playwright / Postman |
| TC-API-003 | REQ-API-03 | Playwright / Postman |
| TC-API-004 | REQ-API-04 | Postman |
| TC-MOCK-001 | REQ-ROUTE-01 | Playwright(page.route) |
| TC-MOCK-002 | REQ-ROUTE-02 | Playwright(page.route) |
| TC-MOCK-003 | REQ-FAV-01 | Playwright(page.route) |
| TC-MOCK-004 | REQ-FAV-02 | Playwright(page.route) |
| TC-MOCK-005 | REQ-PLACE-01 | Playwright(page.route) |
| TC-MOCK-006 | REQ-ROUTE-03 | Playwright(page.route) |

## 품질 특성별 커버리지

| 품질 특성 (ISO/IEC 25010) | 대응 요구사항 | 커버 |
| --- | --- | --- |
| 기능적합성 | REQ-AUTH-01/03, REQ-API-01/03/04, REQ-ROUTE-01, REQ-FAV-01/02, REQ-PLACE-01, REQ-ROUTE-UI-01 | ✅ |
| 보안 | REQ-AUTH-02 | ✅ |
| 신뢰성 | REQ-API-02, REQ-ROUTE-02 | ✅ |
| 성능효율성 | REQ-PERF-01 | ✅ |
| 호환성 | REQ-COMPAT-01 | ✅ |
| 사용성 | REQ-ROUTE-03, REQ-ROUTE-UI-02, REQ-ROUTE-UI-03 | ✅ |
