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
// app.get('/weather', weatherHandler);
// app.get('/trails', trailHandler);
app.use('*', brokenHandler);

//Functions

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

// function weatherHandler (request, response) {
    
// }

// function trailHandler (request, response) {

// }

function ConstructCity (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData.display_name;
    this.latitude = geoData.lat;
    this.longitude = geoData.lon;
}

// function ConstructWeather (city, weatherObject) {
    
// }

// function ConstructTrails (city, trailObject) {

// }

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

