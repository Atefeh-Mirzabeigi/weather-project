import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <Weather defaultCity="London" defaultLon={-0.1257} defaultLat={51.5085} />
      <div className="footer">
        It's an{" "}
        <a href="https://github.com/Atefeh-Mirzabeigi/weather-app">
          Open-Source
        </a>{" "}
        project coded by Atefeh Mirzabeigi.
      </div>
    </div>
  );
}

export default App;
