import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import clientesReducer from './slices/clientesSlice'
import creditosReducer from './slices/creditosSlice'
import cobranzasReducer from './slices/cobranzasSlice'
import comentariosReducer from './slices/comentariosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientes: clientesReducer,
    creditos: creditosReducer,
    cobranzas: cobranzasReducer,
    comentarios: comentariosReducer,
  },
})
