'use strict';

const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const cors = require('cors');

let weatherArray = [];


app.use(cors());

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/location', (request, response) => {
    try {
    const locationData = require('./data/location.json');
    const city = request.query.city;
    let newCity = new ConstructCity(city, locationData);
    response.send(newCity);
    } catch (error){
        console.error(error);
    }
})

app.get('/weather', (request, response) => {
    try {
        const weatherData = require('./data/weather.json');
        weatherData.data.forEach(value => {
            let newWeather = new CityWeather(value);
            weatherArray.push(newWeather);
        })
        response.send(weatherArray)
    } catch (error) {
        console.error(error);
    }
})

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

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

