import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './store/AuthContext'
import { StoreProvider } from './store/StoreContext'
import { MasterLibraryProvider } from './store/MasterLibraryContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      Clean paths (no #). Deep links and refreshes rely on the host serving
      index.html for unknown paths — see public/_redirects and netlify.toml.
    */}
    <BrowserRouter>
      <AuthProvider>
        <MasterLibraryProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </MasterLibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
