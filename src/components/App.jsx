// StarTune React 根组件
// Phase 1: Toast + ModalContainer

import React from 'react';
import { Toast } from './Toast.jsx';
import { ModalContainer } from './ModalContainer.jsx';

export function App() {
  return React.createElement(React.Fragment, null,
    React.createElement(Toast),
    React.createElement(ModalContainer)
  );
}
