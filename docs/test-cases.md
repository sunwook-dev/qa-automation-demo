# 테스트 케이스 명세 (Test Case Specification)

> 공개 샌드박스(saucedemo.com / reqres.in) 및 목킹 환경을 대상으로 작성한 데모 테스트 케이스입니다.
> 실 서비스/회사 데이터가 아닌, 자동화 역량 시연용 케이스입니다.

## 요약

| 구분 | 케이스 수 | 자동화 | 적용 설계 기법 |
| --- | --- | --- | --- |
| UI 자동화 | 4 | ✅ Playwright(POM) | 동등분할, 경계값, 상태전이, 시나리오 |
| API 자동화 | 3 | ✅ Playwright request | 상태코드/스키마/정합성 검증 |
| API Mocking | 2 | ✅ page.route | 정상/오류 응답 목킹, 예외 처리 |
| **합계** | **9** | | |

## UI 자동화

| TC ID | 시나리오 | 절차 | 기대 결과 | 우선순위 | 기법 |
| --- | --- | --- | --- | --- | --- |
| TC-UI-001 | 정상 로그인 | 정상 계정 입력 후 로그인 | 상품 목록(Products)으로 이동, URL이 inventory.html | P1 | 동등분할 |
| TC-UI-002 | 잠긴 계정 로그인 | locked_out_user로 로그인 | "locked out" 오류 메시지 노출 | P1 | 동등분할 |
| TC-UI-003 | 비밀번호 미입력 | 비밀번호 공란으로 로그인 | "Password is required" 필수값 오류 | P2 | 경계값 |
| TC-UI-004 | 장바구니 담기 | 로그인 후 첫 상품 담기 | 장바구니 배지 카운트 1 증가 | P2 | 시나리오 |

## API 자동화

| TC ID | 시나리오 | 절차 | 기대 결과 | 우선순위 |
| --- | --- | --- | --- | --- |
| TC-API-001 | 단일 사용자 조회 | GET /users/2 | 200, 응답 스키마(id/email/name) 정합 | P1 |
| TC-API-002 | 미존재 사용자 조회 | GET /users/23 | 404 반환 | P2 |
| TC-API-003 | 사용자 생성 | POST /users | 201, 요청 데이터 반영 + id/createdAt 존재 | P1 |

## API Mocking

| TC ID | 시나리오 | 절차 | 기대 결과 | 우선순위 |
| --- | --- | --- | --- | --- |
| TC-MOCK-001 | 경로 검색 정상 응답 목킹 | /api/route-search 200 목킹 후 호출 | routes 2건, 최단 경로 소요시간 < 대안 경로 | P1 |
| TC-MOCK-002 | 경로 검색 오류 응답 목킹 | /api/route-search 503 목킹 후 호출 | 503 상태 반환(예외 처리 검증) | P2 |
