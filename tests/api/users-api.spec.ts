import { test, expect } from '@playwright/test';

/**
 * [API 자동화] REST API 요청·응답 검증
 * 대상: https://reqres.in (공개 REST API 실습 서비스)
 * 검증 포인트: 상태 코드, 응답 스키마, 데이터 정합성 (네오플러스 본인인증 API 검증 경험과 동일한 접근)
 * 대응 TC: TC-API-001 ~ TC-API-003
 */
const BASE = 'https://reqres.in/api';
const HEADERS = { 'x-api-key': 'reqres-free-v1' }; // reqres 무료 티어 공개 키

test.describe('User API', () => {
  test('TC-API-001 | GET 단일 사용자 조회 - 200 및 응답 스키마 검증', async ({ request }) => {
    const res = await request.get(`${BASE}/users/2`, { headers: HEADERS });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(body.data).toMatchObject({
      id: 2,
      email: expect.stringContaining('@'),
      first_name: expect.any(String),
      last_name: expect.any(String),
    });
  });

  test('TC-API-002 | 존재하지 않는 사용자 조회 - 404 처리 검증', async ({ request }) => {
    const res = await request.get(`${BASE}/users/23`, { headers: HEADERS });
    expect(res.status()).toBe(404);
  });

  test('TC-API-003 | POST 사용자 생성 - 201 및 반환 데이터 정합성 검증', async ({ request }) => {
    const payload = { name: 'sunwook', job: 'QA Automation Engineer' };
    const res = await request.post(`${BASE}/users`, { headers: HEADERS, data: payload });

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject(payload);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});
