import request from "postman-request";

const forecast = (longitude, latitude, callback) => {
    const weatherToken = '447ba5c5c609d40c7d511a6f6c66aba0&query=' + latitude + ',' + longitude + '&units=m';
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherToken;
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Can not connect');
        } else if (body.error) {
            callback('Can not fetch weather');
        } else {
            callback(undefined, body.current);
        }
    })
}

export {
    forecast
}
