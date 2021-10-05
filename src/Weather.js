import axios from "axios";
import React, { useState } from "react";
import "./weather.css";

export default function Weather() {
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
      city: res.data.main.name,
    });
  }
  if (loaded) {
    return (
      <div className="weather mx-auto">
        <div className="row rounded">
          <div className="current-day col-8">
            <div className="d-flex align-items-center justify-content-between">
              <div className="weather-icon">
                <img
                  src={weatherData.icon}
                  alt="weather icon"
                  className="img-fluid"
                />
              </div>
              <div className="location d-flex justify-content-between">
                <i className="bi bi-geo-alt-fill"></i>
                <div className="ms-2 text-start">
                  <p>location</p>
                  <h6>{weatherData.city}</h6>
                </div>
              </div>
            </div>
            <div className="current-day-status text-center">
              <h1>{Math.round(weatherData.temp)} °c</h1>
              <p className="climate-status text-capitalize">
                {weatherData.description}
              </p>
              <p>Monday 20:00</p>
            </div>
            <div className="search text-center d-flex ms-5 me-3">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Enter location"
                />
                <button className="btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <a className="btn" href="/">
                <i className="bi bi-geo-alt"></i>
              </a>
            </div>
            <div className="additional-info text-center my-4">
              <h5 className="my-3">Climate Information</h5>
              <ul className="d-flex justify-content-center">
                <li>
                  <h6>Humidity</h6>
                  <p>{weatherData.humidity}%</p>
                </li>
                <li>
                  <h6>Wind Speed</h6>
                  <p>{Math.floor(weatherData.wind)}5m/s</p>
                </li>
                <li>
                  <h6>Feels like</h6>
                  <p>{weatherData.feels_like}°c</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="forecast col-4 text-center pt-4">
            <h3 className="py-2">{weatherData.city}</h3>
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
    const apiKey = "5ef18a61953b939c992cce84e77cc561";
    const city = "London";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
    setLoaded(true);
    return <div>loading...</div>;
  }
}
