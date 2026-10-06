// weather.js

// /today/?date= previews another day, where live conditions are meaningless.
// Skip entirely, fetch included, and leave the container empty.
const previewingAnotherDate = Boolean(window.todayDateOverride);

const LATITUDE = 37.7500278;
const LONGITUDE = -122.4596111;
const LOCATION_LABEL = '94116';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${LATITUDE}` +
    `&longitude=${LONGITUDE}` +
    '&daily=temperature_2m_max,temperature_2m_min' +
    '&current=temperature_2m,weather_code' +
    '&timezone=America/Los_Angeles' +
    '&forecast_days=1';

const GOOGLE_WEATHER_URL = 'https://www.google.com/search?q=' +
    encodeURIComponent(`weather ${LOCATION_LABEL}`);

// Retries back off from a minute, doubling, then give up and leave it to the
// periodic refresh rather than pestering the API through a long outage.
const RETRY_BASE_MS = 60 * 1000;
const RETRY_MAX_ATTEMPTS = 5;
const REFRESH_MS = 30 * 60 * 1000;

// Start fetching weather data immediately
const weatherPromise = previewingAnotherDate
    ? null
    : fetch(WEATHER_API_URL).then(response => response.json());

function kmBetween(lat1, lon1, lat2, lon2) {
    const toRadians = degrees => degrees * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(a));
}

class WeatherWidget {
    constructor() {
        this.weatherPromise = weatherPromise;
        this.lastUpdateTime = null;
        this.retryTimeout = null;
        this.retryAttempt = 0;
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

            console.groupCollapsed('weather.js — Open-Meteo response');
            console.log('Requested:', LATITUDE, LONGITUDE, `(${LOCATION_LABEL})`);
            console.log('Grid cell served:', data.latitude, data.longitude,
                `— ${kmBetween(LATITUDE, LONGITUDE, data.latitude, data.longitude).toFixed(2)} km away,` +
                ` elevation ${data.elevation} m`);
            console.log('Timezone:', data.timezone, data.timezone_abbreviation,
                `(UTC offset ${data.utc_offset_seconds}s)`);
            console.log('Current:', data.current, data.current_units);
            console.log('Daily:', data.daily, data.daily_units);
            console.log('Full response:', data);
            console.groupEnd();

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
                container.innerHTML =
                    `<span class="muted small">${emoji} ${currentTemp}°C now${range} in the </span>` +
                    `<a class="muted small" href="${GOOGLE_WEATHER_URL}" target="_blank">${LOCATION_LABEL}</a>`;
            }

            // Clear any retry timeout if successful
            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout);
                this.retryTimeout = null;
            }
            this.retryAttempt = 0;
        } catch (error) {
            console.error('Error displaying weather:', error);
            this.scheduleRetry();
        }
    }

    scheduleRetry() {
        // One pending retry at a time. The handle is cleared before the attempt
        // runs, so a repeat failure can schedule the next one.
        if (this.retryTimeout || this.retryAttempt >= RETRY_MAX_ATTEMPTS) {
            return;
        }

        const delay = RETRY_BASE_MS * Math.pow(2, this.retryAttempt);
        this.retryAttempt += 1;
        this.retryTimeout = setTimeout(() => {
            this.retryTimeout = null;
            this.fetchWeather();
        }, delay);
    }

    async fetchWeather() {
        try {
            const response = await fetch(WEATHER_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.weatherPromise = response.json();
            await this.displayWeather();
        } catch (error) {
            console.error('Error refreshing weather:', error);
            this.scheduleRetry();
        }
    }

    init() {
        this.displayWeather();
        // Refresh weather data every 30 minutes
        this.updateInterval = setInterval(() => this.fetchWeather(), REFRESH_MS);
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