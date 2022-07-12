import request from "postman-request";

const geocode = (address, callback) => {
    const geocodingToken = 'pk.eyJ1IjoiZGltb2hnIiwiYSI6ImNsNHdycG1oMjE5ZHAzY216OWRsN29sMDMifQ.IeVC-YR-8qOu_WYPBmEymw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&access_token=' + geocodingToken + '&limit=1'
    // const sampleUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Petr.json?&access_token=pk.eyJ1IjoiZGltb2hnIiwiYSI6ImNsNHdycG1oMjE5ZHAzY216OWRsN29sMDMifQ.IeVC-YR-8qOu_WYPBmEymw&limit=1';
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Can not connect', undefined);
        } else if(body.features.length === 0){
            callback('Can not fetch location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].matching_place_name
            })
        }
    })
}

export {
    geocode
}
