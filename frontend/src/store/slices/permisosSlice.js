import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from '../../api/admin'

export const fetchUsuarios = createAsyncThunk('permisos/fetchUsuarios', async (_, { rejectWithValue }) => {
  try {
    return await adminApi.listarUsuarios()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const actualizarPermisos = createAsyncThunk('permisos/actualizar', async ({ id, permisos }, { rejectWithValue }) => {
  try {
    return await adminApi.actualizarPermisos(id, permisos)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const permisosSlice = createSlice({
  name: 'permisos',
  initialState: {
    usuarios: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarios.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchUsuarios.fulfilled, (s, a) => { s.loading = false; s.usuarios = a.payload })
      .addCase(fetchUsuarios.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(actualizarPermisos.pending, (s) => { s.error = null })
      .addCase(actualizarPermisos.fulfilled, (s, a) => {
        const idx = s.usuarios.findIndex(u => u.id === a.payload.id)
        if (idx !== -1) s.usuarios[idx] = a.payload
        s.success = `Permisos de ${a.payload.username} actualizados`
      })
      .addCase(actualizarPermisos.rejected, (s, a) => { s.error = a.payload })
  },
})

export const { clearMessages } = permisosSlice.actions
export const selectPermisos = (state) => state.permisos
export default permisosSlice.reducer
