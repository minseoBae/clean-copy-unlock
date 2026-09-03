'use strict';

const STORAGE_KEY = 'enabled';
const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled
    ? '현재 켜짐 (우클릭/복사 가능)'
    : '현재 꺼짐 (사이트 기본 정책 적용)';
}

chrome.storage.local.get({ [STORAGE_KEY]: true }, (result) => {
  render(result[STORAGE_KEY]);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  render(enabled);
});
