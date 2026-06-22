import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsuarios, actualizarPermisos, selectPermisos, clearMessages } from '../store/slices/permisosSlice'
import { PageHeader, Card, Alert, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

export default function GestorPermisos() {
  const dispatch = useDispatch()
  const { usuarios, loading, error, success } = useSelector(selectPermisos)

  useEffect(() => {
    dispatch(fetchUsuarios())
    return () => dispatch(clearMessages())
  }, [dispatch])

  const handleToggle = (usuario, campo) => {
    const permisos = {
      puedeAnularCredito: usuario.puedeAnularCredito,
      puedeAnularCobranza: usuario.puedeAnularCobranza,
      [campo]: !usuario[campo],
    }
    dispatch(actualizarPermisos({ id: usuario.id, permisos }))
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Gestor de Permisos" subtitle="Solo visible para administradores" />

      {error && <Alert type="error" onClose={() => dispatch(clearMessages())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearMessages())}>{success}</Alert>}

      <Card>
        {loading ? (
          <Spinner />
        ) : usuarios.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '24px' }}>No hay usuarios con rol USER registrados.</p>
        ) : (
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.th}>Usuario</th>
                <th style={tableStyles.th}>Rol</th>
                <th style={tableStyles.th}>Puede anular crédito</th>
                <th style={tableStyles.th}>Puede anular cobranza</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} style={tableStyles.tr}>
                  <td style={tableStyles.td}>{u.username}</td>
                  <td style={tableStyles.td}><span style={tableStyles.badge}>{u.rol}</span></td>
                  <td style={tableStyles.tdCenter}>
                    <input
                      type="checkbox"
                      checked={u.puedeAnularCredito}
                      onChange={() => handleToggle(u, 'puedeAnularCredito')}
                      style={tableStyles.checkbox}
                    />
                  </td>
                  <td style={tableStyles.tdCenter}>
                    <input
                      type="checkbox"
                      checked={u.puedeAnularCobranza}
                      onChange={() => handleToggle(u, 'puedeAnularCobranza')}
                      style={tableStyles.checkbox}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

const tableStyles = {
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 14px', borderBottom: '2px solid #e0e0e0', color: '#555', fontWeight: 600 },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '10px 14px', color: '#333' },
  tdCenter: { padding: '10px 14px', textAlign: 'center' },
  badge: { background: '#e3f2fd', color: '#1565c0', borderRadius: '4px', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 600 },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#1565c0' },
}
