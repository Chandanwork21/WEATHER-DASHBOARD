import React from 'react'

const WeatherSection = ({currentWeather}) => {
  return (
    <>
    {/* this component retrieves the current weather and displays it. */}
          <div className="current-weather">
            <img src={`icons/${currentWeather.weatherIcon}.svg`} alt="" className="weather-icon" />
            <h2 className="temperature">{currentWeather.temperature}<span>&#8451;</span></h2>
            <p className="description">{currentWeather.description}</p> <hr/>
            <div className="windsss">
              <div className="wind">
              <img src={"icons/wind.png"} alt="wind" className="wind-icon" />
              <h2 className="windspeed">{currentWeather.windSpeed}<span> kph</span></h2>
              <p className="wind-para">Wind Speed</p>
              </div>
              <div className="humidity">
              <img src={"icons/humidity.png"} alt="wind" className="humidity-icon" />
              <h2 className="windspeed">{currentWeather.humidity}</h2>
              <p className="wind">Humidity</p>
              </div>
            </div>
          </div> 
          <h3 style={{"color":"white"}}>Hourly Forecast</h3>
    </>
  )
}

export default WeatherSection