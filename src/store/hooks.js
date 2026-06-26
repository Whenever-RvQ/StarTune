// React hooks 封装 zustand vanilla store
import { useStore } from 'zustand';
import { playerStore } from './player-store.js';
import { uiStore } from './ui-store.js';

export function usePlayerStore(selector) {
  return useStore(playerStore, selector);
}

export function useUiStore(selector) {
  return useStore(uiStore, selector);
}
