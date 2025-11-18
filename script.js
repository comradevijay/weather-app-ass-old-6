document.addEventListener('DOMContentLoaded', () => {
  // API Key
  // !! Remember to replace this with your own API key from OpenWeatherMap
  const apiKey = 'd742f0a972e84e4e8c97aa9d51d4901f'; 
  
  // DOM Elements
  const locationEl = document.getElementById('location');
  const weatherEl = document.getElementById('weather');
  const tempEl = document.getElementById('temp');
  const iconEl = document.getElementById('icon');
  const humidityEl = document.getElementById('humidity');
  const windEl = document.getElementById('wind');
  const refreshBtn = document.getElementById('refresh-btn');
  
  // Get the new input element
  const cityInputEl = document.getElementById('city-input');

  function fetchWeather() {
    // Get the city from the input field
    const city = cityInputEl.value.trim();

    // Check if the input is empty
    if (city === '') {
      locationEl.textContent = 'Please enter a city';
      weatherEl.textContent = '';
      tempEl.textContent = '--';
      humidityEl.textContent = '--';
      windEl.textContent = '--';
      iconEl.src = '';
      return; // Stop the function if no city is entered
    }

    // Build the API URL dynamically
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Show loading state while fetching
    locationEl.textContent = 'Loading...';
    weatherEl.textContent = '';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
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
        iconEl.src = '';
      });
  }

  // Event listener for the button (now acts as search)
  refreshBtn.addEventListener('click', fetchWeather);

  // Event listener for pressing "Enter" in the input field
  cityInputEl.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents form submission, if any
      fetchWeather();
    }
  });

  // Set a default city and fetch weather on page load
  cityInputEl.value = 'bengaluru';
  fetchWeather();
});
