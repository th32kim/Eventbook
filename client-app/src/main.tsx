import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import './App/layout/styles.css'
import { store, StoreContext } from './App/stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  </StrictMode>,
)
