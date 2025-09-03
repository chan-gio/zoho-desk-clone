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
  const selectedTenant = localStorage.getItem('selectedTenant')
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (!selectedTenant) {
    return <Navigate to="/tenant-selection" replace />
  }
  
  return children
}

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  const selectedTenant = localStorage.getItem('selectedTenant')
  
  if (user && selectedTenant) {
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
                  <Route path="/settings" element={<Settings />} />
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
