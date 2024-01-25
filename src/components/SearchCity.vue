<template>
    
    <div>
        <input 
            type="text" 
            placeholder="Search for a city" 
            class="border border-r-4 shadow-lg" 
            v-model="primaryStore.currentSearch"
            @input="primaryStore.getCity"
        />
    </div>

    <div>
        <div v-if="primaryStore.results !== null">
            <div v-for="city in primaryStore.results" :key="city.id">
                <button @click="primaryStore.getWeather(city.id)">
                    {{ city.name }}, {{ city.region }}, {{ city.country }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePrimaryStore } from '@/stores/PrimaryStore.js'

const primaryStore = usePrimaryStore()

</script>