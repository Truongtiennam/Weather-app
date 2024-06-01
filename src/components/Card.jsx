import "boxicons";
import React, { useRef } from 'react';
import "../assets/fonts/themify-icons/themify-icons.css";
import errorImg from "../assets/img/404.png";
import clearImg from "../assets/img/clear.png";
import cloudImg from "../assets/img/cloud.png";
import mistImg from "../assets/img/mist.png";
import rainImg from "../assets/img/rain.png";
import snowImg from "../assets/img/snow.png";


const weatherImages = {
    Clouds: cloudImg,
    Clear: clearImg,
    Rain: rainImg,
    Snow: snowImg,
    Mist: mistImg,
    Haze: mistImg,
};


function Card(){

    const inputRef = useRef(null);
    const imgRef = useRef(null);
    const tempRef = useRef(null);
    const descRef = useRef(null);
    const humidRef = useRef(null);
    const windRef = useRef(null);
    const minMaxTempRef = useRef(null);

    const handleSearch = () => {
        
        const city = inputRef.current.value.trim();

        const apiKEY = import.meta.env.VITE_API_KEY;
        const apiURL = `${import.meta.env.VITE_API_URL}?q=${city}&units=metric&appid=${apiKEY}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const temp = Math.round(data.main.temp);
                const minTemp = Math.round(data.main.temp_min);
                const maxTemp = Math.round(data.main.temp_max);
                const desc = data.weather[0].description;
                const humidity = data.main.humidity;
                const wind = data.wind.speed;
                const country = data.sys.country;
                const weatherType = data.weather[0].main;
                
                imgRef.current.src = weatherImages[weatherType] || errorImg;               
                inputRef.current.value = city
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
