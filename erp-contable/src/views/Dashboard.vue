<script setup>
import { computed } from 'vue'
import TarjetaKPI from '../components/TarjetaKPI.vue'
// Datos simulados (en producción vendrían de los otros módulos)
const ventasDelMes = 125000
const gastosDelMes = 78000
const clientesActivos = 12
const facturasPendientes = 5
const utilidad = computed(() => ventasDelMes - gastosDelMes)
const margen = computed(() => ((utilidad.value / ventasDelMes) * 100).toFixed(1))
</script>
<template>
    <div>
        <h1 class="text-h4 mb-4">
            📊
            Dashboard Financiero</h1>
        <!-- KPIs PRINCIPALES (reutilizamos TarjetaKPI) -->
        <v-row>
            <v-col cols="12" md="3">
                <TarjetaKPI titulo="Ventas del mes" :valor="'$' +
                    ventasDelMes.toLocaleString()" icono="mdi-cash" color="primary" />
            </v-col>
            <v-col cols="12" md="3">
                <TarjetaKPI titulo="Gastos del mes" :valor="'$' +
                    gastosDelMes.toLocaleString()" icono="mdi-cart" color="error" />
            </v-col>
            <v-col cols="12" md="3">
                <TarjetaKPI titulo="Utilidad" :valor="'$' + utilidad.toLocaleString()" icono="mdi-trending-up"
                    color="success" />
            </v-col>
            <v-col cols="12" md="3">
                <TarjetaKPI titulo="Facturas pendientes" :valor="facturasPendientes" icono="mdi-account-clock"
                    color="warning" />
            </v-col>
        </v-row>
        <!-- GRÁFICOS -->
        <v-row class="mt-4">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Distribución de gastos</v-card-title>
                    <v-card-text>
                        <div class="mb-3">
                            <div class="d-flex justify-space-between mb-1">
                                <span>Compras</span><span>45%</span>
                            </div>
                            <v-progress-linear model-value="45" color="primary" height="20" rounded />
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-space-between mb-1">
                                <span>Nómina</span><span>30%</span>
                            </div>
                            <v-progress-linear model-value="30" color="secondary" height="20" rounded />
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-space-between mb-1">
                                <span>Servicios</span><span>15%</span>
                            </div>
                            <v-progress-linear model-value="15" color="success" height="20" rounded />
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-space-between mb-1">
                                <span>Otros</span><span>10%</span>
                            </div>
                            <v-progress-linear model-value="10" color="warning" height="20" rounded />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Estado de salud financiera</v-card-title>
                    <v-card-text class="text-center">
                        <v-progress-circular :model-value="Number(margen)" :size="150" :width="15" color="success">
                            <span class="text-h4">{{ margen }}%</span>
                        </v-progress-circular>
                        <div class="text-caption mt-2">Margen de utilidad</div>
                        <v-divider class="my-4" />
                        <div class="d-flex justify-space-around">
                            <div>
                                <div class="text-h5 text-primary">{{ clientesActivos }}</div>
                                <div class="text-caption">Clientes activos</div>
                            </div>
                            <div>
                                <div class="text-h5 text-warning">{{ facturasPendientes }}</div>
                                <div class="text-caption">Por cobrar</div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>