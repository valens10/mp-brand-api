// db.js
import mongoose from 'mongoose';
import config from './config';

const {
    db: { host, port, name } } = config;
    
const connectionString = `mongodb+srv://kigc:ever@cluster0.61zsl.gcp.mongodb.net/yvan-blog?retryWrites=true&w=majority` || `mongodb://:${port}/${name}`;
mongoose.connect(connectionString,
    {useNewUrlParser: true,useUnifiedTopology: true}
);

var database = mongoose.connection;
database.on('error',
    console.error.bind(
        console, 'MongoDB connection error:'
    ));
database.once('open', function() {
    console.log("MongoDb is connected!");
});


export default database;