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

//Global Variables
let weatherArray = [];

//Route Definitions
app.get('/', blankHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.use('*', brokenHandler);

//Functions
function blankHandler (request, response) {
    response.send('Hello World');
}

function locationHandler (request, response) {
    try {
        const locationData = require('./data/location.json');
        const city = request.query.city;
        let newCity = new ConstructCity(city, locationData);
        response.send(newCity);
    } catch (error){
        return response.status(500).send(`something went wrong :\(`)
    }
}

function weatherHandler (request, response) {
    try {
        const weatherData = require('./data/weather.json');
        weatherData.data.forEach(value => {
            let newWeather = new CityWeather(value);
            weatherArray.push(newWeather);
        })
        response.send(weatherArray)
    } catch (error) {
        return response.status(500).send(`something went wrong :\(`)
    }
}

function CityWeather (weatherObject) {
    this.time = weatherObject.datetime;
    this.forecast = weatherObject.weather.description;
}

function ConstructCity (city, locationObject) {
    this.search_query = city;
    this.formatted_query = locationObject[0].display_name;
    this.latitude = locationObject[0].lat;
    this.longitude = locationObject[0].lon;
}

function brokenHandler (request, response) {
    response.status(500).send('this is broke AF')
}

//Force server to listen for requests
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

