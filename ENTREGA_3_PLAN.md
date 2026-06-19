# Entrega 3 - Plan de trabajo

Objetivo: cerrar una entrega sólida, prolija y fácil de presentar, partiendo de lo que ya está armado en el backend y el frontend.

## Estado actual

El proyecto ya tiene:

- autenticación con JWT
- CRUD de clientes, créditos y cobranzas
- módulo de comentarios funcionando en backend y frontend
- documentación base en README y colección de Postman

Lo que todavía falta para una entrega redonda es ordenar el alcance, validar los flujos y dejar una presentación clara para el equipo.

## Avance realizado

- el backend de comentarios ahora falla de forma controlada cuando `tipoEntidad` viene nulo
- el frontend de API muestra el primer mensaje útil devuelto por el backend
- se agregó una prueba unitaria focalizada para `ComentarioServiceImpl`
- la revisión estática de los archivos tocados no mostró errores

## Tarea 1 - Base funcional completa

Meta: dejar comprobado que el flujo principal funciona de punta a punta sin errores.

Estado: cerrada en lo esencial para esta entrega.

### Qué revisar

- registro de usuario y login
- creación y consulta de clientes
- creación y consulta de créditos asociados a un cliente
- registro y consulta de cobranzas asociadas a un crédito
- creación, edición, listado y borrado de comentarios
- navegación entre pantallas protegidas en frontend

### Checklist de validación

- [ ] poder crear un usuario y obtener token JWT
- [ ] poder entrar a la app con un usuario válido
- [ ] poder crear un cliente desde frontend o backend
- [ ] poder crear un crédito para ese cliente
- [ ] poder registrar una cobranza para una cuota existente
- [ ] poder crear un comentario para cliente, crédito y cobranza
- [ ] poder ver errores entendibles cuando falta un dato o el recurso no existe
- [ ] poder recorrer la app sin romper rutas ni pantallas

### Criterio de terminado

La tarea 1 está terminada cuando una persona externa puede seguir el flujo completo sin tocar código, solo usando la interfaz o la colección HTTP.

### Qué quedó resuelto

- comentarios integrados en backend y frontend
- mensajes de error del backend visibles en la UI
- ruta protegida y navegación principal ya conectadas

## Tareas para el resto del equipo

### Tarea 2 - Endurecer backend

Responsable ideal: quien tenga más mano con Spring.

Estado: cerrada en el caso de comentarios, con prueba unitaria agregada.

Qué hacer:

- revisar validaciones de request
- confirmar respuestas de error consistentes
- revisar relaciones y nulls en comentarios
- probar casos borde en clientes, créditos y cobranzas

### Qué quedó resuelto

- validación null-safe para `tipoEntidad` en comentarios
- respuesta de negocio consistente en lugar de un 500 inesperado
- prueba unitaria para el caso feliz y el borde principal

### Tarea 3 - Pulir frontend

Responsable ideal: quien esté más fuerte en React.

Qué hacer:

- mejorar formularios y mensajes
- ordenar estados de carga, vacío y error
- dejar comentarios integrados con el resto de la app
- revisar responsive básico

### Tarea 4 - Pruebas y verificación

Responsable ideal: quien pueda coordinar QA manual o automática.

Qué hacer:

- usar `backend-tests.http` como recorrido principal
- agregar o completar tests automáticos si hay tiempo
- correr build del frontend
- correr tests del backend

### Tarea 5 - Documentación de entrega

Responsable ideal: quien escriba claro y ordenado.

Qué hacer:

- actualizar README
- explicar cómo correr el proyecto
- sumar credenciales de prueba
- resumir endpoints y casos de uso
- dejar claro qué aporta cada módulo

### Tarea 6 - Demo final

Responsable ideal: todo el equipo, con una persona que presente.

Qué hacer:

- preparar un recorrido corto de 3 a 5 minutos
- usar datos de ejemplo ya cargados
- probar login, alta y comentario en vivo
- tener una explicación breve de decisiones técnicas

## Orden recomendado

1. terminar y validar la tarea 1
2. corregir problemas de backend
3. pulir frontend
4. verificar con pruebas
5. cerrar documentación
6. ensayar demo

## Nota para el equipo

Si algo falla en la tarea 1, no conviene avanzar con el resto hasta dejar estable el flujo principal. La prioridad es que la entrega funcione completa antes de decorarla.