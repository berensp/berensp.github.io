// weather.js

// /today/?date= previews another day, where live conditions are meaningless.
// Skip entirely, fetch included, and leave the container empty.
const previewingAnotherDate = Boolean(window.todayDateOverride);

// Start fetching weather data immediately
const weatherPromise = previewingAnotherDate ? null : fetch('https://api.open-meteo.com/v1/forecast' +
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
            '&daily=temperature_2m_max,temperature_2m_min' +
            '&current=temperature_2m,weather_code' +
            '&timezone=America/Los_Angeles' +
            '&forecast_days=1';
        this.lastUpdateTime = null;
        this.retryTimeout = null;
        this.updateInterval = null;
    }

    getWeatherEmoji(code) {
        // Judged in Pacific time, since the conditions reported are San Francisco's
        const hour = Number(new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hourCycle: 'h23',
            timeZone: 'America/Los_Angeles'
        }).format(new Date()));
        const isNight = hour < 6 || hour >= 20;  // Night between 8 PM and 6 AM

        const weatherCodes = {
            0: ['Clear sky', isNight ? '🌙' : '☀️'],
            1: ['Mainly clear', isNight ? '🌜' : '🌤️'],
            2: ['Partly cloudy', isNight ? '☁️' : '⛅'],
            3: ['Overcast', '☁️'],
            45: ['Foggy', '🌫'],
            48: ['Marine layer', '🌫'],
            51: ['Light drizzle', '🌦️'],
            53: ['Moderate drizzle', '🌧️'],
            55: ['Dense drizzle', '💧'],
            61: ['Slight rain', '🌦️'],
            63: ['Moderate rain', '🌧️'],
            65: ['Heavy rain', '⛈️'],
            71: ['Light snow', '🌨️'],
            73: ['Moderate snow', '🌨️'],
            75: ['Heavy snow', '❄️'],
            77: ['Snow grains', '❄️'],
            80: ['Light rain showers', '🌦️'],
            81: ['Moderate rain showers', '🌧️'],
            82: ['Violent rain showers', '⛈️'],
            85: ['Light snow showers', '🌨️'],
            86: ['Heavy snow showers', '❄️'],
            95: ['Thunderstorm', '⛈️'],
            96: ['Thunderstorm with slight hail', '⛈️'],
            99: ['Thunderstorm with heavy hail', '⚡']
        };

        const [description, emoji] = weatherCodes[code] || ['Unknown weather', '❓'];
        return emoji;
    }

    async displayWeather() {
        try {
            const data = await this.weatherPromise;

            if (typeof data.current.weather_code === 'undefined') {
                throw new Error('Missing weather code');
            }

            const currentTemp = Math.round(data.current.temperature_2m);
            const emoji = this.getWeatherEmoji(data.current.weather_code);

            // The daily block is a one-element array per forecast_days=1
            const daily = data.daily || {};
            const high = Array.isArray(daily.temperature_2m_max)
                ? Math.round(daily.temperature_2m_max[0]) : null;
            const low = Array.isArray(daily.temperature_2m_min)
                ? Math.round(daily.temperature_2m_min[0]) : null;
            const range = (high === null || low === null)
                ? '' : `, ${high}°/${low}° today`;

            const container = document.getElementById('weather-container');
            if (container) {
                container.innerHTML = `<span class="muted small">${emoji} ` +
                    `${currentTemp}°C now${range} in the 94116</span>`;
            }

            // Clear any retry timeout if successful
            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout);
                this.retryTimeout = null;
            }
        } catch (error) {
            console.error('Error displaying weather:', error);
            
            // Only set a new retry timeout if one isn't already pending
            if (!this.retryTimeout) {
                this.retryTimeout = setTimeout(() => this.fetchWeather(), 60000);
            }
        }
    }

    async fetchWeather() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.weatherPromise = response.json();
            await this.displayWeather();
        } catch (error) {
            console.error('Error refreshing weather:', error);
            // Only set a new retry timeout if one isn't already pending
            if (!this.retryTimeout) {
                this.retryTimeout = setTimeout(() => this.fetchWeather(), 60000);
            }
        }
    }

    init() {
        this.displayWeather();
        // Refresh weather data every 30 minutes
        this.updateInterval = setInterval(() => this.fetchWeather(), 30 * 60 * 1000);
    }

    cleanup() {
        // Clear all timeouts and intervals
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
        }
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize the weather widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (previewingAnotherDate) {
        return;
    }
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
});