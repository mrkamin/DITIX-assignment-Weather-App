import FetchData from "./modules/FetchData.js";
import { search,unit, getMyLocation, } from "./modules/varaibles.js";
import ForwardGeoCoding from "./modules/ForwardGeoCoding.js";


window.onload = () => {
  ForwardGeoCoding();
 
};

getMyLocation.addEventListener('click', ForwardGeoCoding)

search.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const location = search.value.trim();
    if (location) {
      FetchData(location, unit);
    } else {
      console.error("Please enter a location");
    }
  }
});



