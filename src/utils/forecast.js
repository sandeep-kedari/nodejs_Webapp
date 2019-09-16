const request = require('request')
const forecast = (latitude, Longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/66af23ae356837c29f6ad9eaeb6de4f7/'+ encodeURIComponent(Longitude) +',' + encodeURIComponent(latitude)

    request({url, json: true}, (error, { body })=> {
        if(error) {
            callback("Location server Unavailable", undefined);
        } else if(body.error) {
           callback("Search seems in correct check for new one Please.. !!", undefined)
        } else{
            callback(undefined, body.daily.summary)
        }

    })
}

module.exports = forecast