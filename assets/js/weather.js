// weather.js

// Show loading state immediately
const container = document.getElementById('weather-container');
if (container) {
    container.innerHTML = '<span class="muted small">🌡️ Loading weather...</span>';
}

// Start fetching weather data immediately
const weatherPromise = fetch('https://api.open-meteo.com/v1/forecast' +
    '?latitude=37.7500278' +
    '&longitude=-122.4596111' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&current=temperature_2m' +
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
    }

    getWeatherEmoji(code) {
        const weatherEmojis = {
            0: '☀️',  // Clear sky
            1: '🌤️',  // Mainly clear
            2: '⛅',  // Partly cloudy
            3: '☁️',  // Overcast
            45: '🌫️', // Foggy
            48: '🌫️', // Depositing rime fog
            51: '🌧️', // Light drizzle
            53: '🌧️', // Moderate drizzle
            55: '🌧️', // Dense drizzle
            61: '🌧️', // Slight rain
            63: '🌧️', // Moderate rain
            65: '⛈️', // Heavy rain
            71: '🌨️', // Slight snow
            73: '🌨️', // Moderate snow
            75: '🌨️', // Heavy snow
            95: '⛈️', // Thunderstorm
            96: '⛈️', // Thunderstorm with slight hail
            99: '⛈️'  // Thunderstorm with heavy hail
        };
        return weatherEmojis[code] || '❓';
    }

    async displayWeather() {
        const container = document.getElementById('weather-container');
        if (!container) return;

        try {
            const data = await this.weatherPromise;
            const currentTemp = Math.round(data.current.temperature_2m);
            const minTemp = Math.round(data.daily.temperature_2m_min[0]);
            const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
            const emoji = this.getWeatherEmoji(data.daily.weather_code[0]);

            container.innerHTML = `<span class="muted small">${emoji} ${currentTemp}° (${minTemp}°-${maxTemp}°) in the 94116</span>`;
        } catch (error) {
            console.error('Error fetching weather:', error);
            container.innerHTML = '<span class="muted small">❌ Weather unavailable</span>';
        }
    }

    async fetchWeather() {
        this.weatherPromise = fetch(this.apiUrl).then(response => response.json());
        await this.displayWeather();
    }

    init() {
        this.displayWeather();
        // Refresh weather data every 30 minutes
        setInterval(() => this.fetchWeather(), 30 * 60 * 1000);
    }
}

// Initialize the weather widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
});