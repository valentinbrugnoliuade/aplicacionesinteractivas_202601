import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './store/slices/authSlice'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClientesPage from './pages/ClientesPage'
import CreditosPage from './pages/CreditosPage'
import CobranzasPage from './pages/CobranzasPage'
import ComentariosPage from './pages/ComentariosPage'
import GestorPermisos from './pages/GestorPermisos'
import PrivateRoute from './components/PrivateRoute'

function AuthRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="creditos" element={<CreditosPage />} />
          <Route path="cobranzas" element={<CobranzasPage />} />
          <Route path="comentarios" element={<ComentariosPage />} />
          <Route
            path="admin/permisos"
            element={
              <PrivateRoute requiredRol="ADMIN">
                <GestorPermisos />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
