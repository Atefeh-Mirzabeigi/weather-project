import React, { useEffect, useState } from "react";
import "./forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  //console.log(props.coordinates);
  const [daily, setDaily] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);
  //if the coordinates change
  // set the loaded false

  function handleResponse(res) {
    setLoaded(true);
    setDaily(res.data.daily);
    //console.log(res.data.daily);
  }

  if (loaded) {
    return (
      <div className="Forecast">
        {daily.map((eachDay, i) => {
          if (i < 5) {
            return (
              <div key={i}>
                <ForecastDay data={eachDay} />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  } else {
    const apiKey = "e0fd97ef0bc3c4e53135648ec65c7fbf";
    const lat = props.coordinates.lat;
    const lon = props.coordinates.lon;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,current,minutely,hourly&lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(handleResponse);
    return null;
  }
}
