import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './store/AuthContext'
import { StoreProvider } from './store/StoreContext'
import { MasterLibraryProvider } from './store/MasterLibraryContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      Hash routing keeps every route inside index.html, so a refresh or a shared
      deep link resolves without a server-side rewrite rule. That makes the build
      portable across static hosts; swap in BrowserRouter if clean paths are
      wanted and the host is configured to fall back to index.html.
    */}
    <HashRouter>
      <AuthProvider>
        <MasterLibraryProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </MasterLibraryProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
