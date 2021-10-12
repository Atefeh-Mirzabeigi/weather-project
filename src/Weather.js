import axios from "axios";
import React, { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import Forecast from "./Forecast";
import "./weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ loaded: false });
  function handleResponse(res) {
    setWeatherData({
      loaded: true,
      temp: res.data.main.temp,
      wind: res.data.wind.speed,
      humidity: res.data.main.humidity,
      description: res.data.weather[0].description,
      icon: res.data.weather[0].icon,
      feels_like: res.data.main.feels_like,
      cityName: res.data.name,
      date: new Date(res.data.dt * 1000),
      coordinates: res.data.coord,
    });
  }
  function searchCityWeather() {
    const apiKey = "e0fd97ef0bc3c4e53135648ec65c7fbf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    searchCityWeather();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (weatherData.loaded) {
    return (
      <div className="weather mx-auto">
        <div className="row rounded justify-content-center">
          <div className="current-day col-md-8 col-sm-12">
            <WeatherInfo data={weatherData} />
            <form onSubmit={handleSubmit}>
              <div className="search text-center d-flex ms-5 me-3">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Enter location"
                    autoFocus="on"
                    onChange={handleCityChange}
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
                <a className="btn" href="/">
                  <i className="bi bi-geo-alt"></i>
                </a>
              </div>
            </form>
            <AdditionalInfo data={weatherData} />
          </div>
          <div className="col-md-4 col-sm-8 text-center py-4">
            <h3 className="py-2">{weatherData.cityName}</h3>
            {/* {dailyWeather.ready ? (
              <Forecast data={dailyWeather.data} />
            ) : (
              <div>loading...</div>
            )} */}
            <Forecast coordinates={weatherData.coordinates} />
          </div>
        </div>
      </div>
    );
  } else {
    searchCityWeather();
    return <div>loading...</div>;
  }
}
