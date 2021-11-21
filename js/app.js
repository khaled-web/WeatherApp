 class AjaxWeather {
  constructor() {
   this.apiKey = 'fafe2292a9cd85d6a3780896281673c8';
  }

  async getWeather(city) {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
   const weatherData = await fetch(url);
   const weather = await weatherData.json();
   return weather;
  }

 }

 class Display {
  constructor() {
   this.results = document.querySelector('.results');
   this.cityName = document.getElementById('cityName');
   this.cityCountry = document.getElementById('cityCountry');

   this.cityTemp = document.getElementById('cityTemp');
   this.cityHumidity = document.getElementById('cityHumidity');
   this.cityIcon = document.getElementById('cityIcon');
   this.cityInput = document.getElementById('cityInput');
  }

  showWeather(data) {
   const {
    name,
    sys: {
     country
    },
    main: {
     temp,
     humidity
    }
   } = data;
   const {
    icon
   } = data.weather[0];

   this.results.classList.add('showItem');
   this.cityName.textContent = name;
   this.cityCountry.textContent = country;
   this.cityTemp.textContent = temp;
   this.cityHumidity.textContent = humidity;
   this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
   this.cityInput.value = '';
  }

 }



 (function () {

  const form = document.getElementById('weatherForm');
  const cityInput = document.getElementById('cityInput');
  const feedback = document.querySelector('.feedback');

  // class
  const ajax = new AjaxWeather();
  const display = new Display();
  form.addEventListener('submit', (e) => {
   e.preventDefault();
   const city = cityInput.value;

   if (city.length === 0) {
    showFeedback('city value can not be empty.');
   } else {
    ajax.getWeather(city).then(data => {
     if (data.message === 'city not found') {
      showFeedback('city with such name cannot be found');
     } else {
      display.showWeather(data);
     }
    })
   }

  });

  function showFeedback(text) {
   feedback.classList.add('showItem');
   feedback.innerHTML = `<p>${text}</p>`;

   setTimeout(() => {
    feedback.classList.remove('showItem');
   }, 3000);
  }

 })();