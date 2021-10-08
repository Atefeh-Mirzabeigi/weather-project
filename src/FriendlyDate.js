import React from "react";

export default function FriendlyDate(props) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednsday",
    "Thrsday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[props.date.getDay()];
  let minutes = props.date.getMinutes();
  let hours = props.date.getHours();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  return (
    <div className="friendlyDate">
      <p className="my-2">
        {day} {hours}:{minutes}
      </p>
      {/* <p>Wednsday 12:00</p> */}
    </div>
  );
}
