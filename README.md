# Clean Copy Unlock

React/Vue 기반 SPA, Notion 같은 동적 웹사이트와 충돌 없이 우클릭 및 복사 제한을 해제하는 크롬 확장 프로그램(Manifest V3)입니다.

## 왜 만들었나

기존에 널리 쓰이던 비슷한 종류의 확장 프로그램들이 오버레이(투명 막)나 `cloneNode` 같은 DOM 조작 방식을 쓰면서 최신 동적 웹사이트에서 스크롤바·볼륨 슬라이더·저장 단축키 같은 사이트 자체 기능을 자주 깨뜨리는 문제가 있었습니다. Clean Copy Unlock은 DOM을 전혀 건드리지 않는 방식으로 이 문제를 피합니다.

## 동작 방식

`document`에 캡처링 단계 이벤트 리스너만 등록하고, 사이트의 차단 로직이 실행되기 전에 `stopImmediatePropagation()`으로 전파를 끊습니다. 오버레이 div, DOM 복제, 페이지 스크립트 수정 등은 전혀 사용하지 않습니다.

- 항상 해제: 우클릭 메뉴, 텍스트 선택, 복사/잘라내기, 드래그
- **Standard 모드(기본값)**: Ctrl/Cmd + C, A, X만 강제로 해제 — 클립보드 관련 동작만 건드립니다.
- **Strong 모드(선택)**: Ctrl/Cmd + S, P, U(저장/인쇄/소스보기)까지 추가로 해제 — 이 단축키를 사이트가 자체 기능으로 쓰는 경우(예: Google Docs 저장) 충돌할 수 있어 기본값이 아닙니다.

## 권한

`storage` 권한 하나만 사용합니다. 팝업의 ON/OFF 및 Standard/Strong 설정 값을 브라우저 로컬 저장소에 저장하는 용도이며, 이 값은 기기 밖으로 전송되지 않습니다. 개인정보, 방문 기록, 페이지 콘텐츠는 수집하지 않습니다.

자세한 내용은 [개인정보처리방침](https://minseobae.github.io/clean-copy-unlock/privacy-policy.html)을 참고하세요.

## 설치 (개발자 모드)

아직 크롬 웹스토어에 등록되지 않아, 소스에서 직접 로드해야 합니다.

1. 이 저장소를 클론하거나 다운로드합니다.
2. 크롬 주소창에 `chrome://extensions`를 입력합니다.
3. 우측 상단 "개발자 모드"를 켭니다.
4. "압축해제된 확장 프로그램을 로드합니다"를 클릭하고 이 저장소 폴더를 선택합니다.

## 언어

한국어, 영어를 지원합니다(`_locales/ko`, `_locales/en`). 브라우저 표시 언어에 따라 자동으로 전환됩니다.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `manifest.json` | Manifest V3 설정 |
| `content_script.js` | 이벤트 차단 해제 핵심 로직 |
| `background.js` | 툴바 뱃지 ON/OFF 동기화 |
| `popup.html` / `popup.js` | ON/OFF 및 Standard/Strong 토글 UI |
| `_locales/` | 다국어 메시지 |

## 프로젝트 문서

진행 상황과 이슈 기록은 [`docs/progress.md`](docs/progress.md), [`docs/issues.md`](docs/issues.md)에 있습니다.
