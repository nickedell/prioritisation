import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// This finds the <div id="root"> in your index.html...
const rootElement = document.getElementById('root')!;

// ...and tells React to render your <App /> component inside it.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);