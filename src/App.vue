<template>
  <div class="box-content border-4 h-full w-3/4 p-8 mx-auto mt-8 rounded-lg shadow-md bg-slate-100">
    <div class="space-y-6">
      <SearchCity />
      <WeatherCard />
    </div>
  </div>
</template>

<script setup>
import SearchCity from '@/components/SearchCity.vue'
import WeatherCard from '@/components/WeatherCard.vue'
</script>

<style>
#app {
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>