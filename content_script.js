(() => {
  'use strict';

  const STORAGE_KEY = 'enabled';
  const MODE_KEY = 'mode';
  // 낙관적 기본값: storage 조회가 끝나기 전까지는 기존 검증된 "항상 차단 해제" 동작을 유지한다.
  let enabled = true;
  let mode = 'standard';

  chrome.storage.local.get({ [STORAGE_KEY]: true, [MODE_KEY]: 'standard' }, (result) => {
    enabled = result[STORAGE_KEY];
    mode = result[MODE_KEY];
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes[STORAGE_KEY]) enabled = changes[STORAGE_KEY].newValue;
    if (changes[MODE_KEY]) mode = changes[MODE_KEY].newValue;
  });

  // 오버레이/DOM 조작 없이, 캡처링 단계에서 사이트의 차단 이벤트가
  // 실행되기 전에 전파를 끊어 브라우저 기본 동작(우클릭 메뉴, 복사)을 그대로 살린다.
  const BLOCKED_EVENTS = ['contextmenu', 'selectstart', 'copy', 'cut', 'dragstart'];

  function unlock(event) {
    if (!enabled) return;
    event.stopImmediatePropagation();
  }

  BLOCKED_EVENTS.forEach((type) => {
    document.addEventListener(type, unlock, true);
  });

  // 일부 사이트는 우클릭/copy 이벤트 대신 Ctrl(Cmd)+C 등 단축키를
  // keydown 단계에서 미리 preventDefault 하므로 별도 방어가 필요하다.
  // 'u'(보기 소스)/'s'(저장)/'p'(인쇄)는 Google Docs·Notion·코드 에디터 등
  // 사이트 자체 단축키와 충돌해 기능을 파괴할 수 있어 Standard 모드에서는 제외한다.
  // Strong 모드는 사용자가 그 위험을 감수하고 명시적으로 켠 경우에만 포함한다.
  const STANDARD_KEYS = new Set(['c', 'a', 'x']);
  const STRONG_KEYS = new Set(['c', 'a', 'x', 'u', 's', 'p']);

  function unlockKeydown(event) {
    if (!enabled) return;
    const hasModifier = event.ctrlKey || event.metaKey;
    const guardedKeys = mode === 'strong' ? STRONG_KEYS : STANDARD_KEYS;
    if (hasModifier && guardedKeys.has(event.key.toLowerCase())) {
      event.stopImmediatePropagation();
    }
  }

  document.addEventListener('keydown', unlockKeydown, true);
})();
