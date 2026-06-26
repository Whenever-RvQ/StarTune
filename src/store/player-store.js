// 播放器核心状态 store（zustand vanilla store）
// 原生 JS 通过 window.__playerStore 写入，React 组件通过 hook 读取
import { createStore } from 'zustand/vanilla';

var playerStore = createStore(function () {
  return {
    playQueue: [],
    currentIdx: -1,
    playing: false,
    playMode: 'loop',
    volume: 1,
    currentSong: null,    // { name, artist, cover, duration }
    currentTime: 0,
    duration: 0,
  };
});

export { playerStore };
