# Informe de Investigación: Programación Asíncrona y Manejo de Errores

## 1. Simulación de Servidor Caído
* **Experimento:** Se detuvo el servidor de Express (`Ctrl + C`) y se intentó cargar la lista de movimientos desde el frontend en Vue 3.
* **Error en Consola:** `ERR_CONNECTION_REFUSED` o `AxiosError: Network Error`.
* **Comportamiento en la UI:** El bloque `catch` atrapó el fallo de red y mostró en pantalla el mensaje amigable: *"No se pudo conectar con el servidor. Verifica que esté encendido."* Gracias al bloque `finally`, el estado de carga (`cargando.value = false`) finalizó correctamente y el spinner no se quedó pegado.

## 2. Manejo de Errores HTTP 400 (Bad Request)
* **Experimento:** Se envió un nuevo movimiento con un monto negativo (ej. `-50`).
* **Captura de Respuesta:** El backend respondió con un código de estado `400 Bad Request` y un cuerpo JSON con la estructura `{ mensaje: "El monto debe ser positivo" }`.
* **Mensaje en UI:** La interfaz capturó el objeto de error mediante `err.response?.data?.mensaje` y desplegó exactamente la razón devuelta por la API en la notificación de error de la vista.

## 3. Implementación e Investigación de `Promise.all`
Para ejecutar múltiples peticiones asíncronas en paralelo y esperar a que todas finalicen antes de ocultar la interfaz de carga, se utilizó `Promise.all`:

```javascript
async function cargarDatosIniciales() {
  cargando.value = true;
  error.value = null;
  try {
    const [resMovimientos, resContactos] = await Promise.all([
      movimientoService.getAll(),
      contactoService.getAll()
    ]);
    movimientos.value = resMovimientos.data.datos;
    contactos.value = resContactos.data.datos;
  } catch (err) {
    error.value = 'Error al cargar los datos del sistema';
  } finally {
    cargando.value = false;
  }
}