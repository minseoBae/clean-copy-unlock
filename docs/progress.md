# Progress — Clean Copy Unlock

> 옵시디언 볼트 연동용 진행 상황 문서. 기능 구현/버그 수정 시마다 이 파일을 갱신한다. 이슈/트러블슈팅은 [[issues]] 참고.

## 프로젝트 개요
- **목표:** 우클릭/복사 제한 해제 크롬 확장 프로그램(MV3). 기존 인기 앱(Simple Allow Copy 등)이 React/Vue SPA, Notion 등에서 일으키는 스크립트 충돌·오버레이 오작동을 해결한 "클린 버전".
- **아키텍처 원칙:** 제로 오버레이, 제로 DOM 조작 — `document`에 캡처링 단계 이벤트 리스너만 등록하고 `stopImmediatePropagation()`으로 사이트 차단 로직을 무력화. 자세한 배경은 [[issues#경쟁사 리서치]] 참고.

## 현재 버전: v0.2.0

### `manifest.json`
- `manifest_version: 3`
- `permissions: ["storage"]`
- `background.service_worker: background.js`
- `action.default_popup: popup.html`
- `content_scripts`: `<all_urls>`, `content_script.js`, `run_at: document_start`, `all_frames: true`

### `content_script.js` 구조
1. **Storage 연동 (`enabled` 플래그)**
   - `chrome.storage.local.get`으로 초기값 로드, 조회 완료 전에는 낙관적 기본값 `true` 유지.
   - `chrome.storage.onChanged` 리스너로 팝업 토글과 실시간 동기화.
2. **이벤트 차단 해제 (`BLOCKED_EVENTS`)**
   - `contextmenu`, `selectstart`, `copy`, `cut`, `dragstart`를 캡처링 단계에서 가로채 `stopImmediatePropagation()` 호출.
3. **단축키 차단 해제 (`GUARDED_KEYS`)**
   - 현재 `Set(['c','a','x','u','s','p'])` — Ctrl/Cmd + 해당 키 조합의 `keydown`을 캡처링 단계에서 무력화.
   - ⚠️ `'s'`(Ctrl+S) 관련 알려진 충돌 위험 있음 — 상세는 [[issues#GUARDED_KEYS 's' 충돌]].

### `background.js` / `popup.html` / `popup.js`
- 툴바 뱃지 ON/OFF 동기화(`background.js`) 및 전역 토글 UI(`popup.*`) — storage의 `enabled` 값을 읽고 쓴다.

## 완료된 검증
- Notion 등 대상 사이트에서 충돌 없이 정상 동작 확인 (사용자 실사용 테스트).

## 로드맵 / 다음 단계 (우선순위 순)
1. ~~개인정보처리방침 페이지 작성·게시~~ — 완료 (2026-09-04). 저장소를 Public으로 전환 + GitHub Pages 활성화. 공개 URL: https://minseobae.github.io/clean-copy-unlock/privacy-policy.html — 크롬 웹스토어 등록 시 이 URL 사용.
2. **[P0]** `GUARDED_KEYS`에서 `'u','s','p'` 제외, `'c','a','x'`만 유지하는 방향 검토 중 — 사용자 승인 대기, 코드 미수정.
3. **[P1]** 추가 실사용 테스트: YouTube/Bilibili 동영상 컨트롤, Google Docs/Sheets/Overleaf 단축키, ChatGPT, Instagram, Spotify.
4. **[백로그]** 다국어(i18n) 지원.
5. **[백로그]** "강도 모드"(Standard/Strong) 옵션.

## 변경 이력
- 2026-09-04: `docs/` 옵시디언 연동 문서화 시스템 최초 세팅.
- 2026-09-03: v0.2.0 — storage 연동 `enabled` 플래그, 캡처링 단계 이벤트 차단 해제 방식 확정.
