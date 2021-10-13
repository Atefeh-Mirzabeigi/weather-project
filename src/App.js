import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <Weather defaultCity="London" />
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
