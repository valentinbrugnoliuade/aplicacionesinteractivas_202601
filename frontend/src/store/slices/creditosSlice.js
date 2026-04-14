import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { creditosService } from '../../services/creditosService'

export const fetchCreditosPorCliente = createAsyncThunk('creditos/fetchByCliente', async (dni, { rejectWithValue }) => {
  try { return await creditosService.listarPorCliente(dni) }
  catch (err) { return rejectWithValue(err.message) }
})

export const fetchCreditoPorId = createAsyncThunk('creditos/fetchById', async (id, { rejectWithValue }) => {
  try { return await creditosService.buscarPorId(id) }
  catch (err) { return rejectWithValue(err.message) }
})

export const crearCredito = createAsyncThunk('creditos/crear', async (data, { rejectWithValue }) => {
  try { return await creditosService.crear(data) }
  catch (err) { return rejectWithValue(err.message) }
})

const creditosSlice = createSlice({
  name: 'creditos',
  initialState: { list: [], selected: null, loading: false, error: null, success: null },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null },
    clearList(state) { state.list = [] },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditosPorCliente.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCreditosPorCliente.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchCreditosPorCliente.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(fetchCreditoPorId.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCreditoPorId.fulfilled, (s, a) => { s.loading = false; s.selected = a.payload })
      .addCase(fetchCreditoPorId.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(crearCredito.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(crearCredito.fulfilled, (s, a) => {
        s.loading = false
        s.list.push(a.payload)
        s.success = `Crédito #${a.payload.id} creado correctamente`
      })
      .addCase(crearCredito.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  },
})

export const { clearMessages, clearList } = creditosSlice.actions
export const selectCreditos = (state) => state.creditos
export default creditosSlice.reducer
