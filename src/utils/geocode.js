const request = require('request')

const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuZHk4NjI5OSIsImEiOiJjazBjOXBlbjMwenRwM21udm1ueTQwdjZwIn0.MYVuHC4YH4hOaaQlpFapXw&limit=1'
    
    request({url, json: true}, (error, {body})=> {
        if(error) {
            callback('Location Server Unavailable..!!', undefined);
        } else if(body.features.length === 0) {
            callback('Search Not available. Try out Next search..!!', undefined);
        } else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode