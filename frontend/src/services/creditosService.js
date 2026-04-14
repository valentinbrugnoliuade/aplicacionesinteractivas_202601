import { api } from './api'

export const creditosService = {
  crear: (data) => api.post('/creditos', data),
  buscarPorId: (id) => api.get(`/creditos/${id}`),
  listarPorCliente: (dni) => api.get(`/creditos/cliente/${dni}`),
}
