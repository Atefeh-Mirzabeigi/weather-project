import axios from "axios";
import React, { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import "./weather.css";

import WeatherInfo from "./WeatherInfo";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [loaded, setLoaded] = useState(false);
  function handleResponse(res) {
    console.log(res.data);
    setWeatherData({
      temp: res.data.main.temp,
      wind: res.data.wind.speed,
      humidity: res.data.main.humidity,
      description: res.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
      feels_like: res.data.main.feels_like,
      cityName: res.data.name,
      date: new Date(res.data.dt * 1000),
    });
  }
  function searchCityWeather() {
    const apiKey = "5ef18a61953b939c992cce84e77cc561";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
    setLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCityWeather();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (loaded) {
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
          <div className="forecast col-4 text-center pt-4">
            <h3 className="py-2">{weatherData.cityName}</h3>
            <div className="forecast-day d-flex justify-content-evenly">
              <h5 className="pt-1">Sun</h5>
              <img
                src="http://openweathermap.org/img/wn/02d@2x.png"
                alt="weather icon"
                className="img-fluid"
              />
              <p>
                20
                <br />
                <small>15</small>
              </p>
            </div>
            <div className="forecast-day">Mon</div>
            <div className="forecast-day">Tue</div>
            <div className="forecast-day">Wed</div>
            <div className="forecast-day">Thr</div>
          </div>
        </div>
      </div>
    );
  } else {
    searchCityWeather();
    return <div>loading...</div>;
  }
}
