import
{ ref, onMounted }
from
'vue'
;
import
{ movimientoService }
from
'@/services/erpApi'
;
import
{ computed }
from
'vue'
;
const
totalIngresos =
computed
(
() =>
{
return
movimientos.
value
.
filter
(
m
=>
m.
tipo
===
'Ingreso'
).
reduce
(
(
sum, m
) =>
sum + m.
monto
,
0
);});
const
totalEgresos =
computed
(
() =>
{
return
movimientos.
value
.
filter
(
m
=>
m.
tipo
===
'Egreso'
).
reduce
(
(
sum, m
) =>
sum + m.
monto
,
0
);
});
const
saldo =
computed
(
() =>
totalIngresos.
value
- totalEgresos.
value
);
const
movimientos =
ref
([]);
const
cargando =
ref
(
false
);
const
error =
ref
(
null
);
async
function
cargarMovimientos
(
) { cargando.
value
=
true
; error.
value
=
null
;
try
{
const
respuesta =
await
movimientoService.
getAll
(); movimientos.
value
= respuesta.
data
.
datos
; }
catch
(err) { error.
value
=
'No se pudo conectar con el servidor. Verifica que esté encendido.'
; }
finally
{ cargando.
value
=
false
; }}

const
nuevoMovimiento =
ref
({
concepto
:
''
,
tipo
:
'Ingreso'
,
monto
:
''
});
async
function
guardarMovimiento
(
) { cargando.
value
=
true
; error.
value
=
null
;
try
{
const
respuesta =
await
movimientoService.
create
(nuevoMovimiento.
value
); movimientos.
value
.
push
(respuesta.
data
.
datos
);
// Actualización reactiva
nuevoMovimiento.
value
= {
concepto
:
''
,
tipo
:
'Ingreso'
,
monto
:
''
};
// Limpiar
}
catch
(err) {
// Captura el mensaje específico del backend (ej: "El monto debe ser positivo")
error.
value
= err.
response
?.
data
?.
mensaje
||
'Error al guardar el movimiento'
; }
finally
{ cargando.
value
=
false
; }}
onMounted
(cargarMovimientos);