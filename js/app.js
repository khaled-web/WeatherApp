 class AjaxWeather {
  constructor() {
   this.apiKey = 'fafe2292a9cd85d6a3780896281673c8';
  }

  async getWeather(city) {
   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;

   const weatherData = await fetch(url);
   const weather = await weatherData.json();
   return weather;
  }

 }



 (function () {

  const form = document.getElementById('weatherForm');
  const cityInput = document.getElementById('cityInput');
  const feedback = document.querySelector('.feedback');

  // class
  const ajax = new AjaxWeather();
  form.addEventListener('submit', (e) => {
   e.preventDefault();
   const city = cityInput.value;

   if (city.length === 0) {
    showFeedback('city value can not be empty.');
   } else {
    ajax.getWeather(city).then(data => console.log(data))
   }

  });

  function showFeedback(text) {
   feedback.classList.add('showItem');
   feedback.innerHTML = `<p>${text}</p>`;

   setTimeout(() => {
    feedback.classList.remove('showItem');
   }, 3000)
  }

 })();