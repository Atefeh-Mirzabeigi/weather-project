import axios from "axios";
import React, { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import Forecast from "./Forecast";
import "./weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [lat, setLat] = useState(props.defaultLat);
  const [lon, setLon] = useState(props.defaultLon);
  const [weatherData, setWeatherData] = useState({ loaded: false });
  const [dailyWeather, setDailyWeather] = useState({ ready: false });
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
    });
    setLat(res.data.coord.lat);
    setLon(res.data.coord.lon);
    handleForecast();
  }
  function handleForecastResponse(res) {
    setDailyWeather({ data: res.data.daily, ready: true });
  }
  function handleForecast() {
    const apiKey = "5ef18a61953b939c992cce84e77cc561";
    const forecastUrl = `http://api.openweathermap.org/data/2.5/onecall?exclude=hourly,current,minutely,hourly&lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(handleForecastResponse);
  }
  function searchCityWeather() {
    const apiKey = "5ef18a61953b939c992cce84e77cc561";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
        <div className="row rounded">
          <div className="current-day col-8">
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
          <div className="col-4 text-center pt-4">
            <h3 className="py-2">{weatherData.cityName}</h3>
            {dailyWeather.ready ? (
              <Forecast data={dailyWeather.data} />
            ) : (
              <div>loading...</div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    searchCityWeather();
    return <div>loading...</div>;
  }
}
