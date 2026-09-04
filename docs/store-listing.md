# Chrome Web Store 등록용 문구 (v1.0.0)

> 개발자 대시보드에 그대로 붙여넣을 수 있도록 준비한 텍스트. 실제 등록·제출은 사용자가 직접 진행.

## 기본 정보

- **카테고리**: 생산성 도구 (Productivity)
- **언어**: 한국어(기본), English
- **개인정보처리방침 URL**: https://minseobae.github.io/clean-copy-unlock/privacy-policy.html

## 단일 목적(Single Purpose) 설명

> 크롬 웹스토어 심사 시 "이 확장 프로그램의 단일 목적이 무엇인가"를 명확히 요구함.

**한국어**: 웹사이트가 자바스크립트로 막아둔 우클릭, 텍스트 선택, 복사/잘라내기를 사용자가 다시 사용할 수 있도록 허용합니다. 그 외의 기능은 없습니다.

**English**: Re-enables right-click, text selection, and copy/cut on web pages that block them via JavaScript. It has no other function.

## 짧은 설명 (Summary, 132자 이내)

**한국어**: React/Vue/Notion 등 동적 웹사이트와 충돌 없이 우클릭·복사 제한을 해제합니다. 오버레이 없는 방식이라 사이트 기능을 깨뜨리지 않습니다.

**English**: Unblocks right-click and copy restrictions without breaking React/Vue/Notion sites. No overlays — your page's own features stay intact.

## 상세 설명 (Description)

**한국어**:
```
Clean Copy Unlock은 웹사이트가 막아둔 우클릭과 복사를 다시 쓸 수 있게 해주는 확장 프로그램입니다.

■ 기존 유사 확장 프로그램들과 다른 점
많은 우클릭/복사 해제 확장 프로그램이 화면 위에 투명한 막(오버레이)을 씌우거나 페이지의 DOM을 직접 조작하는 방식을 씁니다. 이 방식은 Google Docs, Notion, 유튜브처럼 자체 UI가 복잡한 최신 웹사이트에서 스크롤바나 재생 컨트롤을 망가뜨리는 경우가 많습니다.

Clean Copy Unlock은 DOM을 전혀 건드리지 않습니다. 대신 사이트가 복사를 막으려고 실행하는 이벤트 처리 로직보다 먼저 개입해서 그 로직이 실행되지 않도록 할 뿐입니다. 그래서 사이트 고유의 기능(볼륨 조절, 스크롤, Google Docs 자동저장 등)은 그대로 유지됩니다.

■ 주요 기능
- 우클릭 메뉴, 텍스트 선택, 복사/잘라내기 차단 해제
- 툴바 아이콘 클릭으로 즉시 ON/OFF 전환
- Standard 모드(기본): 복사 관련 단축키(Ctrl+C/A/X)만 해제 — 저장/인쇄 등 사이트 자체 기능과 충돌하지 않음
- Strong 모드(선택): Ctrl+S/P/U(저장/인쇄/소스보기)까지 추가로 해제하고 싶은 고급 사용자를 위한 옵션
- 한국어/영어 지원

■ 개인정보 보호
이 확장 프로그램은 어떤 데이터도 수집하지 않습니다. 방문 기록, 검색어, 페이지 내용을 어디로도 전송하지 않으며, storage 권한은 오직 ON/OFF 설정값을 사용자의 브라우저 안에만 저장하는 데 씁니다. 서버도, 분석 도구도, 광고 SDK도 없습니다.
```

**English**:
```
Clean Copy Unlock lets you use right-click and copy again on websites that block them.

■ How this is different
Many similar extensions inject a transparent overlay or directly manipulate the page's DOM to unblock copying. On modern sites with complex UI (Google Docs, Notion, YouTube), that approach often breaks scrollbars or playback controls.

Clean Copy Unlock never touches the DOM. It simply intervenes before a site's own blocking logic runs, so the site's own features (volume control, scrolling, Google Docs autosave) keep working exactly as intended.

■ Features
- Unblocks right-click, text selection, and copy/cut
- One-click ON/OFF from the toolbar icon
- Standard mode (default): only unblocks copy-related shortcuts (Ctrl+C/A/X) — never conflicts with a site's own save/print shortcuts
- Strong mode (optional): also unblocks Ctrl+S/P/U (save/print/view-source) for advanced users
- Korean and English supported

■ Privacy
This extension collects no data whatsoever. It never transmits browsing history, search queries, or page content anywhere. The storage permission is used solely to save your ON/OFF preference inside your own browser. No servers, no analytics, no ad SDKs.
```

## 개인정보 처리 관행(Privacy practices) 탭 작성 가이드

대시보드의 "권한 정당화" 입력란에 아래 내용을 참고해 작성:

- **`storage` 권한 사용 이유**: 사용자가 설정한 ON/OFF 및 Standard/Strong 모드 값을 기기에 저장해 다음 방문 때도 유지하기 위함. 원격 전송 없음.
- **호스트 권한(`<all_urls>` 콘텐츠 스크립트) 사용 이유**: 이 확장 프로그램의 핵심 기능은 웹사이트가 자바스크립트로 차단한 우클릭·복사를 다시 허용하는 것이다. 어떤 사이트가 이런 차단을 걸어둘지 미리 알 수 없기 때문에, 사용자가 방문하는 모든 사이트에서 콘텐츠 스크립트가 실행되어야 한다. 이 스크립트는 우클릭/복사/선택 관련 이벤트를 로컬에서 가로채는 것 외에는 아무 동작도 하지 않으며, 페이지 콘텐츠를 읽거나 저장하거나 외부로 전송하지 않는다.
- **원격 코드 사용 여부**: 없음 (모든 코드가 패키지에 포함됨).
- **데이터 수집 여부 설문**: "개인 식별 정보를 수집하지 않음", "민감 정보 없음", "이 항목 없음" 등 해당 없음 항목에 전부 체크.

## 스크린샷/프로모션 이미지

- 스크린샷 1장 이상 필요 (1280x800 또는 640x400) — `docs/store-assets/`에 준비.
- 작은 프로모타일(440x280)은 선택사항.

## 배포 패키지

`npm`/빌드 도구 없이 순수 정적 파일이라, 아래 런타임 파일만 압축해서 업로드:
```
manifest.json
background.js
content_script.js
popup.html
popup.js
icons/icon16.png
icons/icon48.png
icons/icon128.png
_locales/ko/messages.json
_locales/en/messages.json
```
(`README.md`, `docs/`, `PRIVACY_POLICY.md`, `privacy-policy.html`, `CLAUDE.md`, `icons/icon_master.png`, `.git*`는 제외 — 실행에 불필요)
