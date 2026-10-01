# Code Review Semana 8
## Revisor: Diego Espinoza | Revisado: [Nombre de tu compañero]

### Aspectos Positivos
1. Excelente organización del servicio centralizado de Axios en `src/services/erpApi.js` utilizando `baseURL` y encabezados limpios.
2. Correcta implementación de las propiedades computadas (`computed`) para calcular ingresos, egresos y saldo, previniendo errores de `NaN` cuando el array está vacío.

### Sugerencias de Mejora
1. En la función `guardarMovimiento()`, se podría agregar una validación previa en el cliente antes de realizar la petición POST al servidor para ahorrar solicitudes innecesarias.
2. Considerar deshabilitar el botón de envío mientras `cargando.value` sea `true` para evitar doble clic o múltiples peticiones repetidas.

### Preguntas Técnicas
1. ¿Por qué decidiste inicializar el estado del error en `null` en lugar de una cadena vacía `""` dentro del `

### Validación de Funcionalidades
- [x] Carga de movimientos funciona
- [x] Creación de movimientos funciona
- [x] Manejo de errores es adecuado (prueba con servidor apagado)
- [x] KPIs (saldo) se actualizan correctamente
- [x] El código usa async/await y try/catch/finally