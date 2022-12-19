/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import './style/style.scss';

const weatherTemp = document.querySelector('.temperature-value p');
const myLocation = document.querySelector('.location p');
const weatherInfo = document.querySelector('.description p');
const weatherIcon = document.querySelector('.icon');
const errorContainer = document.querySelector('.error p');
const windContainer = document.querySelector('.wind p');
const feelsLike = document.querySelector('.feels-like p');
const localTimeContainer = document.querySelector('.local-time p');
const dateContainer = document.querySelector('.date p');
const winterNightBackground = 'url(background-imgs/winter-night-time.webp)';
const winterDayBackground = 'url(background-imgs/winter-day-time.webp)';
const dayBackground = 'url(background-imgs/day-time.webp)';
const nightBackground = 'url(background-imgs/night-time.webp)';
const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc';
const currentDate = new Date();

async function getWeather(position: GeolocationPosition) {
  const { latitude, longitude }: GeolocationCoordinates = position.coords;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&lang=sv&lat=${latitude}&lon=${longitude}&appid=${key}`;

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      if (myLocation != null && weatherTemp != null && weatherInfo != null && weatherIcon != null && feelsLike != null && windContainer != null) {
        myLocation.innerHTML = `${json.city.name}, ${json.city.country}`;
        weatherTemp.innerHTML = `${Math.round(json.list[0].main.temp)}&#176;<span> C</span>`;
        feelsLike.innerHTML = `känns som ${Math.round(json.list[0].main.feels_like)}<span>&#176; C</span>`;
        weatherInfo.innerHTML = json.list[0].weather[0].description;
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="" width="50" height="50" />`;
        windContainer.innerHTML = `vind ${Math.round(json.list[0].wind.speed)} m/s`;
      }
    })
    .catch(() => {
      if (errorContainer != null) {
        errorContainer.innerHTML = 'kunde inte hämta data';
      }
    });
}

function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else if (errorContainer != null) {
    errorContainer.innerHTML = 'kunde inte hämta  data';
  }
}

function checkDaytime() {
  if (localTimeContainer != null && dateContainer != null) {
    dateContainer.innerHTML = currentDate.toLocaleDateString();
    localTimeContainer.innerHTML = currentDate.toLocaleTimeString(
      navigator.language,
      {
        hour: '2-digit', minute: '2-digit',
      },
    );
  }
  if (currentDate.getHours() < 7 || currentDate.getHours() > 18) {
    if (currentDate.getMonth() > 9 || currentDate.getMonth() < 3) {
      document.body.style.backgroundImage = winterNightBackground;
    } else {
      document.body.style.backgroundImage = nightBackground;
    }
  } else if (currentDate.getMonth() < 9 || currentDate.getMonth() > 3) {
    document.body.style.backgroundImage = winterDayBackground;
  } else {
    document.body.style.backgroundImage = dayBackground;
  }
}
checkDaytime();
getLocation();
