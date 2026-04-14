import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registrarCobranza, fetchCobranzasPorCredito, selectCobranzas, clearMessages } from '../store/slices/cobranzasSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Table, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

const emptyForm = { idCredito: '', idCuota: '', importe: '' }

export default function CobranzasPage() {
  const dispatch = useDispatch()
  const { list, loading, error, success } = useSelector(selectCobranzas)
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

  const columns = [
    { key: 'id', label: 'ID', render: (v) => `#${v}` },
    { key: 'idCredito', label: 'Crédito', render: (v) => `#${v}` },
    { key: 'idCuota', label: 'Cuota N°' },
    { key: 'importe', label: 'Importe', render: (v) => `$${Number(v).toLocaleString('es-AR')}` },
  ]

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
        {loading ? <Spinner /> : <Table columns={columns} data={list} emptyText="Buscá un crédito para ver sus cobranzas" />}
      </Card>
    </div>
  )
}
