import React from "react";
import "./forecast.css";
import WeatherIcon from "./WeatherIcon";

export default function ForecastDay(props) {
  function max() {
    return `${Math.round(props.data.temp.max)}`;
  }

  function min() {
    return `${Math.round(props.data.temp.min)}`;
  }

  function days() {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
    const date = new Date(props.data.dt * 1000);
    const day = daysOfWeek[date.getDay()];
    return `${day}`;
  }

  return (
    <div>
      <div className="forecast-day d-flex justify-content-evenly">
        <h5 className="pt-1">{days()}</h5>
        <WeatherIcon
          code={props.data.weather[0].icon}
          size={25}
          color="#E4513D"
        />
        <p>
          {max()}
          <br />
          <small>{min()}</small>
        </p>
      </div>
    </div>
  );
}
