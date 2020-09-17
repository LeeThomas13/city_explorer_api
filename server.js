'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg')

//Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
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

    superagent.get(url)
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
    let lat = request.query.latitude;
    let lon = request.query.longitude;
    // console.log(request.query);
    let key = process.env.TRAIL_API_KEY;
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${key}`;

    superagent.get(url)
        .then((val => {
            // console.log(val.body);
            const trailInformation = val.body.trails.map(obj => {
                return new ConstructTrails(obj);
            })
            response.send(trailInformation);
        }))
        .catch((error) => {
            console.log('ERROR', error)
            response.status(500).send('now THIS is broke AFFF');
        })
}

function ConstructTrails (trailObject) {
    this.name = trailObject.name;
    this.location = trailObject.location;
    this.length = trailObject.length;
    this.star_votes = trailObject.star_votes;
    this.summary = trailObject.summary;
    this.trail_url = trailObject.trail_url;
    this.conditions = trailObject.conditions;
    this.condition_date = trailObject.condition_date;
    this.condition_time = trailObject.condition_time
}

//Error Functions
function blankHandler (request, response) {
    response.send('Hello World');
}

function brokenHandler (request, response) {
    response.status(500).send('this is broke AF')
}

//Force server to listen for requests
function startServer() {
    app.listen(PORT, () => {
        console.log('Server is listening on port', PORT);
    })
}

client.connect()
    .then(startServer)
    .catch(error => console.log(error));


