# Issues & Troubleshooting — Clean Copy Unlock

> 옵시디언 볼트 연동용 이슈/트러블슈팅 문서. 발생한 에러와 해결 과정을 실시간으로 갱신한다. 전체 진행 상황은 [[progress]] 참고.

## 경쟁사 리서치

### Simple Allow Copy
- 2025-10-25 크롬 웹 스토어에서 **멀웨어**로 플래그되어 제거됨.
- `api.simpleallowcopy.com`으로 방문 URL·검색기록·사용자 ID를 원격 전송한 것이 적발됨.
- 리뷰 불만: Bilibili 플레이어 컨트롤 파괴, Google Docs/Sheets/Slides 파괴, Overleaf Ctrl+S/Ctrl+Enter 무력화.
- → [[progress#로드맵--다음-단계-우선순위-순]] 항목 3의 테스트 대상 사이트 목록에 반영됨.

### Absolute Enable Right Click & Copy
- 2026-08-27(최근) 정책 위반 + **프라이버시 정책 부재**로 제거됨. 기능 문제가 아니라 **정책 문서 미비가 직접 원인**.
- 리뷰 불만: YouTube 볼륨바/스크롤바 조작 불가, ChatGPT 답변 복사 불가, "Absolute Mode"가 Google Sheets 기능 파괴, Instagram/Spotify 미작동.
- → [[progress]]의 P0 1번(개인정보처리방침) 근거.

### RedDirection(2025) / ShadyPanda(2025) 공급망 공격 캠페인
- 날씨/색상피커/이모지 키보드 같은 "단순 유틸 확장"들이 verified 상태를 얻은 뒤, 몇 년 후 업데이트로 악성코드가 심어져 URL+ID를 C2 서버로 전송.
- 우리와 같은 단순 유틸 카테고리가 표적이 되는 패턴 → 코드 투명성(오픈소스 공개 등)이 신뢰 확보에 중요.

## 트러블슈팅 / 진행 중인 이슈

### GUARDED_KEYS 's' 충돌 (미해결, P0)
- **현상:** `content_script.js`의 `GUARDED_KEYS = ['c','a','x','u','s','p']` 중 `'s'`(Ctrl+S 저장)를 캡처링 단계에서 무력화하면, Google Docs/Notion/코드 에디터 등 사이트 자체 저장 단축키와 충돌할 위험.
- **근거:** 경쟁사 리뷰(Simple Allow Copy, Absolute Enable)에서 동일 패턴이 최다 불만으로 확인됨.
- **제안된 해결책:** `'u', 's', 'p'` 제외하고 `'c', 'a', 'x'`만 남기기.
- **상태:** 사용자 승인 대기 중, 코드 미수정.

### 개인정보처리방침 부재 (미해결, P0)
- **현상:** 스토어 정책상 요구되는 개인정보처리방침 페이지가 아직 없음.
- **근거:** Absolute Enable Right Click & Copy가 정확히 이 사유로 제거됨.
- **상태:** 미작성.

## 아키텍처 결정: 제로 오버레이, 제로 DOM 조작
- **문제:** 기존 앱들은 오버레이 div, `cloneNode`로 DOM을 조작해 React/Vue SPA의 가상 DOM 재조정과 충돌.
- **해결:** `document`에 캡처링 단계 이벤트 리스너(`contextmenu`, `selectstart`, `copy`, `cut`, `dragstart`, `keydown`)만 등록하고 `stopImmediatePropagation()`으로 사이트의 차단 로직 실행 전에 전파를 끊음. `run_at: document_start`, `all_frames: true`로 모든 프레임에서 최대한 이른 시점에 등록.
- **검증:** Notion 등에서 충돌 없이 정상 동작 확인.

## 엣지 케이스 점검 필요 목록 (미착수)
- [ ] YouTube 동영상 컨트롤 (볼륨바/스크롤바)
- [ ] Bilibili 플레이어 컨트롤
- [ ] Google Docs/Sheets 단축키
- [ ] Overleaf Ctrl+S / Ctrl+Enter
- [ ] ChatGPT 답변 복사
- [ ] Instagram
- [ ] Spotify

## 변경 이력
- 2026-09-04: `docs/` 옵시디언 연동 문서화 시스템 최초 세팅, 기존 리서치 내용 이관.
