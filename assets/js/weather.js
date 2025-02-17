// weather.js

// Show loading state immediately
const container = document.getElementById('weather-container');
if (container) {
    container.innerHTML = '';
}

// Start fetching weather data immediately
const weatherPromise = fetch('https://api.open-meteo.com/v1/forecast' +
    '?latitude=37.7500278' +
    '&longitude=-122.4596111' +
    '&daily=temperature_2m_max,temperature_2m_min' +
    '&current=temperature_2m,weather_code' +
    '&timezone=America/Los_Angeles' +
    '&forecast_days=1'
).then(response => response.json());

class WeatherWidget {
    constructor() {
        this.weatherPromise = weatherPromise;
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast' +
            '?latitude=37.7500278' +
            '&longitude=-122.4596111' +
            '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
            '&current=temperature_2m' +
            '&timezone=America/Los_Angeles' +
            '&forecast_days=1';
        this.lastUpdateTime = null;
    }

    getWeatherEmoji(code) {
        // Get current hour to determine if it's night time
        const hour = new Date().getHours();
        const isNight = hour <= 5 || hour >= 21;  // Night between 8 PM and 6 AM

        const weatherEmojis = {
            0: isNight ? '🌙' : '☀️',   // Clear sky
            1: isNight ? '🌜' : '🌤️',   // Mainly clear
            2: isNight ? '☁️' : '⛅',    // Partly cloudy
            3: '☁️',                     // Overcast
            45: '🌁',                    // Foggy (SF style!)
            48: '🌁',                    // Depositing rime fog (SF marine layer)
            51: '🌦️',                    // Light drizzle
            53: '🌧️',                    // Moderate drizzle
            55: '🌧️',                    // Dense drizzle
            61: '🌦️',                    // Slight rain
            63: '🌧️',                    // Moderate rain
            65: '⛈️',                    // Heavy rain
            71: '🌨️',                    // Slight snow (rare in SF!)
            73: '🌨️',                    // Moderate snow
            75: '❄️',                    // Heavy snow
            77: '❄️',                    // Snow grains
            80: '🌦️',                    // Slight rain showers
            81: '🌧️',                    // Moderate rain showers
            82: '⛈️',                    // Violent rain showers
            85: '🌨️',                    // Slight snow showers
            86: '❄️',                    // Heavy snow showers
            95: '⛈️',                    // Thunderstorm
            96: '⛈️',                    // Thunderstorm with slight hail
            99: '⚡'                     // Thunderstorm with heavy hail
        };
        return weatherEmojis[code] || '❓';
    }

    async displayWeather() {
        const container = document.getElementById('weather-container');
        if (!container) return;

        try {
            const data = await this.weatherPromise;
            
            // Log update time and data for debugging
            const now = new Date();
            console.log('Weather data updated at:', now.toLocaleTimeString());
            if (this.lastUpdateTime) {
                console.log('Time since last update:', 
                    (now - this.lastUpdateTime) / 1000 / 60, 'minutes');
            }
            this.lastUpdateTime = now;
            
            console.log('Current temp:', data.current.temperature_2m);
            console.log('Daily forecast:', data.daily);

            const currentTemp = Math.round(data.current.temperature_2m);
            const minTemp = Math.round(data.daily.temperature_2m_min[0]);
            const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
            const emoji = this.getWeatherEmoji(data.current.weather_code);

            container.innerHTML = `<a class="muted small" href="https://www.google.com/search?q=weather+94116" target="_blank">${emoji} ${currentTemp}°C (${minTemp}°-${maxTemp}°) in the 94116</a>`;
        } catch (error) {
            console.error('Error fetching weather:', error);
            container.innerHTML = '';
        }
    }

    async fetchWeather() {
        this.weatherPromise = fetch(this.apiUrl).then(response => response.json());
        await this.displayWeather();
    }

    init() {
        this.displayWeather();
        // Refresh weather data every 15 minutes instead of 30
        setInterval(() => this.fetchWeather(), 15 * 60 * 1000);
    }
}

// Initialize the weather widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
});