import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { App } from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const appRoot = createRoot(rootElement);

appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);