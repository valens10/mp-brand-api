// app.js
import express from 'express';
import cors from 'cors'
require('dotenv').config();
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
import config from './config';
import model from './api/models/mybrandModel';
import db from './db';
mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
app.use(cors());
  

app.use(express.urlencoded(
    { extended: false }));
const port = config.app.port;


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

//importing route
import signup_routes from './api/routes/signup';
import signin_routes from './api/routes/signIn';
import updateUser_routes from './api/routes/updateUser';
import post_routes from './api/routes/articles';
import message_routes from './api/routes/message';
import comment_routes from './api/routes/comment';

//register the route
signup_routes(app);
signin_routes(app);
updateUser_routes(app);
post_routes(app);
message_routes(app);
comment_routes(app);



//raise error when url not found.
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(process.env.PORT || 3000, () => console.log("app is listerning on port " + port));

export default app;