/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import './style/style.scss';

const weatherTemp: HTMLDivElement | null = document.querySelector('.temperature-value p'); // containers för sidan
const myLocation: HTMLDivElement | null = document.querySelector('.location p');
const weatherInfo: HTMLDivElement | null = document.querySelector('.description p');
const weatherIcon: HTMLDivElement | null = document.querySelector('.icon');
const errorContainer: HTMLDivElement | null = document.querySelector('.error p');
const windContainer: HTMLDivElement | null = document.querySelector('.wind p');
const feelsLike: HTMLDivElement | null = document.querySelector('.feels-like p');
const localTimeContainer: HTMLDivElement | null = document.querySelector('.local-time p');
const dateContainer: HTMLDivElement | null = document.querySelector('.date p');
const findPositionButton: HTMLButtonElement | null = document.querySelector('#get-position'); // hitta positions knapp
const winterNightBackground = 'url(background-imgs/winter-night-time.webp)'; // bakgrundsbilder
const winterDayBackground = 'url(background-imgs/winter-day-time.webp)';
const dayBackground = 'url(background-imgs/day-time.webp)';
const nightBackground = 'url(background-imgs/night-time.webp)';
const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc'; // api nyckel
const currentDate = new Date(); // datum variabel

// funktion för att hämta och rendera väder data till sina containers
async function getWeather(position: GeolocationPosition) {
  const { latitude, longitude }: GeolocationCoordinates = position.coords;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&lang=sv&lat=${latitude}&lon=${longitude}&appid=${key}`;

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      if (
        myLocation !== null &&
        weatherTemp !== null &&
        weatherInfo !== null &&
        weatherIcon !== null &&
        feelsLike !== null &&
        windContainer !== null
      ) {
        myLocation.innerHTML = `${json.city.name}, ${json.city.country}`;
        weatherTemp.innerHTML = `${Math.round(json.list[0].main.temp)}&#176;<span> C</span>`;
        feelsLike.innerHTML = `känns som ${Math.round(json.list[0].main.feels_like)}<span>&#176; C</span>`;
        weatherInfo.innerHTML = json.list[0].weather[0].description;
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="${json.list[0].weather[0].description}" width="100" height="100" />`;
        windContainer.innerHTML = `vind ${Math.round(json.list[0].wind.speed)} m/s`;
      }
    })
    .catch((error) => {
      if (errorContainer !== null) {
        console.error(error);
        errorContainer.style.display = 'block';
        errorContainer.innerHTML = 'kunde inte hämta data';
      }
    });
}

function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else if (errorContainer !== null) {
    console.error('kunde inte hämta  data');
    errorContainer.style.display = 'block';
    errorContainer.innerHTML = 'kunde inte hämta position';
  }
}

if (findPositionButton !== null) {
  findPositionButton.addEventListener('click', getLocation);
}

function renderBackground() {
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
