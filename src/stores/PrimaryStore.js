import { defineStore } from "pinia";

export const usePrimaryStore = defineStore('primaryStore', {
    state: () => ({
        currentSearch: '',
        timeout: null,
        results: null,
        weather: null
    }),

    actions: {
        async getCity() {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.currentSearch !== '') {
                    const res = await fetch (`http://api.weatherapi.com/v1/search.json?key=9f255f03b0d847b4b52141531242401&q=${this.currentSearch}`)
                    
                    const data = await res.json()
                    this.results = data
                } else {
                    this.results = null
                }
            }, 500);
            
        },

        async getWeather(id) {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9f255f03b0d847b4b52141531242401&q=id:${id}&days=3&aqi=no&alerts=no`)   
            
            const data = await res.json()
            this.weather = data
            this.currentSearch = ''
            this.results = ''
            console.log(this.weather)
        }
    }
})