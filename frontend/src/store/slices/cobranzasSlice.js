import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { cobranzasService } from '../../services/cobranzasService'

export const fetchCobranzasPorCredito = createAsyncThunk('cobranzas/fetchByCredito', async (idCredito, { rejectWithValue }) => {
  try { return await cobranzasService.listarPorCredito(idCredito) }
  catch (err) { return rejectWithValue(err.message) }
})

export const registrarCobranza = createAsyncThunk('cobranzas/registrar', async (data, { rejectWithValue }) => {
  try { return await cobranzasService.registrar(data) }
  catch (err) { return rejectWithValue(err.message) }
})

const cobranzasSlice = createSlice({
  name: 'cobranzas',
  initialState: { list: [], loading: false, error: null, success: null },
  reducers: {
    clearMessages(state) { state.error = null; state.success = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCobranzasPorCredito.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCobranzasPorCredito.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchCobranzasPorCredito.rejected, (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(registrarCobranza.pending, (s) => { s.loading = true; s.error = null; s.success = null })
      .addCase(registrarCobranza.fulfilled, (s, a) => {
        s.loading = false
        s.list.push(a.payload)
        s.success = `Cobranza registrada: $${a.payload.importe}`
      })
      .addCase(registrarCobranza.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  },
})

export const { clearMessages } = cobranzasSlice.actions
export const selectCobranzas = (state) => state.cobranzas
export default cobranzasSlice.reducer
