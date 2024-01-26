import { defineStore } from "pinia";

export const usePrimaryStore = defineStore('primaryStore', {
    state: () => ({
        currentSearch: '',
        timeout: null,
        results: null,
        weather: [],
        showMoreInfo: false,
        moreWeather: [],
        currentday: [],
        nextday: [],
        thirday: [],
        showNextDay: false
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
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9f255f03b0d847b4b52141531242401&q=id:${id}&days=3&aqi=no&alerts=no`);
            const data = await res.json();

            const weatherData = {
                id: id,
                data: data
            };
        
            this.weather.push(weatherData);
            this.currentSearch = '';
            this.results = '';
        },

        formatLocalTime(time) {
            const date = new Date(time);
            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },

        async toggleMoreInfo(id) {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9f255f03b0d847b4b52141531242401&q=id:${id}&days=3&aqi=no&alerts=no`);
            const data = await res.json();

            this.moreWeather.push(data)
            this.showMoreInfo = !this.showMoreInfo
            this.currentday = this.moreWeather[0].forecast.forecastday[0].hour
            this.nextday = this.moreWeather[0].forecast.forecastday[1].hour
            this.thirday = this.moreWeather[0].forecast.forecastday[2].hour

            console.log(this.currentday)
        },

        goBack() {
            this.showMoreInfo = !this.showMoreInfo
            this.moreWeather = [],
            this.transformedWeatherData = [];
        },

        toggleShowNextDay() {
            this.showNextDay = !this.showNextDay
        }
    }
})