import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearCliente, fetchClientes, selectClientes, clearMessages } from '../store/slices/clientesSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Table, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

export default function ClientesPage() {
  const dispatch = useDispatch()
  const { list, loading, error, success } = useSelector(selectClientes)
  const [form, setForm] = useState({ dni: '', nombre: '' })
  const [formError, setFormError] = useState({})

  useEffect(() => {
    dispatch(fetchClientes())
    return () => dispatch(clearMessages())
  }, [dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFormError((fe) => ({ ...fe, [e.target.name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.dni.trim()) errors.dni = 'El DNI es obligatorio'
    if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) { setFormError(errors); return }
    dispatch(crearCliente(form)).then((res) => {
      if (!res.error) setForm({ dni: '', nombre: '' })
    })
  }

  const columns = [
    { key: 'dni', label: 'DNI' },
    { key: 'nombre', label: 'Nombre' },
  ]

  return (
    <div className={styles.page}>
      <PageHeader title="Clientes" subtitle="Alta y listado de clientes" />

      {error && <Alert type="error" onClose={() => dispatch(clearMessages())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearMessages())}>{success}</Alert>}

      <Card>
        <CardHeader title="Nuevo cliente" />
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup label="DNI" error={formError.dni}>
              <input name="dni" value={form.dni} onChange={handleChange} placeholder="20123456" />
            </FormGroup>
            <FormGroup label="Nombre completo" error={formError.nombre}>
              <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan García" />
            </FormGroup>
          </FormRow>
          <Btn variant="primary" type="submit" loading={loading}>Registrar cliente</Btn>
        </form>
      </Card>

      <Card>
        <CardHeader title={`Clientes registrados (${list.length})`} />
        {loading && list.length === 0 ? <Spinner /> : <Table columns={columns} data={list} emptyText="No hay clientes registrados" />}
      </Card>
    </div>
  )
}
