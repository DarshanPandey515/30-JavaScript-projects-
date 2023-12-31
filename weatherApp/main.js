
const apiKey = 'f30413627eacc4e24afdb290c76ebc96';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBtn = document.querySelector('#searchBtn');
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
    const apiResponse = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await apiResponse.json()

    if (data.cod == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.weather').style.display = 'block';


        document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
        document.querySelector('.wind').innerHTML = `${data.wind.speed} km/hr`;
        document.querySelector('.temp').innerHTML = `${Math.floor(data.main.temp)}&deg;C`;
        document.querySelector('.city').innerHTML = `${data.name}`;

        setWeatherIcon(data.weather[0].main)
    }
}

function setWeatherIcon(weatherCondition) {
    const iconMapping = {
        'Clear': 'clear.png',
        'Clouds': 'clouds.png',
        'Drizzle': 'drizzle.png',
        'Humidity': 'humidity.png',
        'Mist': 'mist.png',
        'Rain': 'rain.png',
        'Snow': 'snow.png',
        'Wind': 'wind.png'
    };

    const icon = iconMapping[weatherCondition];
    weatherIcon.src = `/images/${icon}`;
}


searchBtn.addEventListener('click', () => {
    const cityName = document.querySelector('.search input');
    checkWeather(cityName.value);
})

