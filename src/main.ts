/* eslint-disable max-len */
import './style/style.scss';

const appElement = document.querySelector('.app');
const weatherTempElement: number = document.querySelector('.weather-temp');
const iconElement = document.querySelector('.weather-icon');
const weatherInfoElement: string = document.querySelector('.weather-info');
const myPositionElement: string = document.querySelector('.my-position');

const dataRespone = {
  value: [
    {
      date: 1670403600000,
      value: '1.6',
      quality: 'G',
    },
  ],
  updated: 1670403600000,
  parameter: {
    key: '1',
    name: 'Lufttemperatur',
    summary: 'momentanvärde, 1 gång/tim',
    unit: 'degree celsius',
  },
  station: {
    key: '99280',
    name: 'Svenska Högarna A',
    owner: 'SMHI',
    ownerCategory: 'CLIMATE',
    measuringStations: 'CORE',
    height: 2,
  },
  period: {
    key: 'latest-hour',
    from: 1670400001000,
    to: 1670403600000,
    summary: 'Data från senaste timmen',
    sampling: 'Ej angivet',
  },
  position: [
    {
      from: 1275350400000,
      to: 1670403600000,
      height: 11.811,
      latitude: 59.4423,
      longitude: 19.5022,
    },
  ],
  link: [
    {
      rel: 'data',
      type: 'application/json',
      href: 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour/data.json',
    },
    {
      rel: 'data',
      type: 'application/xml',
      href: 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour/data.xml',
    },
    {
      rel: 'data',
      type: 'text/plain',
      href: 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour/data.csv',
    },
    {
      rel: 'period',
      type: 'application/atom+xml',
      href: 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour.atom',
    },
    {
      rel: 'iso19139',
      type: 'application/vnd.iso.19139+xml',
      href: 'https://opendata-catalog.smhi.se/md/25080190-38ba-4279-a65d-d9ef8d0bf949',
    },
    {
      rel: 'iso19139',
      type: 'application/vnd.iso.19139+xml',
      href: 'https://opendata-catalog.smhi.se/md/c6ae10b6-6a18-4e15-9444-fbd746f4609d',
    },
  ],
};

const url =
  'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour/data.json';
function handleData(json) {}
handleData(dataRespone);
/*
fetch(url)
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(json => {
    console.log('Aktuell temperatur:', json.value[0].value, 'grader');
    console.log('Resterande data:');
    console.log(json);
  })
  .catch(err => {
    console.error(err);   });
  */
