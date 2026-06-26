// UI 状态 store（zustand vanilla store）
import { createStore } from 'zustand/vanilla';

var uiStore = createStore(function () {
  return {
    toast: '',
    toastKey: 0,
    activeModal: null,  // 'login' | 'user' | 'coverCrop' | 'collect' | 'update' | 'customLyric' | 'trackDetail' | 'localBeat' | null
    modalProps: null,
    searchQuery: '',
    searchResults: [],
    searchMode: 'song',
  };
});

export { uiStore };
