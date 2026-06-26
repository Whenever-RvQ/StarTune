// StarTune React Toast 组件
// 监听 uiStore.toast / toastKey，自动显示并 2.6s 后淡出
// 挂载后隐藏原生 #toast DOM，由 React 接管 toast 渲染

import React, { useEffect, useRef, useState } from 'react';
import { useUiStore } from '../store/hooks.js';

export function Toast() {
  var toast = useUiStore(function (s) { return s.toast; });
  var toastKey = useUiStore(function (s) { return s.toastKey; });
  var [visible, setVisible] = useState(false);
  var timerRef = useRef(null);

  // 挂载时隐藏原生 #toast DOM，由 React 全面接管
  useEffect(function () {
    var legacyToast = document.getElementById('toast');
    if (legacyToast) legacyToast.style.display = 'none';
    return function () {
      // 卸载时恢复原生 toast（安全回退）
      if (legacyToast) legacyToast.style.display = '';
    };
  }, []);

  useEffect(function () {
    if (!toast) return;
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(function () {
      setVisible(false);
    }, 2600);
    return function () {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast, toastKey]);

  if (!toast) return null;

  return React.createElement('div', {
    className: 'react-toast' + (visible ? ' show' : ''),
    'aria-live': 'polite',
  }, toast);
}
