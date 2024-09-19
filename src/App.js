import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Assuming you have a CSS file for styling

const WeatherApp = () => {
  const [loading, setLoading] = useState(false); 
  const [city, setCity] = useState(""); 
  const [data, setData] = useState(""); 

  const API_KEY = "2405418ad0804f70b25135006242008";
  const handleSearch = async () => {
    setLoading(true);
    setData("");
    try {
      const response = await axios.get( `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      setData(response.data);
    } catch (err) {
      alert("Failed to fetch weather data");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search"
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data…</p>}

      {data && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{data.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{data.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
