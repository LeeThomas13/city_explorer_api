'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

//Route Definitions
app.get('/', blankHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', trailHandler);
app.use('*', brokenHandler);

// Location Functions
function locationHandler (request, response) {
    let city = request.query.city;
    let key = process.env.GEOCODE_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`

    superagent
        .get(url)

        .then((data) => {
            const geoData = data.body[0];
            const location = new ConstructCity(city, geoData);
            response.send(location);
        })
        .catch((error) => {
            console.log('ERROR', error);
            response.status.send('this is broke AF');
        })
}

function ConstructCity (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData.display_name;
    this.latitude = geoData.lat;
    this.longitude = geoData.lon;
}

//Weather Functions
function weatherHandler (request, response) {
    let lat = request.query.latitude;
    let lon = request.query.longitude;
    console.log(request.query)
    let key = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${lon}&days=8`;


    superagent.get(url)
        .then((val) => {
            //to console.log the incoming API
            // console.log(val.body)
            const weatherData = val.body.data.map(obj => {
                return new ConstructWeather(obj)
            })
            response.send(weatherData)
        })
        .catch((error) => {
            console.log('ERROR', error);
            response.status(500).send('this is broke AF');
        })
}

function ConstructWeather (weatherObject) {
    this.forecast = weatherObject.weather.description;
    this.time = weatherObject.datetime;
}

//Trail Functions
function trailHandler (request, response) {

}

function ConstructTrails (city, trailObject) {

}

//Error Functions
function blankHandler (request, response) {
    response.send('Hello World');
}

function brokenHandler (request, response) {
    response.status(500).send('this is broke AF')
}

//Force server to listen for requests
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

