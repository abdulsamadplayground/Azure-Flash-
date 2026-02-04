import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

console.log('🚀 Index.jsx: Starting application...');

const container = document.getElementById('app');
console.log('📦 Index.jsx: Container element found:', container);

if (container) {
  const root = createRoot(container);
  console.log('✅ Index.jsx: React root created');
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('✅ Index.jsx: App component rendered');
} else {
  console.error('❌ Index.jsx: Container element not found!');
}
