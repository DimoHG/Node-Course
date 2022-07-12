import {geocode} from "./utils/geocode.js";
import {forecast} from "./utils/forecast.js";

const address = process.argv[2];
if(!address){
    console.log('No address given!');
}
geocode(address, (error, {longitude, latitude} = {}) => {
    if (error) {
        console.log('Error: ' + error);
        return;
    }
    forecast(longitude, latitude, (error, response) => {
        if(error){
            return;
        }
        console.log(response)
        console.log('Location: ' + address);
        console.log('Temperature: ' + response.temperature);
    })
})
