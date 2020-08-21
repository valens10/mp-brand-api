// db.js
import mongoose from 'mongoose';
import config from './config';

const {
    db: {host,port,name}} = config;

const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString,
    {useNewUrlParser: true,useUnifiedTopology: true}
);

var database = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
database.on('error',
    console.error.bind(
        console, 'MongoDB connection error:'
    ));
database.once('open', function() {
    console.log("MongoDb is connected!");
});


module.exports = database;