import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import MainLayout from './layouts/MainLayout'
import './App.scss'

// Lazy load các trang
const Login = React.lazy(() => import('./pages/Login'))
const TenantSelection = React.lazy(() => import('./pages/TenantSelection'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Tickets = React.lazy(() => import('./pages/Tickets'))
const TicketDetail = React.lazy(() => import('./pages/TicketDetail'))
const TicketForm = React.lazy(() => import('./pages/TicketForm'))
const Customers = React.lazy(() => import('./pages/Customers'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Settings = React.lazy(() => import('./pages/Settings'))
const KnowledgeBase = React.lazy(() => import('./pages/KnowledgeBase'))
const ArticleDetail = React.lazy(() => import('./pages/ArticleDetail'))

// Lazy load Settings pages
const Profile = React.lazy(() => import('./pages/settings/Profile'))
const Notifications = React.lazy(() => import('./pages/settings/Notifications'))
const EmailIntegration = React.lazy(() => import('./pages/settings/EmailIntegration'))
const ChatIntegration = React.lazy(() => import('./pages/settings/ChatIntegration'))
const Integrations = React.lazy(() => import('./pages/settings/Integrations'))
const Security = React.lazy(() => import('./pages/settings/Security'))
const DepartmentManagement = React.lazy(() => import('./pages/settings/DepartmentManagement'))
const WorkManagement = React.lazy(() => import('./pages/settings/WorkManagement'))

const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px' 
  }}>
    <Spin size="large" />
  </div>
)

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Tenant Selection (requires login but not tenant) */}
        <Route 
          path="/tenant-selection" 
          element={
            localStorage.getItem('user') ? (
              <TenantSelection />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/tickets/new" element={<TicketForm />} />
                  <Route path="/tickets/:id" element={<TicketDetail />} />
                  <Route path="/tickets/:id/edit" element={<TicketForm />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/knowledge-base" element={<KnowledgeBase />} />
                  <Route path="/knowledge-base/articles/:id" element={<ArticleDetail />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/profile" element={<Profile />} />
                  <Route path="/settings/notifications" element={<Notifications />} />
                  <Route path="/settings/email" element={<EmailIntegration />} />
                  <Route path="/settings/chat" element={<ChatIntegration />} />
                  <Route path="/settings/integrations" element={<Integrations />} />
                  <Route path="/settings/security" element={<Security />} />
                  <Route path="/settings/departments" element={<DepartmentManagement />} />
                  <Route path="/settings/work" element={<WorkManagement />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Suspense>
  )
}

export default App
