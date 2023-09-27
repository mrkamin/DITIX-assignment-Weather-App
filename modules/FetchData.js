import {
    API_KEY,
    BASE_URL,
    DAILY_API_KEY,
    DAILY_BASE_URL,
  } from "./Api.js";
  
  import {
    dailyForcostContainer,
    currentForcastContainer,
    cityName,
    weatherCondation,
    temp,
    icon,
  } from "./varaibles.js";
  
  async function FetchData(location, unit) {
    try {
      const rescurrent = await fetch(
        `${BASE_URL + location}&appid=${API_KEY}&units=${unit}`
      );
  
      if (!rescurrent.ok) {
        throw new Error(`HTTP errro! Status: ${rescurrent.status}`);
      }
  
      const currentData = await rescurrent.json();
      console.log(currentData);
      currentForcastContainer.innerHTML = "";
  
      cityName.textContent = currentData.city.name;
      weatherCondation.textContent = currentData.list[0].weather[0].description;
      temp.innerHTML = currentData.list[0].main.temp.toFixed(0) + "&deg;C";
      const iconCode = currentData.list[0].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
      icon.innerHTML = `<img id="hero-icon" src="${iconUrl}" alt="Weather Icon">`;
  
      // Create an array to store hourly weather data
      const hourlyForecast = currentData.list.map((hourlyData) => ({
        hour: new Date(hourlyData.dt * 1000).getHours(),
        date: new Date(hourlyData.dt * 1000).toLocaleDateString(),
        temperature: hourlyData.main.temp.toFixed(0),
        iconUrl: `https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`,
      }));
  
      // eslint-disable-next-line
      const swiper = new Swiper(".swiper-container", {
        slidesPerView: "5",
        spaceBetween: 0,
      });
  
      // Populate the slider with hourly weather data
  
      hourlyForecast.forEach((hourlyData) => {
        const hourlySlide = document.createElement("div");
        hourlySlide.classList.add("swiper-slide");
  
        const htmlContent = `
            <div class="hourly-data">
              <p class="color-secondary">${hourlyData.hour}:00</p>
              <img src="${hourlyData.iconUrl}" alt="Weather Icon">
              <p class="font-size">${hourlyData.temperature}°C</p>
            </div>
          `;
        hourlySlide.innerHTML = htmlContent;
        currentForcastContainer.appendChild(hourlySlide);
      });
  
      const resdaily = await fetch(
        `${DAILY_BASE_URL + location}&key=${DAILY_API_KEY}&units=${unit}`
      );
  
      if (!resdaily.ok) {
        throw new Error(`HTTP errro! Status: ${resdaily.status}`);
      }
  
      const dailyData = await resdaily.json();
      console.log(dailyData);
      dailyForcostContainer.innerHTML = "";
  
      const dailyForecastData = dailyData.data;
      console.log(dailyForecastData);
  
      dailyForecastData.forEach((dailyData) => {
        const dailyContainer = document.createElement("div");
        dailyContainer.classList.add("daily-forecast-container");
  
        const dayOfWeek = new Date(dailyData.datetime).toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        );
        const iconCode = dailyData.weather.icon;
        const { description } = dailyData.weather;
        const maxTemp = dailyData.max_temp;
        const minTemp = dailyData.min_temp;
  
        const htmlContent = `
            <p class="day color-secondary">${dayOfWeek}</p>
              <div class="icon-desc">
                <div class="icon"><img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png" alt=" Icon"></div>
                <p class="description">${description}</p>
              </div>
              <p class="temp">${maxTemp.toFixed(0)} / ${minTemp.toFixed(0)}</p>
            `;
        dailyContainer.innerHTML = htmlContent;
        dailyForcostContainer.appendChild(dailyContainer);
      });
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    }
  }

  export default FetchData;
  
  