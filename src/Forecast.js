import React from "react";
import "./forecast.css";
import WeatherIcon from "./WeatherIcon";
export default function Forecast(props) {
  //console.log(props.data, "4");
  return (
    <div className="Forecast">
      {props.data.map((daily, i) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
        const date = new Date(daily.dt * 1000);
        const day = daysOfWeek[date.getDay()];
        if (i < 5) {
          return (
            <div key={i} className="forecast-day d-flex justify-content-evenly">
              <h5 className="pt-1">{day}</h5>
              <WeatherIcon
                code={daily.weather[0].icon}
                size={25}
                color="#E4513D"
              />
              <p>
                {Math.round(daily.temp.max)}
                <br />
                <small>{Math.round(daily.temp.min)}</small>
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
