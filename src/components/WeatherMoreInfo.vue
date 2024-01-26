<template>
    <div 
        class="border p-4 rounded-lg shadow hover:shadow-lg relative text-center w-full"
        :class="{
            'bg-gradient-to-b from-blue-600 to-blue-300 text-white': info.current.is_day === 1,
            'bg-gradient-to-b from-slate-800 to-slate-400 text-white': info.current.is_day !== 1
        }"
        >
        <div class="flex items-center justify-between ml-2">
            <p class="text-lg font-semibold">{{ info.location.name }}, {{ info.location.country }}</p>
            <span class="text-white text-lg mr-2">{{ primaryStore.formatLocalTime(info.location.localtime) }}</span>
        </div>

        <div class="flex flex-row justify-between ml-2 mb-4">
            <div class="flex flex-col items-center">
                <div class="flex flex-row items-center">
                    <span class="text-3xl font-bold">{{ Math.round(info.current.temp_c) }}&deg;</span>
                    <span><img :src="info.current.condition.icon" alt="icon" width="80" class="my-2 ml-2"/></span>
                </div>
            </div>

            <div>
                <p class="text-base mb-2 ml-3">{{ info.current.condition.text }}</p>
                <p class="text-base mb-2">Humidity: {{ info.current.humidity }}%</p>
                <p class="text-base mb-2 ml-6">UV index: {{ info.current.uv }}</p>
            </div>
        </div>

        <div class="flex flex-row justify-between">
            <div>
                <button 
                    class="border-2 w-32 rounded-lg flex justify-between items-center whitespace-nowrap bg-gray-700"
                    :class="{'invisible': !primaryStore.showNextDay}"
                    @click="primaryStore.toggleShowNextDay"
                >
                    <span class="mr-auto ml-6">&larr; Today</span>
                </button>
            </div>
            <div>
                <button 
                    class="border-2 w-32 rounded-lg flex justify-between items-center whitespace-nowrap bg-gray-700" 
                    :class="{'invisible': primaryStore.showNextDay}"
                    @click="primaryStore.toggleShowNextDay"
                >
                    <span class="mr-auto ml-6">Next day &rarr;</span>
                </button>
            </div>
        </div>

        <!--Today Info-->
        <div v-if="!primaryStore.showNextDay" class="border flex flex-row gap-3 overflow-x-auto w-auto h-full p-2 rounded-md mt-2 ml-2">
            <div v-for="index in 24" :key="index" class="border p-4 rounded-md flex flex-col items-center justify-center w-3/6">
                <div class="text-lg font-semibold mb-2 whitespace-nowrap">
                    {{ (info.forecast.forecastday[0].hour[index-1].time).slice(11,13) }}
                </div>
                <div class="text-xs whitespace-nowrap">
                    {{ info.forecast.forecastday[0].hour[index-1].condition.text }}
                </div>
                <img :src="info.forecast.forecastday[0].hour[index-1].condition.icon" alt="icon" class="mx-auto my-2 max-w-none" />
                <div class="text-lg whitespace-nowrap">
                    {{ Math.round(info.forecast.forecastday[0].hour[index-1].temp_c) }}&deg;
                </div>
                <div class="text-sm mt-2 whitespace-nowrap">
                    Feels like: {{ Math.round(info.forecast.forecastday[0].hour[index-1].feelslike_c) }}&deg;
                </div>
            </div>
        </div>

        <!-- Tomorrow Info-->
        <div v-if="primaryStore.showNextDay" class="border flex flex-row gap-3 overflow-x-auto w-auto h-full p-2 rounded-md mt-2 ml-2">
            <div v-for="index in 24" :key="index" class="border p-4 rounded-md flex flex-col items-center justify-center w-3/6">
                <div class="text-lg font-semibold mb-2 whitespace-nowrap">
                    {{ (info.forecast.forecastday[1].hour[index-1].time).slice(11,13) }}
                </div>
                <div class="text-xs whitespace-nowrap">
                    {{ info.forecast.forecastday[1].hour[index-1].condition.text }}
                </div>
                <img :src="info.forecast.forecastday[1].hour[index-1].condition.icon" alt="icon" class="mx-auto my-2 max-w-none" />
                <div class="text-lg whitespace-nowrap">
                    {{ Math.round(info.forecast.forecastday[1].hour[index-1].temp_c) }}&deg;
                </div>
                <div class="text-sm mt-2 whitespace-nowrap">
                    Feels like: {{ Math.round(info.forecast.forecastday[1].hour[index-1].feelslike_c) }}&deg;
                </div>
            </div>
        </div>

    </div>

    <button @click="primaryStore.goBack" class="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
        &larr; Go back
    </button>
</template>

<script setup>
import { usePrimaryStore } from '@/stores/PrimaryStore';
import { onMounted, computed } from 'vue';

const primaryStore = usePrimaryStore();
const info = primaryStore.moreWeather[0];

</script>