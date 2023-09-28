import { errorMassage } from "./varaibles.js";
import ReverseGeoCoding from "./ReverseGeoCoding.js";

function displayError(message) {
    errorMassage.innerHTML = `<p class="error">${message}</p>`;
  }

const Mylocation = () => {
  const succes = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    ReverseGeoCoding(latitude, longitude);
  };
  const error = () => {
    if (!succes.ok) {
        throw new Error(`HTTP errro! Status: ${rescurrent.status}`);
      };
  };
  navigator.geolocation.getCurrentPosition(succes, error);
};
export default Mylocation;
