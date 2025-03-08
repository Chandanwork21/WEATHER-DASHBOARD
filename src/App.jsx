import React, { useEffect, useRef, useState } from "react";
import SearchSection from "./components/SearchSection";
import WeatherSection from "./components/WeatherSection";
import HourlyForecast from "./components/HourlyForecast";
import NoResults from "./components/NoResults";
import { weatherCodes } from "./constants";
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({}); // managing current weather and setting weather according to cities 
  const [hourlyForecasts, setHourlyForecasts] = useState([]); // hourly forecast of the weather setting it 
  const searchInputRef = useRef(null);  // this reference to an input element and by default is null.
  const [hasNoResults, setHasNoResults] = useState(false); // this will manage if there is no result or wrong input . by default is false.
  const [background, setBackground] = useState("");   // this is used to set the app background and sets according to temperature.

  const API_KEY = import.meta.env.VITE_API_KEY; // storing  API key into a variable.

  // filtering the forecast which gives the 24 hour forecast of a particular city.
  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecasts(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.focus(); //If the window width is 768px or more, then focus on the search input field.
    //Exception handling in try-catch block
    // if data like location are there then try will execute
    try { 
      // fetching the api and convverting into json format
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)

      // retrieving the temperature, windspeed , humidity and description from the api response.
      const temperature = Math.floor(data.current.temp_c);
      const windSpeed = data.current.wind_kph;
      const humidity = data.current.humidity;
      const description = data.current.condition.text;
      // setting weather icons with current weather by find and includes method on object
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({ temperature, description, weatherIcon, windSpeed, humidity }); // this sets the current weather.

      //combining hourly data
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]; 
      searchInputRef.current.value = data.location.name; // current location in search input.
      filterHourlyForecast(combinedHourlyData); // filtering the combined hourly data.
    } catch {
      setHasNoResults(true); // if data is unavailable.
    }
  };

  // sidely calling an api with useEffect hook. ther will be no delay.
  useEffect(() => {
    const defaultCity = "Mumbai";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, []);

  // changing background according to the current weather. 
  useEffect(() => {
    if (currentWeather.temperature !== undefined) {
      if (currentWeather.temperature <= 0) {
        setBackground("url('/images/snowWeather.jpeg')"); // sets background snow image when temperature is below and equal to zero
      } else if (currentWeather.temperature > 0 && currentWeather.temperature <= 15) {
        setBackground("url('/images/coldWeather.jpeg')"); // sets background cold image when temperature is equal to zero and less than 15.
      } else if (currentWeather.temperature > 15 && currentWeather.temperature <= 25) {
        setBackground("url('/images/pleasantWeather.jpeg')"); // sets background pleasant image when temperature is greater than 15 and less than equal to 25.
      } else if (currentWeather.temperature > 25 && currentWeather.temperature <= 35) {
        setBackground("url('/images/warmWeather.jpeg')"); // sets background warm weather image when trmperature is greater than 25 and less than equal to 35.
      } else {
        setBackground("url('/images/weather.jpg')"); // this is default background image
      }
    }
  }, [currentWeather.temperature]);

  // getting and styling the background image  i.e cover,center and transitions
  useEffect(() => {
    document.body.style.backgroundImage = background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background 0.5s ease-in-out";
  }, [background]);

  return (
    // This div contains all the components
    <div className="container" > 
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} /> {/*getweatherdetails is passed to search component  */}
      {hasNoResults ? (
        <NoResults />
      ) : (
        <div className="weather-section">
          <WeatherSection currentWeather={currentWeather} /> {/*currentWeather is passed to weather component*/}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((hourlyWeather) => (
                <HourlyForecast key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} /> // hourlyweather is passed to forecast component also the current time is extracted from api
              ))}
            </ul>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
};

export default App;
