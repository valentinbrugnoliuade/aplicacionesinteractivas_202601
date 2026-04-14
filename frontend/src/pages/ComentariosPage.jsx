import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchComentarios,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
  selectComentarios,
  clearMessages,
} from '../store/slices/comentariosSlice'
import { PageHeader, Card, CardHeader, Alert, Btn, FormGroup, FormRow, Table, Spinner } from '../components/ui/UI'
import styles from './Pages.module.css'

const TIPOS = ['CLIENTE', 'CREDITO', 'COBRANZA']

const EMPTY_FORM = { contenido: '', tipoEntidad: 'CLIENTE', dniCliente: '', idCredito: '', idCobranza: '' }

export default function ComentariosPage() {
  const dispatch = useDispatch()
  const { list, loading, error, success } = useSelector(selectComentarios)

  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState({})
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    dispatch(fetchComentarios())
    return () => dispatch(clearMessages())
  }, [dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFormError((fe) => ({ ...fe, [e.target.name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.contenido.trim()) errors.contenido = 'El contenido es obligatorio'
    if (!form.tipoEntidad) errors.tipoEntidad = 'El tipo de entidad es obligatorio'
    if (form.tipoEntidad === 'CLIENTE' && !form.dniCliente.trim()) {
      errors.dniCliente = 'El DNI del cliente es obligatorio para este tipo'
    }
    if (form.tipoEntidad === 'CREDITO' && !form.idCredito) {
      errors.idCredito = 'El ID del crédito es obligatorio para este tipo'
    }
    if (form.tipoEntidad === 'COBRANZA' && !form.idCobranza) {
      errors.idCobranza = 'El ID de cobranza es obligatorio para este tipo'
    }
    return errors
  }

  const buildPayload = () => {
    const payload = { contenido: form.contenido.trim(), tipoEntidad: form.tipoEntidad }
    if (form.tipoEntidad === 'CLIENTE') payload.dniCliente = form.dniCliente.trim()
    if (form.tipoEntidad === 'CREDITO') payload.idCredito = Number(form.idCredito)
    if (form.tipoEntidad === 'COBRANZA') payload.idCobranza = Number(form.idCobranza)
    return payload
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) { setFormError(errors); return }
    const payload = buildPayload()
    if (editingId) {
      dispatch(actualizarComentario({ id: editingId, data: payload })).then((res) => {
        if (!res.error) { setForm(EMPTY_FORM); setEditingId(null) }
      })
    } else {
      dispatch(crearComentario(payload)).then((res) => {
        if (!res.error) setForm(EMPTY_FORM)
      })
    }
  }

  const handleEdit = (comentario) => {
    setEditingId(comentario.id)
    setForm({
      contenido: comentario.contenido,
      tipoEntidad: comentario.tipoEntidad,
      dniCliente: comentario.dniCliente || '',
      idCredito: comentario.idCredito ? String(comentario.idCredito) : '',
      idCobranza: comentario.idCobranza ? String(comentario.idCobranza) : '',
    })
    setFormError({})
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError({})
  }

  const handleDelete = (id) => {
    dispatch(eliminarComentario(id))
  }

  const columns = [
    { key: 'id', label: '#' },
    { key: 'tipoEntidad', label: 'Tipo' },
    { key: 'contenido', label: 'Comentario' },
    { key: 'nombreUsuario', label: 'Usuario' },
    {
      key: 'entidad',
      label: 'Entidad',
      render: (_, row) =>
        row.dniCliente ? `Cliente: ${row.dniCliente}` :
        row.idCredito ? `Crédito: ${row.idCredito}` :
        row.idCobranza ? `Cobranza: ${row.idCobranza}` : '-',
    },
    {
      key: 'fechaCreacion',
      label: 'Fecha',
      render: (val) => val ? new Date(val).toLocaleString('es-AR') : '-',
    },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (_, row) => (
        <div className={styles.actions}>
          <Btn variant="secondary" onClick={() => handleEdit(row)}>Editar</Btn>
          <Btn variant="danger" onClick={() => handleDelete(row.id)}>Eliminar</Btn>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <PageHeader title="Comentarios" subtitle="Gestión de comentarios por entidad" />

      {error && <Alert type="error" onClose={() => dispatch(clearMessages())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearMessages())}>{success}</Alert>}

      <Card>
        <CardHeader title={editingId ? `Editar comentario #${editingId}` : 'Nuevo comentario'} />
        <form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup label="Tipo de entidad" error={formError.tipoEntidad}>
              <select name="tipoEntidad" value={form.tipoEntidad} onChange={handleChange}>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormGroup>

            {form.tipoEntidad === 'CLIENTE' && (
              <FormGroup label="DNI del cliente" error={formError.dniCliente}>
                <input name="dniCliente" value={form.dniCliente} onChange={handleChange} placeholder="20123456" />
              </FormGroup>
            )}
            {form.tipoEntidad === 'CREDITO' && (
              <FormGroup label="ID del crédito" error={formError.idCredito}>
                <input name="idCredito" type="number" value={form.idCredito} onChange={handleChange} placeholder="1" />
              </FormGroup>
            )}
            {form.tipoEntidad === 'COBRANZA' && (
              <FormGroup label="ID de cobranza" error={formError.idCobranza}>
                <input name="idCobranza" type="number" value={form.idCobranza} onChange={handleChange} placeholder="1" />
              </FormGroup>
            )}
          </FormRow>

          <FormGroup label="Contenido" error={formError.contenido}>
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              placeholder="Escriba el comentario aquí..."
              rows={3}
            />
          </FormGroup>

          <div className={styles.formActions}>
            <Btn variant="primary" type="submit" loading={loading}>
              {editingId ? 'Guardar cambios' : 'Registrar comentario'}
            </Btn>
            {editingId && (
              <Btn variant="secondary" type="button" onClick={handleCancelEdit}>Cancelar</Btn>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <CardHeader title={`Comentarios registrados (${list.length})`} />
        {loading && list.length === 0
          ? <Spinner />
          : <Table columns={columns} data={list} emptyText="No hay comentarios registrados" />
        }
      </Card>
    </div>
  )
}
