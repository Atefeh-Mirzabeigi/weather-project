import React from "react";
import "./weather.css";
import FriendlyDate from "./FriendlyDate";
import WeatherIcon from "./WeatherIcon";
import { useState } from "react/cjs/react.development";
export default function WeatherInfo(props) {
  const [temperature, setTemperature] = useState();
  const [units, setUnits] = useState();

  function handleFahrenheit(event) {
    event.preventDefault();
    setTemperature((props.data.temp * 9) / 5 + 32);
    setUnits("°F");
  }
  function handleCelcius(event) {
    event.preventDefault();
    setTemperature(props.data.temp);
    setUnits("°C");
  }
  return (
    <div className="WeatherInfo">
      <div className="d-flex justify-content-end align-items-center">
        <div className="units">
          <a href="/" onClick={handleFahrenheit}>
            F
          </a>{" "}
          |{" "}
          <a href="/" onClick={handleCelcius}>
            C
          </a>{" "}
        </div>
        <div className="location d-flex justify-content-between">
          <i className="bi bi-geo-alt-fill"></i>
          <div className="ms-2 text-start">
            <p>location</p>
            <h6>{props.data.cityName}</h6>
          </div>
        </div>
      </div>
      <div className="current-day-status text-center">
        <h1>
          {Math.round(temperature)}
          <small> {units}</small>
        </h1>
        <div className="d-flex justify-content-center">
          <div className="weather-icon d-flex ps-1 pe-3 m-0">
            <WeatherIcon code={props.data.icon} size={40} color="white" />
            <p className="climate-status text-capitalize pt-2 px-2">
              {props.data.description}
            </p>
          </div>
        </div>
        <FriendlyDate date={props.data.date} />
      </div>
    </div>
  );
}
