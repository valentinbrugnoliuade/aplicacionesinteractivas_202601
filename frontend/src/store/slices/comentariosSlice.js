import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { comentariosService } from '../../services/comentariosService'

export const fetchComentarios = createAsyncThunk('comentarios/fetchAll', async (_, { rejectWithValue }) => {
  try { return await comentariosService.listarTodos() }
  catch (err) { return rejectWithValue(err.message) }
})

export const crearComentario = createAsyncThunk('comentarios/crear', async (data, { rejectWithValue }) => {
  try { return await comentariosService.crear(data) }
  catch (err) { return rejectWithValue(err.message) }
})

export const actualizarComentario = createAsyncThunk('comentarios/actualizar', async ({ id, data }, { rejectWithValue }) => {
  try { return await comentariosService.actualizar(id, data) }
  catch (err) { return rejectWithValue(err.message) }
})

export const eliminarComentario = createAsyncThunk('comentarios/eliminar', async (id, { rejectWithValue }) => {
  try { await comentariosService.eliminar(id); return id }
  catch (err) { return rejectWithValue(err.message) }
})

const comentariosSlice = createSlice({
  name: 'comentarios',
  initialState: { list: [], loading: false, error: null, success: null },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComentarios.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchComentarios.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchComentarios.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(crearComentario.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(crearComentario.fulfilled, (s, a) => {
        s.loading = false
        s.list = [a.payload, ...s.list]
        s.success = 'Comentario registrado correctamente'
      })
      .addCase(crearComentario.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(actualizarComentario.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(actualizarComentario.fulfilled, (s, a) => {
        s.loading = false
        s.list = s.list.map((c) => (c.id === a.payload.id ? a.payload : c))
        s.success = 'Comentario actualizado correctamente'
      })
      .addCase(actualizarComentario.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(eliminarComentario.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(eliminarComentario.fulfilled, (s, a) => {
        s.loading = false
        s.list = s.list.filter((c) => c.id !== a.payload)
        s.success = 'Comentario eliminado correctamente'
      })
      .addCase(eliminarComentario.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  },
})

export const { clearMessages } = comentariosSlice.actions
export const selectComentarios = (state) => state.comentarios
export default comentariosSlice.reducer
