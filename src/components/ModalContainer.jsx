// StarTune React Modal 容器
// 监听 uiStore.activeModal，渲染对应弹窗组件
// 提供 GSAP 动画 + 背景点击关闭 + ESC 关闭

import React, { useEffect, useRef, useCallback } from 'react';
import { useUiStore } from '../store/hooks.js';

// 关闭当前弹窗的统一方法
function closeModal() {
  var store = window.__uiStore;
  if (store) store.setState({ activeModal: null, modalProps: null });
}

export function ModalContainer() {
  var activeModal = useUiStore(function (s) { return s.activeModal; });
  var modalProps = useUiStore(function (s) { return s.modalProps; });
  var maskRef = useRef(null);
  var panelRef = useRef(null);
  var prevModalRef = useRef(null);

  // GSAP 入场动画
  useEffect(function () {
    if (!activeModal) {
      // 出场动画
      if (prevModalRef.current && maskRef.current) {
        var mask = maskRef.current;
        var panel = panelRef.current;
        if (window.gsap) {
          if (panel) {
            window.gsap.killTweensOf(panel);
            window.gsap.to(panel, {
              autoAlpha: 0, y: 18, scale: 0.976, filter: 'blur(8px)',
              duration: 0.28, ease: 'power2.in', overwrite: true,
            });
          }
          window.gsap.killTweensOf(mask);
          window.gsap.to(mask, {
            autoAlpha: 0, duration: 0.34, ease: 'power2.inOut', overwrite: true,
          });
        }
      }
      prevModalRef.current = null;
      return;
    }
    prevModalRef.current = activeModal;
    // 入场动画
    requestAnimationFrame(function () {
      var mask = maskRef.current;
      var panel = panelRef.current;
      if (!mask) return;
      if (window.gsap) {
        window.gsap.killTweensOf(mask);
        if (panel) window.gsap.killTweensOf(panel);
        window.gsap.set(mask, { display: 'flex', visibility: 'visible' });
        window.gsap.fromTo(mask,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.38, ease: 'power2.out', overwrite: true }
        );
        if (panel) {
          window.gsap.fromTo(panel,
            { autoAlpha: 0, y: 26, scale: 0.965, filter: 'blur(12px)' },
            { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.68, ease: 'expo.out', overwrite: true }
          );
        }
      }
    });
  }, [activeModal]);

  // ESC 关闭
  useEffect(function () {
    if (!activeModal) return;
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKey);
    return function () { document.removeEventListener('keydown', onKey); };
  }, [activeModal]);

  // 背景点击关闭
  var onMaskClick = useCallback(function (e) {
    if (e.target === maskRef.current) closeModal();
  }, []);

  if (!activeModal) return null;

  // 未来在这里按 activeModal 值渲染不同的 React 弹窗组件
  // Phase 1 暂时返回空占位（具体弹窗后续 Phase 迁入）
  var content = null;

  // 只有注册为 React 弹窗的 modal 才在这里渲染
  // 当前 Phase 没有注册任何弹窗，所以返回 null
  if (!content) return null;

  return React.createElement('div', {
    className: 'modal-mask show',
    ref: maskRef,
    onClick: onMaskClick,
    style: { zIndex: 55 },
  },
    React.createElement('div', {
      className: 'modal',
      ref: panelRef,
    }, content)
  );
}

export { closeModal };
