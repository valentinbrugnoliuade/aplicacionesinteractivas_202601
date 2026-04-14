import { api } from './api'

export const comentariosService = {
  listarTodos: () => api.get('/comentarios'),
  buscarPorId: (id) => api.get(`/comentarios/${id}`),
  crear: (data) => api.post('/comentarios', data),
  actualizar: (id, data) => api.put(`/comentarios/${id}`, data),
  eliminar: (id) => api.delete(`/comentarios/${id}`),
  listarPorCliente: (dni) => api.get(`/comentarios/cliente/${dni}`),
  listarPorCredito: (idCredito) => api.get(`/comentarios/credito/${idCredito}`),
  listarPorCobranza: (idCobranza) => api.get(`/comentarios/cobranza/${idCobranza}`),
}
