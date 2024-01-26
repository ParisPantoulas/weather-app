<template>
<div>
    <div v-if="primaryStore.weather !== null" >
        <div class="grid grid-cols-2 gap-4">
            <div
                v-for="indivweather in primaryStore.weather"
                :key="indivweather.data.location.name"
                class="border p-4 rounded-lg shadow hover:shadow-lg relative text-center "
                :class="{
                'bg-gradient-to-b from-blue-600 to-blue-300 text-white': indivweather.data.current.is_day === 1,
                'bg-gradient-to-b from-slate-800 to-slate-400 text-white': indivweather.data.current.is_day !== 1,
                'hidden': primaryStore.showMoreInfo == true}">

                <div v-if="!primaryStore.showMoreInfo">
                    <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold">{{ indivweather.data.location.name }}, {{ indivweather.data.location.country }}</p>
                    <span class="text-white text-lg">{{ primaryStore.formatLocalTime(indivweather.data.location.localtime) }}</span>
                    </div>
                    <img :src="indivweather.data.current.condition.icon" alt="icon" width="80" class="mx-auto my-2" />
                    
                    <p class="text-3xl font-bold mb-2">{{ Math.round(indivweather.data.current.temp_c) }}&deg;</p>
                    <p class="text-base mb-2">{{ indivweather.data.current.condition.text }}</p>
                    <p class="text-base">
                        <span>H: {{ Math.round(indivweather.data.forecast.forecastday[0].day.maxtemp_c) }}&deg; /</span>
                        <span class="text-white ml-2">L: {{ Math.round(indivweather.data.forecast.forecastday[0].day.mintemp_c)}}&deg;</span>
                    </p>

                    <button class="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600" @click="primaryStore.toggleMoreInfo(indivweather.id)">More Info &rarr;</button>
                </div>
            </div>
        </div>
        
        <div v-if="primaryStore.showMoreInfo">
            <WeatherMoreInfo />
        </div>
    </div>
    
</div>
</template>

<script setup>
import WeatherMoreInfo from './WeatherMoreInfo.vue';
import { usePrimaryStore } from '@/stores/PrimaryStore';

const primaryStore = usePrimaryStore()

</script>

