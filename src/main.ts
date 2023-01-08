/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable operator-linebreak */
import './style/style.scss';
import weather from './weather';

const currentDate = new Date();
const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc';
const errorContainer = document.querySelector('.error-container') as HTMLElement;
const weatherTemp = document.querySelector('.temperature-value p');
const myLocation = document.querySelector('.location p');
const weatherInfo = document.querySelector('.description p');
const weatherIcon = document.querySelector('.icon');
const windContainer = document.querySelector('.wind p');
const feelsLike = document.querySelector('.feels-like p');
const localTimeContainer = document.querySelector('.local-time p');
const dateContainer = document.querySelector('.date p');
const visibilityContainer = document.querySelector('.visibility');
const forecastThreeHour = document.querySelector('.three-hour');
const forecastSixHour = document.querySelector('.six-hour');
const forecastNineHour = document.querySelector('.nine-hour');
const findPositionButton = document.querySelector('#get-position');

function renderWeather() {
  if (
    myLocation !== null &&
    weatherTemp !== null &&
    weatherInfo !== null &&
    weatherIcon !== null &&
    feelsLike !== null &&
    windContainer !== null &&
    visibilityContainer !== null &&
    forecastThreeHour !== null &&
    forecastSixHour !== null &&
    forecastNineHour !== null
  ) {
    myLocation.innerHTML = `${weather.current.city}, ${weather.current.country}`;
    weatherTemp.innerHTML = `${weather.current.temp}&#176;<span> C</span>`;
    feelsLike.innerHTML = `känns som ${weather.current.feels_like}<span>&#176; C</span>`;
    weatherInfo.innerHTML = weather.current.description;
    weatherIcon.innerHTML = `<img src="./weather-icons/${weather.current.icon}.png" loading="lay" alt="${weather.current.description}" width="100" height="100" />`;
    windContainer.innerHTML = `vind ${weather.current.wind} m/s`;
    visibilityContainer.innerHTML = `sikt ${weather.current.visibility} km`;
    forecastThreeHour.innerHTML = `<p>${weather.forecast.threeHour.time}</p>
    <img src="./weather-icons/${weather.forecast.threeHour.icon}.png" loading="lazy" alt="${weather.forecast.threeHour.description}" width="30" height="30" />
    <p>${weather.forecast.threeHour.temp}&#176;<span> C</span></p>`;
    forecastSixHour.innerHTML = `<p>${weather.forecast.sixHour.time}</p>
    <img src="./weather-icons/${weather.forecast.sixHour.icon}.png" loading="lazy" alt="${weather.forecast.sixHour.description}" width="30" height="30" />
    <p>${weather.forecast.sixHour.temp}&#176;<span> C</span></p>`;
    forecastNineHour.innerHTML = `<p>${weather.forecast.nineHour.time}</p>
    <img src="./weather-icons/${weather.forecast.nineHour.icon}.png" loading="lazy" alt="${weather.forecast.threeHour.description}" width="30" height="30" />
    <p>${weather.forecast.nineHour.temp}&#176;<span> C</span></p>`;
  }
}

function showError() {
  if (errorContainer !== null) {
    errorContainer.style.display = 'block';
    errorContainer.innerHTML = '"lyckades inte hämta data"';
  }
}

async function getWeather(position: GeolocationPosition) {
  const { latitude, longitude }: GeolocationCoordinates = position.coords;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&lang=sv&lat=${latitude}&lon=${longitude}&appid=${key}`;

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      weather.current.city = json.city.name;
      weather.current.country = json.city.country;
      weather.current.temp = Math.round(json.list[0].main.temp);
      weather.current.description = json.list[0].weather[0].description;
      weather.current.feels_like = Math.round(json.list[0].main.feels_like);
      weather.current.icon = json.list[0].weather[0].icon;
      weather.current.wind = Math.round(json.list[0].wind.speed);
      weather.current.visibility = json.list[0].visibility / 1000;

      weather.forecast.threeHour.time = new Date(json.list[0].dt * 1000).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
      weather.forecast.threeHour.temp = Math.round(json.list[1].main.temp);
      weather.forecast.threeHour.description = json.list[1].weather[0].description;
      weather.forecast.threeHour.icon = json.list[1].weather[0].icon;
      weather.forecast.sixHour.time = new Date(json.list[1].dt * 1000).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
      weather.forecast.sixHour.temp = Math.round(json.list[2].main.temp);
      weather.forecast.threeHour.description = json.list[2].weather[0].description;
      weather.forecast.sixHour.icon = json.list[2].weather[0].icon;
      weather.forecast.nineHour.time = new Date(json.list[2].dt * 1000).toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
      weather.forecast.nineHour.temp = Math.round(json.list[3].main.temp);
      weather.forecast.threeHour.description = json.list[3].weather[0].description;
      weather.forecast.nineHour.icon = json.list[3].weather[0].icon;
      renderWeather();
    })
    .catch(showError);
}

function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  }
}

if (findPositionButton !== null) {
  findPositionButton.addEventListener('click', getLocation);
}

function renderBackground() {
  if (currentDate.getHours() < 7 || currentDate.getHours() > 17) {
    if (currentDate.getMonth() > 9 || currentDate.getMonth() < 3) {
      document.body.style.backgroundImage = weather.backgrounds.winterNightBackground;
    } else {
      document.body.style.backgroundImage = weather.backgrounds.nightBackground;
    }
  } else if (currentDate.getMonth() < 9 || currentDate.getMonth() > 3) {
    document.body.style.backgroundImage = weather.backgrounds.winterDayBackground;
  } else {
    document.body.style.backgroundImage = weather.backgrounds.dayBackground;
  }
}

function checkDaytime() {
  if (localTimeContainer != null && dateContainer != null) {
    dateContainer.innerHTML = currentDate.toLocaleDateString();
    localTimeContainer.innerHTML = currentDate.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  renderBackground();
}

checkDaytime();
