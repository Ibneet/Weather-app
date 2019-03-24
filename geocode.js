const request = require('request');
    
var geocodeAddress = (address, callback) =>{
     
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=k87ZBNU6YsPEcUU8vMiZYoOSlmN7JlAV&location=${encodedAddress}`,
        json : true  
     },(error, response, body) => {
         if(error){
            callback('Unable to connect to the server.');
         }
         else if(body.results[0].locations[0].geocodeQualityCode === 'A1XAX' && body.results[0].providedLocation.location !== 'us'){
            callback('Not able to find this location.');
         }
         else{
            callback(undefined, {
               address: body.results[0].providedLocation.location,
               postalCode: body.results[0].locations[0].postalCode,
               latitude: body.results[0].locations[0].displayLatLng.lat,
               longitude: body.results[0].locations[0].displayLatLng.lng
            });
         }
    });
}

module.exports.geocodeAddress = geocodeAddress;
