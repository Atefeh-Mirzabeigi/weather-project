import React from "react";
import "./weather.css";
import FriendlyDate from "./FriendlyDate";
export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <div className="d-flex align-items-center justify-content-between">
        <div className="weather-icon">
          <img src={props.data.icon} alt="weather icon" className="img-fluid" />
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
          {Math.round(props.data.temp)}
          <small> °C</small>
        </h1>
        <p className="climate-status text-capitalize">
          {props.data.description}
        </p>
        <FriendlyDate date={props.data.date} />
      </div>
    </div>
  );
}
