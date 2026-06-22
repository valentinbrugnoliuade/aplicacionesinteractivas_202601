import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { crearCredito, fetchCreditosPorCliente, anularCredito, selectCreditos, clearMessages, clearList } from '../store/slices/creditosSlice'
import { selectAuth } from '../store/slices/authSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

const emptyForm = { dniCliente: '', deudaOriginal: '', fecha: '', importeCuota: '', cantidadCuotas: '' }

export default function CreditosPage() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { list, loading, error, success } = useSelector(selectCreditos)
  const { puedeAnularCredito } = useSelector(selectAuth)
  const [form, setForm] = useState({ ...emptyForm, dniCliente: searchParams.get('dni') || '' })
  const [formError, setFormError] = useState({})
  const [buscarDni, setBuscarDni] = useState(searchParams.get('dni') || '')

  useEffect(() => {
    if (buscarDni.trim()) dispatch(fetchCreditosPorCliente(buscarDni.trim()))
    else dispatch(clearList())
    return () => dispatch(clearMessages())
  }, [dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFormError((fe) => ({ ...fe, [e.target.name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.dniCliente.trim()) errors.dniCliente = 'Requerido'
    if (!form.deudaOriginal || Number(form.deudaOriginal) <= 0) errors.deudaOriginal = 'Debe ser mayor a 0'
    if (!form.fecha) errors.fecha = 'Requerido'
    if (!form.importeCuota || Number(form.importeCuota) <= 0) errors.importeCuota = 'Debe ser mayor a 0'
    if (!form.cantidadCuotas || Number(form.cantidadCuotas) < 1) errors.cantidadCuotas = 'Mínimo 1'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) { setFormError(errors); return }
    dispatch(crearCredito({
      ...form,
      deudaOriginal: Number(form.deudaOriginal),
      importeCuota: Number(form.importeCuota),
      cantidadCuotas: Number(form.cantidadCuotas),
    })).then((res) => {
      if (!res.error) setForm(emptyForm)
    })
  }

  const handleBuscar = (e) => {
    e.preventDefault()
    if (buscarDni.trim()) dispatch(fetchCreditosPorCliente(buscarDni.trim()))
    else dispatch(clearList())
  }

  const handleAnular = (id) => {
    if (window.confirm(`¿Estás seguro de que querés anular el crédito #${id}?`)) {
      dispatch(anularCredito(id))
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Créditos" subtitle="Alta y consulta de créditos" />

      {error && <Alert type="error" onClose={() => dispatch(clearMessages())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearMessages())}>{success}</Alert>}

      <Card>
        <CardHeader title="Nuevo crédito" />
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup label="DNI del cliente" error={formError.dniCliente}>
              <input name="dniCliente" value={form.dniCliente} onChange={handleChange} placeholder="20123456" />
            </FormGroup>
            <FormGroup label="Fecha" error={formError.fecha}>
              <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup label="Deuda original ($)" error={formError.deudaOriginal}>
              <input name="deudaOriginal" type="number" value={form.deudaOriginal} onChange={handleChange} placeholder="100000" min="0.01" step="0.01" />
            </FormGroup>
            <FormGroup label="Importe de cuota ($)" error={formError.importeCuota}>
              <input name="importeCuota" type="number" value={form.importeCuota} onChange={handleChange} placeholder="10000" min="0.01" step="0.01" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup label="Cantidad de cuotas" error={formError.cantidadCuotas}>
              <input name="cantidadCuotas" type="number" value={form.cantidadCuotas} onChange={handleChange} placeholder="12" min="1" />
            </FormGroup>
            <div />
          </FormRow>
          <Btn variant="primary" type="submit" loading={loading}>Crear crédito</Btn>
        </form>
      </Card>

      <Card>
        <CardHeader title="Consultar por cliente" />
        <form onSubmit={handleBuscar} className={styles.searchRow}>
          <input
            value={buscarDni}
            onChange={(e) => setBuscarDni(e.target.value)}
            placeholder="Ingresá el DNI del cliente"
          />
          <Btn type="submit">Buscar</Btn>
        </form>
        {loading ? <Spinner /> : (
          list.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '24px' }}>Buscá un cliente para ver sus créditos</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tbl.table}>
                <thead>
                  <tr>
                    <th style={tbl.th}>ID</th>
                    <th style={tbl.th}>DNI</th>
                    <th style={tbl.th}>Nombre</th>
                    <th style={tbl.th}>Deuda</th>
                    <th style={tbl.th}>Cuota</th>
                    <th style={tbl.th}>Cuotas</th>
                    <th style={tbl.th}>Fecha</th>
                    <th style={tbl.th}>Estado</th>
                    {puedeAnularCredito && <th style={tbl.th}>Acción</th>}
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id} style={c.anulado ? tbl.rowAnulado : tbl.row}>
                      <td style={tbl.td}>#{c.id}</td>
                      <td style={tbl.td}>{c.dniCliente}</td>
                      <td style={tbl.td}>{c.nombreCliente}</td>
                      <td style={tbl.td}>${Number(c.deudaOriginal).toLocaleString('es-AR')}</td>
                      <td style={tbl.td}>${Number(c.importeCuota).toLocaleString('es-AR')}</td>
                      <td style={tbl.td}>{c.cantidadCuotas}</td>
                      <td style={tbl.td}>{c.fecha}</td>
                      <td style={tbl.td}>
                        {c.anulado ? (
                          <span style={tbl.badgeAnulado}>ANULADO</span>
                        ) : (
                          <span style={tbl.badgeOk}>
                            {c.cuotas ? `${c.cuotas.filter(x => x.pagada).length}/${c.cuotas.length} pagadas` : 'Sin cuotas'}
                          </span>
                        )}
                      </td>
                      {puedeAnularCredito && (
                        <td style={tbl.td}>
                          {!c.anulado && (
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
