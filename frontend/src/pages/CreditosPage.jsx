import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { crearCredito, fetchCreditosPorCliente, selectCreditos, clearMessages, clearList } from '../store/slices/creditosSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Table, Badge, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

const emptyForm = { dniCliente: '', deudaOriginal: '', fecha: '', importeCuota: '', cantidadCuotas: '' }

export default function CreditosPage() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { list, loading, error, success } = useSelector(selectCreditos)
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

  const columns = [
    { key: 'id', label: 'ID', render: (v) => `#${v}` },
    { key: 'dniCliente', label: 'DNI cliente' },
    { key: 'nombreCliente', label: 'Nombre' },
    { key: 'deudaOriginal', label: 'Deuda', render: (v) => `$${Number(v).toLocaleString('es-AR')}` },
    { key: 'importeCuota', label: 'Cuota', render: (v) => `$${Number(v).toLocaleString('es-AR')}` },
    { key: 'cantidadCuotas', label: 'Cuotas' },
    { key: 'fecha', label: 'Fecha' },
    {
      key: 'cuotas',
      label: 'Estado',
      render: (cuotas) => {
        if (!cuotas?.length) return <Badge variant="default">Sin cuotas</Badge>
        const pagadas = cuotas.filter((c) => c.pagada).length
        const total = cuotas.length
        const variant = pagadas === total ? 'success' : pagadas === 0 ? 'warning' : 'info'
        return <Badge variant={variant}>{pagadas}/{total} pagadas</Badge>
      },
    },
  ]

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
        {loading ? <Spinner /> : <Table columns={columns} data={list} emptyText="Buscá un cliente para ver sus créditos" />}
      </Card>
    </div>
  )
}
