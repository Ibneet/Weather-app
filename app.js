const request = require('request');
const weather = require('./weather/weather');

const yargs = require('yargs');
const geocode = require('./geocode/geocode')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(results.address);
        console.log(results.postalCode);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It's currently ${weatherResults.temperature}°F but feels like ${weatherResults.apparentTemperature}°F`);
            }
        });
    }
});





