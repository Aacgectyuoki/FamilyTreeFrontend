import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'; // Import the i18n instance
import { I18nextProvider } from 'react-i18next'; // Import the provider
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>  {/* Wrap your app in I18nextProvider */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </I18nextProvider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
