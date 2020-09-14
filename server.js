'use strict';

const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', function (request, response) {
    response.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});