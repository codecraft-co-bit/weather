import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState(''); // User-input city
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'; // OpenWeather API key

  // Fetch weather data when the city is updated
  const fetchWeatherData = async () => {
    if (!city) return; // Don't fetch if city is empty

    setLoading(true); // Set loading to true when the fetch starts
    setError(null); // Reset error before making the API call

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null); // Reset weather data in case of error
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  // Trigger the API call when the user submits the city
  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="app">
      <div className="left-column">
        <h1>Weather App</h1>

        {/* City input and form */}
        <form onSubmit={handleCitySubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button type="submit">Get Weather</button>
        </form>

        {/* Loading and error messages */}
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </div>

      {/* Right column to display weather details */}
      <div className="right-column">
        {weatherData && !loading && !error && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p><strong>{weatherData.weather[0].description}</strong></p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
