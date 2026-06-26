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

// 便捷方法：打开 / 关闭弹窗（原生 JS 通过 window.__uiStore 调用）
uiStore.openModal = function (name, props) {
  uiStore.setState({ activeModal: name, modalProps: props || null });
};
uiStore.closeModal = function () {
  uiStore.setState({ activeModal: null, modalProps: null });
};
uiStore.showToast = function (msg) {
  var prev = uiStore.getState();
  uiStore.setState({ toast: msg, toastKey: (prev.toastKey || 0) + 1 });
};

export { uiStore };
