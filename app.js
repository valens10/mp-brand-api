// app.js
const express = require('express');
const joi = require('joi')
const config = require('./config');

const app = express();

app.get('/', (req, rep) => {
    rep.status('404').send("hello my brand!");
});
app.listen(config.app.port,()=>console.log("app is listerning on port "+ config.app.port));
