import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import './App/layout/styles.css'
import { store, StoreContext } from './App/stores/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/router/route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>
)
