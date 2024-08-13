import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import './App/layout/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
