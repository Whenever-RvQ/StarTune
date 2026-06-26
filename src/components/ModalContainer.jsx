// StarTune React Modal 容器
// Phase 2: Portal 式渐进迁移
// 将原生 DOM 弹窗的 mask + GSAP 动画层接管到 React，
// 弹窗内部内容（.modal div）仍由原生 JS 控制。
//
// 工作原理：
// 1. 原生 JS 调用 window.__uiStore.openModal('trackDetail') 等
// 2. ModalContainer 检测 activeModal 变化
// 3. 找到对应的原生 .modal 元素，移入 React 管理的 mask 层
// 4. 关闭时把 .modal 元素还回原来的 modal-mask 容器

import React, { useEffect, useRef, useCallback } from 'react';
import { useUiStore } from '../store/hooks.js';

// 弹窗名称 → 原生 DOM mask 元素 id 的映射
var MODAL_ID_MAP = {
  trackDetail: 'track-detail-modal',
  update: 'update-modal',
  customLyric: 'custom-lyric-modal',
};

function closeModal() {
  var store = window.__uiStore;
  if (store) store.setState({ activeModal: null, modalProps: null });
}

export function ModalContainer() {
  var activeModal = useUiStore(function (s) { return s.activeModal; });
  var maskRef = useRef(null);
  var panelRef = useRef(null);       // 指向被移入的原生 .modal 元素
  var prevMaskIdRef = useRef(null);   // 记录元素原始父容器 id
  var isOpenRef = useRef(false);

  // 将原生 .modal 元素移入/移出 React mask
  useEffect(function () {
    var maskId = activeModal ? MODAL_ID_MAP[activeModal] : null;
    var mask = maskRef.current;
    if (!mask) return;

    // ---- 关闭逻辑 ----
    if (!maskId && isOpenRef.current) {
      isOpenRef.current = false;
      var prevMaskEl = prevMaskIdRef.current ? document.getElementById(prevMaskIdRef.current) : null;
      var panel = panelRef.current;

      if (window.gsap && panel) {
        window.gsap.killTweensOf(panel);
        window.gsap.to(panel, {
          autoAlpha: 0, y: 18, scale: 0.976, filter: 'blur(8px)',
          duration: 0.28, ease: 'power2.in', overwrite: true,
        });
        window.gsap.killTweensOf(mask);
        window.gsap.to(mask, {
          autoAlpha: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true,
          onComplete: function () {
            // 还回原容器
            if (prevMaskEl && panel && panel.parentNode !== prevMaskEl) {
              prevMaskEl.appendChild(panel);
              // 清理 GSAP 留下的 inline 样式
              window.gsap.set(panel, { clearProps: 'opacity,visibility,transform,filter' });
            }
            mask.style.display = 'none';
          },
        });
      } else {
        if (prevMaskEl && panel && panel.parentNode !== prevMaskEl) {
          prevMaskEl.appendChild(panel);
        }
        mask.style.display = 'none';
      }
      panelRef.current = null;
      prevMaskIdRef.current = null;
      return;
    }

    // 不在映射表中的弹窗，不处理
    if (!maskId) return;

    // ---- 打开逻辑 ----
    var nativeMask = document.getElementById(maskId);
    if (!nativeMask) return;
    var nativePanel = nativeMask.querySelector('.modal');
    if (!nativePanel) return;

    // 隐藏原生 mask（React 自己渲染 mask）
    nativeMask.style.display = 'none';
    nativeMask.classList.remove('show');

    // 记录状态
    prevMaskIdRef.current = maskId;
    panelRef.current = nativePanel;
    isOpenRef.current = true;

    // 把原生 .modal 元素放到 React mask 内
    mask.appendChild(nativePanel);

    // GSAP 入场动画
    if (window.gsap) {
      window.gsap.killTweensOf(mask);
      window.gsap.killTweensOf(nativePanel);
      window.gsap.set(mask, { display: 'flex', visibility: 'visible' });
      window.gsap.fromTo(mask,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.38, ease: 'power2.out', overwrite: true }
      );
      window.gsap.fromTo(nativePanel,
        { autoAlpha: 0, y: 26, scale: 0.965, filter: 'blur(12px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.68, ease: 'expo.out', overwrite: true }
      );
    } else {
      mask.style.display = 'flex';
      mask.style.visibility = 'visible';
      mask.style.opacity = '1';
      nativePanel.style.opacity = '1';
      nativePanel.style.visibility = 'visible';
    }
  }, [activeModal]);

  // ESC 关闭由原生 JS 的 keydown handler 统一处理（login.js），
  // 原生 handler 会检查 uiStore 状态并调用对应的 close 函数。

  // 背景点击关闭
  var onMaskClick = useCallback(function (e) {
    if (e.target === maskRef.current) closeModal();
  }, []);

  // mask 始终渲染（不条件卸载），用 display:none 隐藏
  return React.createElement('div', {
    className: 'modal-mask',
    ref: maskRef,
    onClick: onMaskClick,
    style: { zIndex: 55, display: 'none' },
  });
}

export { closeModal };
