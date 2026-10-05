import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import VaultPage from '../pages/VaultPage.jsx'
import { getAuthToken } from '../services/api.js'

function ProtectedVault() {
  return getAuthToken() ? <VaultPage /> : <Navigate replace to="/login" />
}

function EntryRedirect() {
  return <Navigate replace to={getAuthToken() ? '/vault' : '/login'} />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vault" element={<ProtectedVault />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<EntryRedirect />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes