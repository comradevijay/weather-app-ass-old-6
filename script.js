document.addEventListener('DOMContentLoaded', () => {
  // API Key and URL
  const apiKey = 'd742f0a972e84e4e8c97aa9d51d4901f'; // Your OpenWeatherMap API key
  const city = 'bengaluru';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // DOM Elements
  const locationEl = document.getElementById('location');
  const weatherEl = document.getElementById('weather');
  const tempEl = document.getElementById('temp');
  const iconEl = document.getElementById('icon');
  const humidityEl = document.getElementById('humidity');
  const windEl = document.getElementById('wind');
  const refreshBtn = document.getElementById('refresh-btn');

  function fetchWeather() {
    // Show loading state while fetching
    locationEl.textContent = 'Loading...';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the DOM with the fetched data
        locationEl.textContent = data.name;
        weatherEl.textContent = data.weather[0].description;
        tempEl.textContent = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        humidityEl.textContent = data.main.humidity;
        windEl.textContent = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        locationEl.textContent = 'City not found';
        weatherEl.textContent = '';
        tempEl.textContent = '--';
        humidityEl.textContent = '--';
        windEl.textContent = '--';
      });
  }

  refreshBtn.addEventListener('click', fetchWeather);

  fetchWeather();
});