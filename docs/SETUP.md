# 셋업 & 노션 연결 가이드

## 1. GitHub 레포 만들고 푸시

```bash
# 압축 해제한 폴더에서
git init
git add .
git commit -m "chore: QA automation demo (UI/API/mocking + CI/Pages)"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## 2. GitHub Pages 활성화 (리포트 링크 생성)

1. 레포 → **Settings** → **Pages**
2. **Build and deployment → Source** 를 **`GitHub Actions`** 로 선택
3. 저장하면 다음 push부터 리포트가 자동 배포됩니다.
   - 리포트 URL: `https://<username>.github.io/<repo>/`

## 3. README 링크 교체

`README.md` 상단의 `USERNAME/REPO` 3곳을 실제 계정/레포명으로 바꾸세요
(배지, Pages 링크, Actions 링크).

## 4. 첫 실행 확인

- 레포 **Actions** 탭에서 `QA Automation CI` 워크플로가 초록색으로 완료되는지 확인
- 완료 후 Pages URL을 열어 HTML 리포트(통과/실패·스크린샷·trace)가 보이는지 확인

---

## 4-1. 리포트 구성 (Playwright + Postman/Newman)

CI가 완료되면 Pages 루트에 **두 리포트를 잇는 랜딩 페이지**가 배포됩니다.

- 랜딩(메인 링크): `https://<username>.github.io/<repo>/`
- Playwright 리포트: `https://<username>.github.io/<repo>/playwright/`
- Postman/Newman 리포트: `https://<username>.github.io/<repo>/newman/`

Postman 컬렉션은 `postman/qa-api.postman_collection.json`, 환경은 `postman/reqres.postman_environment.json` 입니다.
로컬에서 직접 돌려보려면:

```bash
npm install -g newman newman-reporter-htmlextra
newman run postman/qa-api.postman_collection.json -e postman/reqres.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export newman-report/index.html
```

Postman 앱에서 열어보려면 두 json 파일을 각각 **Import** 하면 됩니다.

## 4-2. QA 문서 (요구사항 → 테스트 → 추적성)

`docs/` 폴더에 QA 프로세스 문서가 있습니다.

- `requirements.md` — 요구사항 정의서 (REQ-ID, 인수기준, 우선순위, 품질특성)
- `test-cases.md` — 테스트 케이스 명세 (ID/분류/Step/기대결과/판정/우선순위/구분/품질특성/요구사항ID)
- `traceability-matrix.md` — 요구사항 추적 매트릭스 (커버리지 100%)
- `test-cases.xlsx` — 위 3종을 시트로 담은 Excel (필터·드롭다운·커버리지 자동집계). 실제 TC 관리 형태

노션에는 `.md`는 붙여넣으면 표로 변환되고, `.xlsx`는 GitHub 링크를 **북마크**로 걸거나 파일을 업로드하면 됩니다.

## 5. 노션 이력서에 링크 연결하기

노션 이력서의 **Work Experience(스타일셀러) 아래** 또는 **Introduce 아래**에 콜아웃 블록을 하나 만들고 아래처럼 넣으면 됩니다.

### 방법 A — 콜아웃 + 링크 (간단)

> 노션에서 `/콜아웃` 입력 후 아래 텍스트를 붙여넣기

```
🔗 QA Automation Demo (공개 샌드박스 대상 데모)
· GitHub 레포 → https://github.com/<username>/<repo>
· CI 실행 결과 → https://github.com/<username>/<repo>/actions
· 테스트 리포트(HTML) → https://<username>.github.io/<repo>/
· 테스트 케이스 명세 → (레포 docs/test-cases.md 또는 노션 하위 DB)
```

### 방법 B — 북마크 카드 (미리보기 예쁘게)

노션에서 `/북마크` 입력 후 각 URL을 붙여넣으면 썸네일 카드로 표시됩니다.
리포트 링크와 GitHub 레포 링크를 북마크로 넣는 것을 추천합니다.

### 방법 C — 테스트 케이스를 노션 DB로

`docs/test-cases.md` 의 표를 노션에 붙여넣으면 표로 변환됩니다.
표를 선택 후 우측 상단 `•••` → **데이터베이스로 전환** 하면
우선순위·상태 등으로 필터링 가능한 TC 관리 DB가 됩니다.

---

## 면접 방어 포인트 (정직성)

- "회사 서비스는 기밀이라 공개할 수 없어, **공개 샌드박스를 대상으로 동일한 검증 방식**을 재현한 데모"라고 설명하면 됩니다.
- API Mocking은 이력서상 실무 경험이 명시돼 있지 않은 영역이므로, "채용공고 요건에 맞춰 **직접 학습·구현한 데모**"로 솔직하게 포지셔닝하는 것이 가장 강력합니다.
