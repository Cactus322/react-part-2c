export const Weather = ({capital, weather, geo}) => {
    const GetWeather = () => {
        if (weather && geo.length === 1) {
            return (
                <div>
                    <h3>Weather in {capital}</h3>
                    <p>temperature {Math.floor(weather.data.main.temp - 273.15)} Celcius</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.data.weather.map(iconId => iconId.icon)}@2x.png`} alt="weather-icon"/>
                    <p>widn {weather.data.wind.speed} m/s</p>
                </div>
            )
        } else {
            return null
        }
    }

    return (
       <GetWeather />
    )
}