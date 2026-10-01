<script setup>
import { ref, computed } from 'vue'

const asientos = ref([])
const fecha = ref(new Date().toISOString().substr(0, 10))
const concepto = ref('')
const partidas = ref([
    { cuenta: '', debe: 0, haber: 0 },
    { cuenta: '', debe: 0, haber: 0 }
])
const cuentas = [
    '1101 - Caja', '1102 - Bancos', '1103 - Clientes', '1104 - Inventarios',
    '2101 - Proveedores', '2102 - IVA por Pagar',
    '4101 - Ventas', '5101 - Costo de Ventas'
]
// ============ VALIDACIÓN CONTABLE ============
const totalDebe = computed(() => partidas.value.reduce((a, p) => a + Number(p.debe),
    0))
const totalHaber = computed(() => partidas.value.reduce((a, p) => a +
    Number(p.haber), 0))
const diferencia = computed(() => totalDebe.value - totalHaber.value)
const esValido = computed(() =>
    totalDebe.value > 0 && diferencia.value === 0 && concepto.value.trim() !== ''
)
const agregarPartida = () => {
    partidas.value.push({ cuenta: '', debe: 0, haber: 0 })
}
const eliminarPartida = (idx) => {
    if (partidas.value.length > 2) partidas.value.splice(idx, 1)
}
const registrarAsiento = () => {
    if (!esValido.value) return
    asientos.value.push({
        id: asientos.value.length + 1,
        fecha: fecha.value,
        concepto: concepto.value,
        partidas: partidas.value.map(p => ({ ...p }))
    })
    concepto.value = ''
    partidas.value = [
        { cuenta: '', debe: 0, haber: 0 },
        { cuenta: '', debe: 0, haber: 0 }
    ]
}
// Asiento automático de ejemplo
const generarVentaEjemplo = () => {
    concepto.value = 'Venta de mercadería a crédito'
    partidas.value = [
        { cuenta: '1103 - Clientes', debe: 11600, haber: 0 },
        { cuenta: '4101 - Ventas', debe: 0, haber: 10000 },
        { cuenta: '2102 - IVA por Pagar', debe: 0, haber: 1600 }
    ]
}
</script>
<template>
    <div>
        <h1 class="text-h4 mb-4">
            📚
            Motor Contable - Partida Doble</h1>
        <v-alert type="info" variant="tonal" class="mb-4">
            <strong>Principio de partida doble:</strong> Cada transacción afecta al menos
            dos cuentas.
            La suma del DEBE debe ser igual a la suma del HABER.
        </v-alert>
        <v-card>
            <v-card-title>
                Nuevo Asiento Contable
                <v-spacer />
                <v-btn variant="outlined" color="secondary" @click="generarVentaEjemplo">
                    <v-icon start>mdi-auto-fix</v-icon>
                    Cargar ejemplo
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="fecha" label="Fecha" type="date" variant="outlined" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="concepto" label="Concepto" variant="outlined" />
                    </v-col>
                </v-row>
                <v-divider class="my-4" />
                <!-- TABLA DE PARTIDAS -->
                <v-table>
                    <thead>
                        <tr>
                            <th>Cuenta</th>
                            <th class="text-right">Debe ($)</th>
                            <th class="text-right">Haber ($)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(p, idx) in partidas" :key="idx">
                            <td>
                                <v-select v-model="p.cuenta" :items="cuentas" variant="outlined" density="compact"
                                    hide-details />
                            </td>
                            <td>
                                <v-text-field v-model.number="p.debe" type="number" variant="outlined" density="compact"
                                    hide-details :disabled="p.haber > 0" />
                            </td>
                            <td>
                                <v-text-field v-model.number="p.haber" type="number" variant="outlined"
                                    density="compact" hide-details :disabled="p.debe > 0" />
                            </td>
                            <td>
                                <v-btn icon="mdi-delete" size="small" color="error" variant="text"
                                    @click="eliminarPartida(idx)" />
                            </td>
                        </tr>
                        <tr class="bg-grey-lighten-4">
                            <td class="text-right"><strong>TOTALES</strong></td>
                            <td class="text-right"><strong>${{ totalDebe.toFixed(2) }}</strong>
                            </td>
                            <td class="text-right"><strong>${{ totalHaber.toFixed(2) }}</strong>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </v-table>
                <v-btn variant="outlined" class="mt-2" @click="agregarPartida">
                    <v-icon start>mdi-plus</v-icon>
                    Agregar partida
                </v-btn>
                <!-- VALIDACIÓN -->
                <v-alert :type="esValido ? 'success' : diferencia === 0 ? 'info' : 'error'" variant="tonal"
                    class="mt-4">
                    <template v-if="esValido">
                        ✅
                        Asiento cuadrado - Listo para
                        registrar</template>
                    <template v-else-if="diferencia === 0">
                        ⚠
                        Ingresa un concepto para
                        registrar</template>
                    <template v-else>
                        ❌
                        Diferencia: ${{ diferencia.toFixed(2) }} - El asiento
                        NO cuadra</template>
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" size="large" :disabled="!esValido" @click="registrarAsiento">
                    <v-icon start>mdi-content-save</v-icon>
                    Registrar Asiento
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- LIBRO DIARIO -->
        <v-card class="mt-6" v-if="asientos.length > 0">
            <v-card-title>
                📖
                Libro Diario</v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel v-for="asiento in asientos" :key="asiento.id">
                        <v-expansion-panel-title>
                            <v-chip size="small" class="mr-2">#{{ asiento.id }}</v-chip>
                            <strong>{{ asiento.concepto }}</strong>
                            <v-spacer />
                            <span class="text-caption text-grey mr-4">{{ asiento.fecha }}</span>
                            <v-chip color="success" size="small">
                                ${{asiento.partidas.reduce((a, p) => a + Number(p.debe), 0).toFixed(2)}}
                            </v-chip>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact">
                                <thead>
                                    <tr>
                                        <th>Cuenta</th>
                                        <th class="text-right">Debe</th>
                                        <th class="text-right">Haber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(p, i) in asiento.partidas" :key="i">
                                        <td>{{ p.cuenta }}</td>
                                        <td class="text-right">{{ p.debe > 0 ? '$' + p.debe.toFixed(2) :
                                            '' }}</td>
                                        <td class="text-right">{{ p.haber > 0 ? '$' + p.haber.toFixed(2)
                                            : '' }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </div>
</template>