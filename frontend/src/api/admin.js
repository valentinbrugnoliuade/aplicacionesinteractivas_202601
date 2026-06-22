import { api } from '../services/api'

export const adminApi = {
  listarUsuarios: () => api.get('/admin/usuarios'),
  actualizarPermisos: (id, permisos) => api.put(`/admin/usuarios/${id}/permisos`, permisos),
}
