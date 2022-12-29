const weather = {
  current: {
    city: '',
    country: '',
    temp: 0,
    feels_like: 0,
    description: '',
    icon: '',
    wind: 0,
    visibility: 0,
  },

  forecast: {
    threeHour: {
      time: '',
      description: '',
      temp: 0,
      icon: '',
    },
    sixHour: {
      time: '',
      description: '',
      temp: 0,
      icon: '',
    },
    nineHour: {
      time: '',
      description: '',
      temp: 0,
      icon: '',
    },
  },
  backgrounds: {
    winterNightBackground: 'url(background-imgs/winter-night-time.webp)',
    winterDayBackground: 'url(background-imgs/winter-day-time.webp)',
    dayBackground: 'url(background-imgs/day-time.webp)',
    nightBackground: 'url(background-imgs/night-time.webp)',
  },
};

export default weather;
