import './style/style.scss';

const temp: HTMLDivElement | null = document.querySelector('.weather-temp');
const myLocation: HTMLDivElement | null = document.querySelector('.weather-location');
const weatherDescription: HTMLDivElement | null = document.querySelector('.weather-description');
const weatherIcon: HTMLDivElement | null = document.querySelector('.weather-icon');
const errorContainer: HTMLDivElement | null = document.querySelector('.error-container');
const currentDate = new Date();

async function getWeather(latitude, longitude) {
  const key = 'bf8a6a9e6c78c59cdb9e6c5aa6b2eccc';
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&lang=sv&lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(apiUrl);

  await fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      if (myLocation && temp && weatherDescription && weatherIcon != null) {
        myLocation.innerHTML = `${json.city.name}, ${json.city.country}`;
        temp.innerHTML = `${json.list[0].main.temp}, &#176;<span>C</span>`;
        weatherDescription.innerHTML = `${json.list[0].weather[0].description}`;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="" width="100" height="100" />`;
      }
    })
    .catch((error) => {
      if (errorContainer != null) {
        errorContainer.innerHTML = 'kunde inte hämta data';
      }
      return null;
    });
}
function showPosition(position) {
  const latitude = position.coords;
  const longitude = position.coords;
  getWeather(latitude, longitude);
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
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
