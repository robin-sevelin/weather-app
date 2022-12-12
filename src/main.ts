import './style/style.scss';

/*
fetch(API_URL)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((json) => {
    console.log('Aktuell temperatur:', json.value[0].value, 'grader');
    console.log('Resterande data:');
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });
*/

const tempElement: HTMLDivElement | null = document.querySelector('.weather-temp');
const myPosition: HTMLDivElement | null = document.querySelector('.my_position');
const appElement: HTMLDivElement | null = document.querySelector('.app');
const url = 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/99280/period/latest-hour/data.json';

const findMyPosition = () => {
  if (myPosition != null) {
    const success = (position) => {
      console.log(position);
    };
    const error = () => {
      console.log('error, could not find position');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

function handleData() {
  const dataResponse = {
    value: [
      {
        date: 1670587200000,
        value: '-0.6',
        quality: 'G',
      },
    ],
    updated: 1670587200000,
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
      from: 1670583601000,
      to: 1670587200000,
      summary: 'Data från senaste timmen',
      sampling: 'Ej angivet',
    },
    position: [
      {
        from: 1275350400000,
        to: 1670587200000,
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
  console.log(`${dataResponse.value[0].value} grader celsius`);
}

handleData();
findMyPosition();
