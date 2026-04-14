import { api } from './api'

export const cobranzasService = {
  registrar: (data) => api.post('/cobranzas', data),
  listarPorCredito: (idCredito) => api.get(`/cobranzas/credito/${idCredito}`),
}
