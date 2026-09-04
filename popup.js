'use strict';

const STORAGE_KEY = 'enabled';
const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

document.querySelectorAll('[data-i18n]').forEach((el) => {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
});

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = chrome.i18n.getMessage(enabled ? 'statusOn' : 'statusOff');
}

chrome.storage.local.get({ [STORAGE_KEY]: true }, (result) => {
  render(result[STORAGE_KEY]);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  render(enabled);
});
