/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable operator-linebreak */
import './style/style.scss';

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
const findPositionButton = document.querySelector('#get-position');
const currentDate = new Date();
const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc';
const weather = {
  city: '',
  country: '',
  temp: 0,
  feels_like: 0,
  description: '',
  icon: '',
  wind: 0,
  visibility: 0,
};

const backgrounds = {
  winterNightBackground: 'url(background-imgs/winter-night-time.webp)',
  winterDayBackground: 'url(background-imgs/winter-day-time.webp)',
  dayBackground: 'url(background-imgs/day-time.webp)',
  nightBackground: 'url(background-imgs/night-time.webp)',
};

function renderWeather() {
  if (
    myLocation !== null &&
    weatherTemp !== null &&
    weatherInfo !== null &&
    weatherIcon !== null &&
    feelsLike !== null &&
    windContainer !== null &&
    visibilityContainer !== null
  ) {
    myLocation.innerHTML = `${weather.city}, ${weather.country}`;
    weatherTemp.innerHTML = `${weather.temp}&#176;<span> C</span>`;
    feelsLike.innerHTML = `känns som ${weather.feels_like}<span>&#176; C</span>`;
    weatherInfo.innerHTML = weather.description;
    weatherIcon.innerHTML = `<img src="/weather-icons/${weather.icon}.png" loading="lay" alt="${weather.description}" width="100" height="100" />`;
    windContainer.innerHTML = `vind ${weather.wind} m/s`;
    visibilityContainer.innerHTML = `sikt ${weather.visibility} km`;
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
      weather.city = json.city.name;
      weather.country = json.city.country;
      weather.temp = Math.round(json.list[0].main.temp);
      weather.description = json.list[0].weather[0].description;
      weather.feels_like = Math.round(json.list[0].main.feels_like);
      weather.icon = json.list[0].weather[0].icon;
      weather.wind = Math.round(json.list[0].wind.speed);
      weather.visibility = Math.round(json.list[0].visibility / 1000);
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
      document.body.style.backgroundImage = backgrounds.winterNightBackground;
    } else {
      document.body.style.backgroundImage = backgrounds.nightBackground;
    }
  } else if (currentDate.getMonth() < 9 || currentDate.getMonth() > 3) {
    document.body.style.backgroundImage = backgrounds.winterDayBackground;
  } else {
    document.body.style.backgroundImage = backgrounds.dayBackground;
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
