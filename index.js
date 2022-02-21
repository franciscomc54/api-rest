'use strict'

const express = require('express');
const app = express();

app.get('/hola', (request, response) => {
    response.send('Hola a todos y a todas desde Express!')
});

app.listen(8080,() => {
    console.log('API REST ejecutándose en http://localhost:8080/hola');
});