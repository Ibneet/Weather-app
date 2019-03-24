const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=k87ZBNU6YsPEcUU8vMiZYoOSlmN7JlAV&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.results[0].locations[0].geocodeQualityCode === 'A1XAX' && response.data.results[0].providedLocation.location !== 'us'){
        throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].locations[0].displayLatLng.lat;
    var lng = response.data.results[0].locations[0].displayLatLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/06ec9d568afa83c6aa9ef23853bf798f/${lat},${lng}`;
    console.log(response.data.results[0].providedLocation.location);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's ${temperature}°F but feels like ${apparentTemperature}°F`);
})
.catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to the api servers.');
    }else{
        console.log(e.message);
    }
});



