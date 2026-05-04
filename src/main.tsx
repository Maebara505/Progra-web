import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: Ignore missing type declarations for CSS imports
import './index.css'
import App from './App'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
