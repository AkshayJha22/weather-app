import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [cityLabel, setcityLabel] = useState('')

  const SearchLocation = (event) => {

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=%${location}&limit=1&appid=cc07ab9b57a504cff72992190bc2bc4e`

    if (event.key === 'Enter') {
      axios.get(url).then((Response) => {
        if (Response.data.length > 0) {
          const {lat,lon} = Response.data[0];
          const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cc07ab9b57a504cff72992190bc2bc4e`

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
            {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}

      </div>
    </div>
  );
}

export default App;
