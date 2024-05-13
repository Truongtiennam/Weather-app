import "boxicons";
import React, { useRef } from 'react';
import "../assets/fonts/themify-icons/themify-icons.css";
import errorImg from "../assets/img/404.png";
import clearImg from "../assets/img/clear.png";
import cloudImg from "../assets/img/cloud.png";
import mistImg from "../assets/img/mist.png";
import rainImg from "../assets/img/rain.png";
import snowImg from "../assets/img/snow.png";

function Card(){

    const WeatherType = {
        CLOUDS: "Clouds",
        CLEAR: "Clear",
        RAIN: "Rain",
        SNOW: "Snow",
        MIST: "Mist",
        HAZE: "Haze"
    };


    const inputRef = useRef(null);
    const imgRef = useRef(null);
    const tempRef = useRef(null);
    const descRef = useRef(null);
    const humidRef = useRef(null);
    const windRef = useRef(null);
    const minMaxTempRef = useRef(null);

    const handleSearch = () => {
        
        const inputValue = inputRef.current.value.trim();
        const city = inputValue;
        
        const apiKey = "85317bd8be7361933971284aece17b19";
        
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var temp = Math.round(data.main.temp);
                var minTemp = Math.round(data.main.temp_min);
                var maxTemp = Math.round(data.main.temp_max);
                var desc = data.weather[0].description;
                var humidity = data.main.humidity;
                var wind = data.wind.speed;
                var country = data.sys.country;
                
                switch(data.weather[0].main){
                    case WeatherType.CLOUDS:
                        
                        imgRef.current.src = cloudImg;
                        break;
                    case WeatherType.CLEAR:
                        
                        imgRef.current.src = clearImg;
                        break;
                    case WeatherType.RAIN:
                        
                        imgRef.current.src = rainImg;
                        break;
                    case WeatherType.SNOW:
                        
                        imgRef.current.src = snowImg;
                        break;
                    case WeatherType.MIST, WeatherType.HAZE:
                        
                        imgRef.current.src = mistImg;
                        break;
                }
                               
                inputRef.current.value = `${city}, ${country}`;
                tempRef.current.innerHTML = `${temp} <span>℃</span>`;
                descRef.current.textContent = desc;
                descRef.current.style.color = "black";
                humidRef.current.textContent = `${humidity}%`;
                windRef.current.textContent = `${wind} Km/h`;
                minMaxTempRef.current.innerHTML = `${minTemp} - ${maxTemp} <span>℃</span>`
                minMaxTempRef.current.style.color = "black";
            })
    
            .catch(error => {
                console.error("Fetch Error", error)
                imgRef.current.src = errorImg;
                tempRef.current.innerHTML = `? <span>℃</span>`;
                minMaxTempRef.current.innerHTML = `?!@#$%^&*()`;
                minMaxTempRef.current.style.color = "red";
                descRef.current.textContent = "Invalid Location!!";
                descRef.current.style.color = "red";
                humidRef.current.textContent = `0%`;
                windRef.current.textContent = `0 Km/h`;                
            })
      };


      function Enter(e){
        if(e.key === "Enter"){
            handleSearch();
        }
      }
     

      function Clear(){
        inputRef.current.value = "";
      }

    return(
        <div className="container">
            {/*Search Box  */}
            <div className="search-box">
                <i className="ti-location-pin"></i>
                <input ref={inputRef} type="text" placeholder="Enter Location" onKeyDown={Enter}/>
                <button className="clear" onClick={Clear}><i className="ti-close"></i></button>
                <button className="ti-search btn" onClick={handleSearch} ></button>
            </div>

            {/* Weather Box */}
            <div className="weather-box">
                <div className="box">
                    <div className="info-weather">
                        <div className="weather">
                            <img ref={imgRef} src={errorImg}/>
                            <p className="temp" ref={tempRef}>? <span>℃</span> </p>
                            <p className="min-max-temp" ref={minMaxTempRef} >0 - 0 <span>℃</span> </p>
                            <p className="desc" ref={descRef}>Search a Location</p>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* Details */}
            <div className="weather-details">
                
                {/* Himidity */}
                <div className="humidity">
                    <box-icon name="water" size="lg" className="box-icon"></box-icon>
                    <div className="text">
                        <div className="info-humidity">
                            <span ref={humidRef}>0%</span>
                        </div>
                        <p>Humidity</p>
                    </div>
                </div>

                {/* Wind */}
                <div className="wind">
                <box-icon name="wind" size="lg"></box-icon>
                    <div className="text">
                        <div className="info-wind">
                            <span ref={windRef}>0 Km/h</span>
                        </div>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;
