import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registrarCobranza, fetchCobranzasPorCredito, anularCobranza, selectCobranzas, clearMessages } from '../store/slices/cobranzasSlice'
import { selectAuth } from '../store/slices/authSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

const emptyForm = { idCredito: '', idCuota: '', importe: '' }

export default function CobranzasPage() {
  const dispatch = useDispatch()
  const { list, loading, error, success } = useSelector(selectCobranzas)
  const { puedeAnularCobranza } = useSelector(selectAuth)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState({})
  const [buscarId, setBuscarId] = useState('')

  useEffect(() => {
    return () => dispatch(clearMessages())
  }, [dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFormError((fe) => ({ ...fe, [e.target.name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.idCredito) errors.idCredito = 'Requerido'
    if (!form.idCuota) errors.idCuota = 'Requerido'
    if (!form.importe || Number(form.importe) <= 0) errors.importe = 'Debe ser mayor a 0'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) { setFormError(errors); return }
    dispatch(registrarCobranza({
      idCredito: Number(form.idCredito),
      idCuota: Number(form.idCuota),
      importe: Number(form.importe),
    })).then((res) => {
      if (!res.error) setForm(emptyForm)
    })
  }

  const handleBuscar = (e) => {
    e.preventDefault()
    if (buscarId.trim()) dispatch(fetchCobranzasPorCredito(buscarId.trim()))
  }

  const handleAnular = (id) => {
    if (window.confirm(`¿Estás seguro de que querés anular la cobranza #${id}?`)) {
      dispatch(anularCobranza(id))
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Cobranzas" subtitle="Registro de pagos de cuotas" />

      {error && <Alert type="error" onClose={() => dispatch(clearMessages())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearMessages())}>{success}</Alert>}

      <Card>
        <CardHeader title="Registrar cobranza" />
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup label="ID Crédito" error={formError.idCredito}>
              <input name="idCredito" type="number" value={form.idCredito} onChange={handleChange} placeholder="1" min="1" />
            </FormGroup>
            <FormGroup label="Número de cuota" error={formError.idCuota}>
              <input name="idCuota" type="number" value={form.idCuota} onChange={handleChange} placeholder="1" min="1" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup label="Importe cobrado ($)" error={formError.importe}>
              <input name="importe" type="number" value={form.importe} onChange={handleChange} placeholder="12500" min="0.01" step="0.01" />
            </FormGroup>
            <div />
          </FormRow>
          <Btn variant="primary" type="submit" loading={loading}>Registrar pago</Btn>
        </form>
      </Card>

      <Card>
        <CardHeader title="Historial por crédito" />
        <form onSubmit={handleBuscar} className={styles.searchRow}>
          <input
            value={buscarId}
            onChange={(e) => setBuscarId(e.target.value)}
            placeholder="Ingresá el ID del crédito"
            type="number"
            min="1"
          />
          <Btn type="submit">Buscar</Btn>
        </form>
        {loading ? <Spinner /> : (
          list.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '24px' }}>Buscá un crédito para ver sus cobranzas</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tbl.table}>
                <thead>
                  <tr>
                    <th style={tbl.th}>ID</th>
                    <th style={tbl.th}>Crédito</th>
                    <th style={tbl.th}>Cuota N°</th>
                    <th style={tbl.th}>Importe</th>
                    <th style={tbl.th}>Fecha</th>
                    <th style={tbl.th}>Estado</th>
                    {puedeAnularCobranza && <th style={tbl.th}>Acción</th>}
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id} style={c.anulada ? tbl.rowAnulado : tbl.row}>
                      <td style={tbl.td}>#{c.id}</td>
                      <td style={tbl.td}>#{c.idCredito}</td>
                      <td style={tbl.td}>{c.idCuota}</td>
                      <td style={tbl.td}>${Number(c.importe).toLocaleString('es-AR')}</td>
                      <td style={tbl.td}>{c.fechaCobranza}</td>
                      <td style={tbl.td}>
                        {c.anulada
                          ? <span style={tbl.badgeAnulado}>ANULADA</span>
                          : <span style={tbl.badgeOk}>Activa</span>
                        }
                      </td>
                      {puedeAnularCobranza && (
                        <td style={tbl.td}>
                          {!c.anulada && (
                            <button onClick={() => handleAnular(c.id)} style={tbl.btnAnular}>
                              Anular
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </Card>
    </div>
  )
}

const tbl = {
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e0e0e0', color: '#555', fontWeight: 600, fontSize: '0.9rem' },
  row: { borderBottom: '1px solid #f0f0f0' },
  rowAnulado: { borderBottom: '1px solid #f0f0f0', opacity: 0.5, textDecoration: 'line-through' },
  td: { padding: '10px 12px', color: '#333', fontSize: '0.9rem' },
  badgeOk: { background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', padding: '2px 8px', fontSize: '0.8rem' },
  badgeAnulado: { background: '#ffebee', color: '#c62828', borderRadius: '4px', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 700 },
  btnAnular: { background: '#e53935', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' },
}
