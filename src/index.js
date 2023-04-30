import React from 'react';
import ReactDOM from 'react-dom/client'; //бібліотека, яка надає методи для рендерингу компонентів в DOM
import App from './components/App';
import 'modern-normalize/modern-normalize.css';
import './index.css'; //підключення стилів

// рендеринг компоненту App в DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode - компонент, який використовується для виявлення проблем в додатку
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
