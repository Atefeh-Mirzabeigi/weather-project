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
  function getCurrentLocation(event) {
    event.preventDefault();
    let position = navigator.geolocation.getCurrentPosition(setLocation);
    console.log(position);
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "e0fd97ef0bc3c4e53135648ec65c7fbf";
    function setLocation(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      axios
        .get(
          `${apiUrl}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then(handleResponse);
    }
  }
  if (weatherData.loaded) {
    return (
      <div className="weather mx-auto">
        <div className="row rounded justify-content-center">
          <div className="current-day col-md-8 col-sm-12">
            <WeatherInfo data={weatherData} />
            <div className="search text-center justify-content-center d-flex">
              <form onSubmit={handleSubmit} className="mx-4">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control px-4"
                    placeholder="Enter location"
                    autoFocus="on"
                    onChange={handleCityChange}
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
              <div>
                <button className="mt-1" onClick={getCurrentLocation}>
                  <i className="bi bi-geo-alt"></i>
                </button>
              </div>
            </div>
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
