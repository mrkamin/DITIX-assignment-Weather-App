import { REVERS_GEOCODING_API, GEOCODING_API_KEY } from "./Api.js";

async function ReverseGeoCoding(latitude, longitude) { 
    const response = await fetch(
        `${REVERS_GEOCODING_API}latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    console.log(response)
    const data = await response.json();
    console.log(data, "revers")
    console.log(data.city)
    if (data.city && data.city.length > 0) {
      const formattedAddress = data.city;
      console.log("Formated Address:", formattedAddress)
      return formattedAddress;
    } else {
      throw new Error("Reverse geocoding failed");
    }
  }
  export default ReverseGeoCoding;