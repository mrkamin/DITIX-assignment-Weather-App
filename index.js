import FetchData from "./modules/FetchData.js";
import { search, searchbtn, DEFAULT_LOCATION, unitSelect } from "./modules/varaibles.js";

const unit = unitSelect.value;
// Function to fetch data based on user's geolocation
// Function to fetch data based on user's geolocation
async function fetchLocationData() {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Use a reverse geocoding service to get the location name from coordinates
        const location = await reverseGeocode(latitude, longitude);
  
        // Call FetchData with the location name and unit
        FetchData(location, unit);
      } catch (error) {
        // Handle any errors that occur during geolocation or reverse geocoding
        console.error("Error getting user's location:", error);
      }
    } else {
      // Geolocation is not supported by the browser
      // Handle this case (e.g., show an error message)
      console.error("Geolocation is not supported by your browser.");
    }
  }
  
  // Function to perform reverse geocoding (replace with a suitable API)
  async function reverseGeocode(latitude, longitude) {
    // You should replace this with an actual reverse geocoding API call
    // that converts the coordinates into a location name
    // For example, you can use the Google Maps Geocoding API
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error("Reverse geocoding failed");
    }
  }

  window.onload = () => {
    fetchLocationData();
};

search.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const location = search.value;

    FetchData(location, unit);
  }
});

searchbtn.addEventListener("click", () => {
  const location = search.value;

  FetchData(location, unit);
});
