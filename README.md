# 🌤️ Weather App

A simple weather application built with **React** and **OpenWeatherMap API**.  
Users can search for any city and get current weather data including temperature, feels-like, humidity, and wind speed.

---

## 🚀 Features

- 🔍 **Search by City** — Enter a city name to get real-time weather data.
- 📍 **Geocoding API** — Converts city names to coordinates for more accurate weather data.
- 🌡️ **Weather Details** — Shows temperature, weather condition, feels-like temperature, humidity, and wind speed.
- 🎨 **Responsive & Stylish UI** — Clean layout with custom fonts and a background image.

---

## 🛠️ Run It Locally

1. Get a free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).
2. Copy `.env.example` to `.env` and put your key in it:
   ```
   REACT_APP_OPENWEATHER_KEY=your_api_key_here
   ```
3. Install and start:
   ```bash
   npm install
   npm start
   ```

`.env` is gitignored, so the key stays out of the repo. Create React App inlines it into the JavaScript bundle at
build time, so a deployed copy still exposes it to anyone who opens the browser's developer tools: use a free-tier
key, or put a small server-side proxy in front of the API if that matters.
