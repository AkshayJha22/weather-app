import React, {useState} from "react";
import axios from "axios";

// OpenWeatherMap API key, read from .env at build time (see README). Never commit the key itself.
const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [cityLabel, setcityLabel] = useState('')

  const SearchLocation = (event) => {

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`

    if (event.key === 'Enter') {
      if (!API_KEY) {
        console.error('REACT_APP_OPENWEATHER_KEY is not set: copy .env.example to .env and add your key')
        return
      }
      axios.get(url).then((Response) => {
        if (Response.data.length > 0) {
          const {lat,lon} = Response.data[0];
          const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

          axios.get(weatherurl).then(weatherResponse => {
            setData(weatherResponse.data)
            setcityLabel(location)
            console.log(weatherResponse.data)
          });
        } else {
          console.log('Location Not Found')
        }
    });

    setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        className="input"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={SearchLocation}
        placeholder="Enter Location"
        type="text"></input>
      </div>

      <div className="container">
        <div className="top">

          <div className="location">
            <p>{cityLabel}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

        </div>

        {data.name !== undefined && 
        
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>

          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>

          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} m/s</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}

      </div>
    </div>
  );
}

export default App;
