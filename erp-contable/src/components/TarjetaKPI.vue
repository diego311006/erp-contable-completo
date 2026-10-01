<script setup>
// Definimos qué propiedades recibe este componente
// En JavaScript usamos la sintaxis con objeto de configuración
defineProps({
    titulo: {
        type: String,
        required: true
    },
    valor: {
        type: [Number, String],
        required: true
    },
    icono: {
        type: String,
        default: 'mdi-information'
    },
    color: {
        type: String,
        default: 'primary'
    }
})
</script>
<template>
    <v-card :color="color" variant="tonal">
        <v-card-text class="d-flex align-center">
            <v-icon size="40" class="mr-3">{{ icono }}</v-icon>
            <div>
                <div class="text-h4">{{ valor }}</div>
                <div class="text-caption">{{ titulo }}</div>
            </div>
        </v-card-text>
    </v-card>
</template>