<template>
<div class="flex flex-col space-y-4 p-4">
    <form>
    <div class="relative">
        <input
        type="text"
        placeholder="Search for a city"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300 hover:shadow-gray-500"
        v-model="primaryStore.currentSearch"
        @input="primaryStore.getCity"
        />
    </div>
    </form>

    <div v-if="primaryStore.results !== null">
    <div v-for="city in primaryStore.results" :key="city.id">
        <button @click="primaryStore.getWeather(city.id)"
                class="block w-full px-4 py-2 text-left bg-sky-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
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