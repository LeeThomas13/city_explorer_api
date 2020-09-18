'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

//Application Setup
const PORT = process.env.PORT || 3001;
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
    const sql = `SELECT * FROM cities WHERE search_query=$1;`;
    const safeValues = [city];

    client.query(sql, safeValues)
    .then (resultsFromSql => {
        if (resultsFromSql.rowCount) {
            const chosenCity = resultsFromSql.rows[0];
            console.log('found city in the database');
            response.status(200).send(chosenCity);
        } else {
            console.log('did not find city in database, going to the API');

            const url = `https://us1.locationiq.com/v1/search.php`;
            const queryObject = {
                key: process.env.GEOCODE_API_KEY,
                city,
                format: 'JSON',
                limit: 1
            }
            superagent.get(url)
            .query(queryObject)
                .then(data => {
                    const location = new ConstructCity(city, data.body[0]);
                    const sql = 'INSERT INTO cities (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
                    const safeValues =[city, location.formatted_query, location.latitude, location.longitude]
        
                    client.query(sql, safeValues)
                    response.status(200).send(location);
                })
                .catch((error) => {
                    console.log('ERROR', error);
                    response.status(500).send('this is broke AF');
                })
        }
    })
    .catch((error) => {
        console.log('ERROR', error);
        response.status(500).send('this WHOLE DAM CITY THING IS BROK');
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
    let {search_query, formatted_query, latitude, longitude} = request.query;
    const sql = `SELECT * FROM weather WHERE search_query=$1;`
    const safeValues = [search_query]

    client.query(sql, safeValues)
        .then (resultsFromSql => {
            if (resultsFromSql.rowCount){
                let freshTime = Date.parse(new Date().toLocaleDateString()) - Date.parse(date.rows[0].date_entered) < 864;
                if (freshTime) {
                    console.log('this is out data.rows[0]', data.rows);
                    console.log('weather in the DB and is fresh');
                    response.status(200).send(resultsFromSql.rows);
                } else {
                    console.log('we did not have data in the DB, OR we had outdated data.');
                    let key = process.env.WEATHER_API_KEY
                    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${key}`;
                    superagent.get(url)
                    .then(resultsFromApi => {
                        var update = resultsFromApi.body.data;
                        console.log(allWeather);
                        let allWeather = update.map(weather => {
                            console.log(weather);
                            let newWeather = new ConstructWeather(weather);
                            let sql = `INSERT INTO weather (search_query, forecast, time, date_entered) VALUES ($1, $2, $3, $4);`;
                            let safeValues = [search_query, forecast, time, date_entered];
                            client.query(sql, safeValues);
                            return newWeather;
                        })
                        response.send(allWeather);
                    })
                    .catch((error) => {
                        console.log('something got f\'ed in the weather API', error);
                        response.status(500).send(error);
                    })
                } 
            } else {
                console.log('we did not have data in the DB, OR we had outdated data.');
                const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
                const queryObject = {
                    key :  process.env.WEATHER_API_KEY,
                    lat : request.query.latitude,
                    lon : request.query.longitude,
                    days: 8
                }

                superagent.get(url).query(queryObject)
                .then(resultsFromApi => {
                    var update = resultsFromApi.body.data;
                    console.log(update)
                    let allWeather = update.map(weather => {
                        console.log(weather);
                        let newWeather = new ConstructWeather(weather);
                        let sql = `INSERT INTO weather (search_query, forecast, time, date_entered) VALUES ($1, $2, $3, $4);`;
                        let safeValues = [search_query, forecast, time, date_entered];
                        client.query(sql, safeValues);
                        return newWeather;
                    })
                    response.send(allWeather);
                })
                .catch((error) => {
                    console.log('something got f\'ed in the weather API', error);
                    response.status(500).send(error);
                })
            }
            })
        .catch((error) => {
            console.log('ERROR', error);
            response.status(500).send('this WHOEL weather thing is broke AF');
        })
}

function ConstructWeather (obj) {
    this.forecast = obj.weather.description;
    this.time = obj.valid_date;
}

//Trail Functions
function trailHandler (request, response) {
    let lat = request.query.latitude;
    let lon = request.query.longitude;
    let key = process.env.TRAIL_API_KEY;
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${key}`;

    superagent.get(url)
        .then((val => {
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
client.connect()
  .then(() => {
    app.listen(PORT, ()=> {
      console.log(`listening on ${PORT}`);
    })
  })
  .catch(error => console.error(error));

