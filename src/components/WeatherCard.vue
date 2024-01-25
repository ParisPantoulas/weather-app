<template>
    <div v-if="primaryStore.weather !== null">
        {{ primaryStore.weather }}
    </div>
    <div v-else>
        No selected city
    </div>
</template>

<script setup>
import { usePrimaryStore } from '@/stores/PrimaryStore';

const primaryStore = usePrimaryStore()
</script>
