# Progress — Clean Copy Unlock

> 옵시디언 볼트 연동용 진행 상황 문서. 기능 구현/버그 수정 시마다 이 파일을 갱신한다. 이슈/트러블슈팅은 [[issues]] 참고.

## 프로젝트 개요
- **목표:** 우클릭/복사 제한 해제 크롬 확장 프로그램(MV3). 기존 인기 앱(Simple Allow Copy 등)이 React/Vue SPA, Notion 등에서 일으키는 스크립트 충돌·오버레이 오작동을 해결한 "클린 버전".
- **아키텍처 원칙:** 제로 오버레이, 제로 DOM 조작 — `document`에 캡처링 단계 이벤트 리스너만 등록하고 `stopImmediatePropagation()`으로 사이트 차단 로직을 무력화. 자세한 배경은 [[issues#경쟁사 리서치]] 참고.

## 현재 버전: v1.0.0 (첫 공개 배포 준비)

### `manifest.json`
- `manifest_version: 3`
- `permissions: ["storage"]`
- `icons` / `action.default_icon`: `icons/icon{16,48,128}.png` (2026-09-04 추가 — 이전엔 아이콘이 없어서 기본 퍼즐 아이콘으로 표시됐음)
- `background.service_worker: background.js`
- `action.default_popup: popup.html`
- `content_scripts`: `<all_urls>`, `content_script.js`, `run_at: document_start`, `all_frames: true`

### `content_script.js` 구조
1. **Storage 연동 (`enabled` 플래그)**
   - `chrome.storage.local.get`으로 초기값 로드, 조회 완료 전에는 낙관적 기본값 `true` 유지.
   - `chrome.storage.onChanged` 리스너로 팝업 토글과 실시간 동기화.
2. **이벤트 차단 해제 (`BLOCKED_EVENTS`)**
   - `contextmenu`, `selectstart`, `copy`, `cut`, `dragstart`를 캡처링 단계에서 가로채 `stopImmediatePropagation()` 호출.
3. **단축키 차단 해제 (Standard/Strong 모드)**
   - `storage.mode`(`'standard'`|`'strong'`, 기본값 `standard`)에 따라 `keydown` 캡처링 단계에서 무력화할 키 집합이 달라짐.
   - `STANDARD_KEYS = Set(['c','a','x'])` — 클립보드 관련 키만. `'u','s','p'`는 Google Docs/Notion/코드 에디터 등 사이트 자체 저장·인쇄·소스보기 단축키와 충돌해 제외 (2026-09-04 수정, 상세는 [[issues#GUARDED_KEYS 's' 충돌 — 해결됨]]).
   - `STRONG_KEYS = Set(['c','a','x','u','s','p'])` — 사용자가 팝업에서 명시적으로 켰을 때만 적용, 충돌 위험을 감수하는 옵션.

### `background.js` / `popup.html` / `popup.js`
- 툴바 뱃지 ON/OFF 동기화(`background.js`) 및 전역 토글 UI(`popup.*`) — storage의 `enabled` 값을 읽고 쓴다.

## 완료된 검증
- Notion 등 대상 사이트에서 충돌 없이 정상 동작 확인 (사용자 실사용 테스트).

## 로드맵 / 다음 단계 (우선순위 순)
1. ~~개인정보처리방침 페이지 작성·게시~~ — 완료 (2026-09-04). 저장소를 Public으로 전환 + GitHub Pages 활성화. 공개 URL: https://minseobae.github.io/clean-copy-unlock/privacy-policy.html — 크롬 웹스토어 등록 시 이 URL 사용.
2. ~~`GUARDED_KEYS`에서 `'u','s','p'` 제외~~ — 완료, `main` 병합 완료 (2026-09-04).
3. **[P1]** 추가 실사용 테스트 — 일부 완료 (2026-09-04): YouTube/Google Docs/ChatGPT 정상 확인. Bilibili(지역 제한 추정)/Overleaf(로그인 필요)/Instagram(계정 보안 확인 화면)/Spotify(시간 관계상)는 미확인, 상세는 [[issues#엣지-케이스-점검-2026-09-04-claude-in-chrome로-실사용-테스트]] 참고.
4. ~~다국어(i18n) 지원~~ — 완료 (2026-09-04). `_locales/ko`, `_locales/en` 추가, `manifest.json`(name/description) + `popup.html`/`popup.js`(토글 라벨, 상태 텍스트)를 `chrome.i18n`으로 전환. 브라우저 UI 언어가 한국어가 아니면 자동으로 영어로 표시됨(`default_locale: ko`).
5. ~~"강도 모드"(Standard/Strong) 옵션~~ — 완료 (2026-09-04). `storage.mode` (`'standard'`|`'strong'`, 기본값 `standard`) 추가. Standard는 `c/a/x`만, Strong은 `c/a/x/u/s/p` 전부 강제 해제. 팝업에 토글 추가, i18n(ko/en) 반영. 로컬 테스트 페이지로 두 모드 모두 검증 완료.
6. **[진행 중]** 크롬 웹스토어 등록 준비 — 버전 1.0.0으로 상향, 등록용 문구·개인정보 설문 답변 정리(`docs/store-listing.md`), 프로모션 스크린샷 1장(`docs/store-assets/screenshot-1.png`) 준비 완료. 개발자 계정 등록($5)·업로드·제출은 사용자가 직접 진행해야 함 — 결제/계정 관련 작업은 대행 불가.

## 변경 이력
- 2026-09-04: v1.0.0 — 버전 상향, 스토어 등록용 문구/스크린샷 준비.
- 2026-09-04: `GUARDED_KEYS`에서 `'u','s','p'` 제외 (`'c','a','x'`만 유지) — `fix/guarded-keys-conflict` 브랜치.
- 2026-09-04: `docs/` 옵시디언 연동 문서화 시스템 최초 세팅.
- 2026-09-03: v0.2.0 — storage 연동 `enabled` 플래그, 캡처링 단계 이벤트 차단 해제 방식 확정.
