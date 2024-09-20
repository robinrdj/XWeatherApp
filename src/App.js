import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState(""); 
  const [data, setData] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const API_KEY = "2405418ad0804f70b25135006242008";

  useEffect(()=>{
    const handleSearch = async () => {
      setLoading(true);
      try {
        const response = await axios.get( `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        if(response.status==200){
          setLoading(false);
          setData(response.data);
        }
      } catch (err) {
        alert("Failed to fetch weather data");
        setLoading(false);
      }
  };
    if(city.length){
      handleSearch();
    }
  },[searched]);
  return (
    <div className="app">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search"
      />

      <button onClick={()=>{setSearched(!searched)}}>Search</button>

      {loading && <p>Loading data...</p>}

      {data && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <h4>{data.current.temp_c} °C</h4>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <h4>{data.current.humidity} %</h4>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <h4>{data.current.condition.text}</h4>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <h4>{data.current.wind_kph} kph</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
