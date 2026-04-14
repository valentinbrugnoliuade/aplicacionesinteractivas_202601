import { api } from './api'

export const clientesService = {
  crear: (data) => api.post('/clientes', data),
  buscarPorDni: (dni) => api.get(`/clientes/${dni}`),
  listarTodos: () => api.get('/clientes'),
}
