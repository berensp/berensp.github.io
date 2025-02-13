// weather.js

class WeatherWidget {
    constructor() {
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast' +
            '?latitude=37.7500278' +
            '&longitude=-122.4596111' +
            '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
            '&current=temperature_2m' +
            '&timezone=America/Los_Angeles' +
            '&forecast_days=1';
    }

    async fetchWeather() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.showError();
        }
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

    displayWeather(data) {
        const container = document.getElementById('weather-container');
        if (!container) return;

        const currentTemp = Math.round(data.current.temperature_2m);
        const minTemp = Math.round(data.daily.temperature_2m_min[0]);
        const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
        const emoji = this.getWeatherEmoji(data.daily.weather_code[0]);

        container.innerHTML = `<span class="muted small">${emoji} ${currentTemp}°C (${minTemp}°-${maxTemp}°) in the 94116</span>`;
    }

    showError() {
        const container = document.getElementById('weather-container');
        if (container) {
            container.innerHTML = '<span class="muted small">❌ Weather unavailable</span>';
        }
    }

    init() {
        this.fetchWeather();
        // Refresh weather data every 30 minutes
        setInterval(() => this.fetchWeather(), 30 * 60 * 1000);
    }
}

// Initialize the weather widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
});