// StarTune React 层入口
// 渐进式重构：React 组件挂载在 #react-root 上，
// 与原生 JS / Three.js 层通过 zustand store 桥接。

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.jsx';
import { playerStore } from './store/player-store.js';
import { uiStore } from './store/ui-store.js';

// 暴露 store 到 window，供原生 JS 写入状态
window.__playerStore = playerStore;
window.__uiStore = uiStore;

function mountReactApp() {
  const container = document.getElementById('react-root');
  if (!container) {
    console.warn('[StarTune React] #react-root not found, skipping mount');
    return;
  }
  const root = createRoot(container);
  root.render(React.createElement(App));
  console.log('[StarTune React] mounted, stores exposed on window.__playerStore / window.__uiStore');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountReactApp);
} else {
  mountReactApp();
}
