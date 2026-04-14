import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchClientes, selectClientes } from '../store/slices/clientesSlice'
import { PageHeader, Card, CardHeader, Badge, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list: clientes, loading } = useSelector(selectClientes)

  useEffect(() => {
    dispatch(fetchClientes())
  }, [dispatch])

  return (
    <div className={styles.page}>
      <PageHeader
        title="Dashboard"
        subtitle="Vista general del sistema"
      />

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Clientes registrados</span>
          <span className={styles.statValue}>{loading ? '…' : clientes.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Backend</span>
          <span className={styles.statValue} style={{ fontSize: 14, color: 'var(--success)' }}>
            localhost:8080
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Autenticación</span>
          <span className={styles.statValue} style={{ fontSize: 14 }}>JWT activo</span>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Clientes"
          right={
            <button className={styles.linkBtn} onClick={() => navigate('/clientes')}>
              Ver todos →
            </button>
          }
        />
        {loading ? (
          <Spinner />
        ) : clientes.length === 0 ? (
          <p className={styles.empty}>No hay clientes cargados aún.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr><th>DNI</th><th>Nombre</th><th></th></tr>
            </thead>
            <tbody>
              {clientes.slice(0, 6).map((c) => (
                <tr key={c.dni}>
                  <td>{c.dni}</td>
                  <td>{c.nombre}</td>
                  <td>
                    <button
                      className={styles.linkBtn}
                      onClick={() => navigate(`/creditos?dni=${c.dni}`)}
                    >
                      Ver créditos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card>
        <CardHeader title="Accesos rápidos" />
        <div className={styles.quickLinks}>
          {[
            { label: 'Nuevo cliente', to: '/clientes', badge: 'POST /clientes' },
            { label: 'Nuevo crédito', to: '/creditos', badge: 'POST /creditos' },
            { label: 'Registrar cobranza', to: '/cobranzas', badge: 'POST /cobranzas' },
          ].map(({ label, to, badge }) => (
            <button key={to} className={styles.quickCard} onClick={() => navigate(to)}>
              <span className={styles.quickLabel}>{label}</span>
              <Badge variant="default">{badge}</Badge>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
