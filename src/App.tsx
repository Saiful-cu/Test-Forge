import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { CreateProject } from './pages/CreateProject'
import { ProjectDetail } from './pages/ProjectDetail'
import { TestCaseDetail } from './pages/TestCaseDetail'
import { FeatureLibrary } from './pages/FeatureLibrary'
import { FeatureDetail } from './pages/FeatureDetail'
import { Reports } from './pages/Reports'
import { AdminLogin } from './pages/AdminLogin'
import { UsersPage } from './pages/UsersPage'
import { HistoryPage } from './pages/HistoryPage'
import { AiSettingsPage } from './pages/AiSettingsPage'
import { SettingsPage } from './pages/SettingsPage'
import { useAuth } from './store/AuthContext'

function AdminOnly({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth()
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  const { user, checked } = useAuth()
  if (!checked) return <div className="min-h-screen bg-slate-50" aria-busy="true" />

  // The app is open to everyone; signing in at /admin only unlocks the admin features.
  return (
    <Routes>
      <Route path="/admin" element={user ? <Navigate to="/" replace /> : <AdminLogin />} />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <AdminLogin />} />
      <Route element={<Layout />}>
        <Route path="/settings" element={<AdminOnly><SettingsPage /></AdminOnly>}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="ai" element={<AiSettingsPage />} />
        </Route>
        {/* Old addresses from before the pages were combined under Settings. */}
        <Route path="/users" element={<Navigate to="/settings/users" replace />} />
        <Route path="/history" element={<Navigate to="/settings/history" replace />} />
        <Route path="/ai-settings" element={<Navigate to="/settings/ai" replace />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/projects/:projectId/test-cases/:testCaseId" element={<TestCaseDetail />} />
        <Route path="/features" element={<FeatureLibrary />} />
        <Route path="/features/:featureId" element={<FeatureDetail />} />
        {/* The test case library was folded into the feature library; keep old links working. */}
        <Route path="/test-cases" element={<Navigate to="/features" replace />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:projectId" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
