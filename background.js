'use strict';

const STORAGE_KEY = 'enabled';

function updateBadge(enabled) {
  chrome.action.setBadgeText({ text: enabled ? 'ON' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: enabled ? '#2ecc71' : '#95a5a6' });
}

function syncBadgeFromStorage() {
  chrome.storage.local.get({ [STORAGE_KEY]: true }, (result) => {
    updateBadge(result[STORAGE_KEY]);
  });
}

chrome.runtime.onInstalled.addListener(syncBadgeFromStorage);
chrome.runtime.onStartup.addListener(syncBadgeFromStorage);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[STORAGE_KEY]) {
    updateBadge(changes[STORAGE_KEY].newValue);
  }
});
