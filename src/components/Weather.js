// AIzaSyDOVVgqd0rKhGPxcK4au4p-W677Hat_I5o
import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "c22ce065389c72bd5b96f9748dc2d3d9";
  
  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Please enter City name");
    } else {
      let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch(err=>{
          console.log('error');
        });

      setWeather({data});
    }
  }

  const handleChangeCity = (e) => {
    const value = e.target.value;
      setForm({
        city: value,
        country: form.country
      });
  };
  const handleChangeCountry=(e)=>{
    const value = e.target.value;
    setForm({
      city: form.city,
      country: value
    });
  };
  

  return (
    <div className="weather">
      <div className="title">Weather App</div>
      <form>
        <input
          type="text"
          placeholder="City"
          onChange={handleChangeCity} style={{margin: "0 30px"}}
          id="cityInput"
        />

        <input
          type="text"
          placeholder="Country"
          onChange={handleChangeCountry}
        />
        <button className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>

        {(weather.data !== undefined && weather.data.cod!== "404") ? (
          <div>
            <DisplayWeather data={weather.data} />
          </div>
        ) : null}

    </div>
  );
}

export default Weather;
