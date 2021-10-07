import React from "react";
import "./weather.css";

export default function AdditionalInfo(props) {
  return (
    <div className="AditionalInfo">
      <div className="additional-info text-center my-4">
        <h5 className="my-3">Climate Information</h5>
        <ul className="d-flex justify-content-center">
          <li>
            <h6>Humidity</h6>
            <p>{props.data.humidity}%</p>
          </li>
          <li>
            <h6>Wind Speed</h6>
            <p>{Math.round(props.data.wind)} Km/h</p>
          </li>
          <li>
            <h6>Feels like</h6>
            <p>{Math.round(props.data.feels_like)} °C</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
