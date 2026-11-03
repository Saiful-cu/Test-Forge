import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { CreateProject } from './pages/CreateProject'
import { ProjectDetail } from './pages/ProjectDetail'
import { FeatureLibrary } from './pages/FeatureLibrary'
import { FeatureDetail } from './pages/FeatureDetail'
import { TestCaseLibrary } from './pages/TestCaseLibrary'
import { Reports } from './pages/Reports'
import { AdminLogin } from './pages/AdminLogin'
import { UsersPage } from './pages/UsersPage'
import { HistoryPage } from './pages/HistoryPage'
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
        <Route path="/users" element={<AdminOnly><UsersPage /></AdminOnly>} />
        <Route path="/history" element={<AdminOnly><HistoryPage /></AdminOnly>} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/features" element={<FeatureLibrary />} />
        <Route path="/features/:featureId" element={<FeatureDetail />} />
        <Route path="/test-cases" element={<TestCaseLibrary />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:projectId" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
