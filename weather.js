const request = require('request');


var getWeather = (lat, lng, callback) => {
    request({
    url: `https://api.darksky.net/forecast/06ec9d568afa83c6aa9ef23853bf798f/${lat},${lng}`,
    json: true
},(error, response, body) => {
    if(error){
        callback('Unable to connect to the server.');
    }
    else if(response.statusCode === 400){
        callback('Unable to fetch the weather report.');
    }else if(response.statusCode === 200){
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
    }  
});
};

module.exports.getWeather = getWeather;