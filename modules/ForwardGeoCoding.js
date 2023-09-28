import ReverseGeoCoding from "./ReverseGeoCoding.js";
import FetchData from "./FetchData.js";
import { unit } from "./varaibles.js";

// Function to fetch data based on user's geolocation
async function ForwardGeoCoding() {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  console.log(latitude, longitude, "Forward")
        // Use a reverse geocoding service to get the location name from coordinates
        const location = await ReverseGeoCoding(latitude, longitude);
  
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
export default ForwardGeoCoding;  