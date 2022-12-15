/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import './style/style.scss';

const temp: HTMLDivElement | null = document.querySelector('.weather-temp');
const myLocation: HTMLDivElement | null = document.querySelector('.weather-location');
const weatherDescription: HTMLDivElement | null = document.querySelector('.weather-description');
const weatherIcon: HTMLDivElement | null = document.querySelector('.weather-icon');
const errorContainer: HTMLDivElement | null = document.querySelector('.error-container');
const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc';
const currentDate = new Date();

function getWeather(position: GeolocationPosition) {
  const { latitude, longitude }: GeolocationCoordinates = position.coords;
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&lang=sv&lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(latitude);
  console.log(longitude);
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (myLocation != null && temp != null && weatherDescription != null && weatherIcon != null) {
        console.log('hej');
        myLocation.innerHTML = `${json.city.name}, ${json.city.country}`;
        temp.innerHTML = `${json.list[0].main.temp}, &#176;<span>C</span>`;
        weatherDescription.innerHTML = `${json.list[0].weather[0].description}`;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="" width="100" height="100" />`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else if (errorContainer != null) {
    errorContainer.innerHTML = 'kunde inte hämta din position';
  }
}

function checkDaytime() {
  if (currentDate.getHours() < 7 || currentDate.getHours() > 20) {
    if (currentDate.getMonth() > 9 || currentDate.getMonth() < 3) {
      document.body.style.backgroundImage = 'url(background_imgs/winter-night-time.jpg)';
    } else {
      document.body.style.backgroundImage = 'url(background_imgs/night-time.jpg)';
    }
  } else if (currentDate.getMonth() < 9 || currentDate.getMonth() > 3) {
    document.body.style.backgroundImage = 'url(background_imgs/winter-day-time.jpg)';
  } else {
    document.body.style.backgroundImage = 'url(background_imgs/day-time.jpg)';
  }
}

checkDaytime();
getLocation();
