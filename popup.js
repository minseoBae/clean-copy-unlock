'use strict';

const STORAGE_KEY = 'enabled';
const MODE_KEY = 'mode';
const toggle = document.getElementById('toggle');
const status = document.getElementById('status');
const modeToggle = document.getElementById('modeToggle');
const modeHint = document.getElementById('modeHint');

document.querySelectorAll('[data-i18n]').forEach((el) => {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
});

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = chrome.i18n.getMessage(enabled ? 'statusOn' : 'statusOff');
}

function renderMode(mode) {
  modeToggle.checked = mode === 'strong';
  modeHint.textContent = chrome.i18n.getMessage(
    mode === 'strong' ? 'modeHintStrong' : 'modeHintStandard'
  );
}

chrome.storage.local.get({ [STORAGE_KEY]: true, [MODE_KEY]: 'standard' }, (result) => {
  render(result[STORAGE_KEY]);
  renderMode(result[MODE_KEY]);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  render(enabled);
});

modeToggle.addEventListener('change', () => {
  const mode = modeToggle.checked ? 'strong' : 'standard';
  chrome.storage.local.set({ [MODE_KEY]: mode });
  renderMode(mode);
});
