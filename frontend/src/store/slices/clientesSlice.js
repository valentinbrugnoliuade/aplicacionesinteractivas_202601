import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { clientesService } from '../../services/clientesService'

export const fetchClientes = createAsyncThunk('clientes/fetchAll', async (_, { rejectWithValue }) => {
  try { return await clientesService.listarTodos() }
  catch (err) { return rejectWithValue(err.message) }
})

export const fetchClientePorDni = createAsyncThunk('clientes/fetchByDni', async (dni, { rejectWithValue }) => {
  try { return await clientesService.buscarPorDni(dni) }
  catch (err) { return rejectWithValue(err.message) }
})

export const crearCliente = createAsyncThunk('clientes/crear', async (data, { rejectWithValue }) => {
  try { return await clientesService.crear(data) }
  catch (err) { return rejectWithValue(err.message) }
})

const clientesSlice = createSlice({
  name: 'clientes',
  initialState: { list: [], selected: null, loading: false, error: null, success: null },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientes.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchClientes.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchClientes.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(fetchClientePorDni.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchClientePorDni.fulfilled, (s, a) => { s.loading = false; s.selected = a.payload })
      .addCase(fetchClientePorDni.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(crearCliente.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(crearCliente.fulfilled, (s, a) => {
        s.loading = false
        s.list.push(a.payload)
        s.success = `Cliente ${a.payload.nombre} creado correctamente`
      })
      .addCase(crearCliente.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  },
})

export const { clearMessages } = clientesSlice.actions
export const selectClientes = (state) => state.clientes
export default clientesSlice.reducer
