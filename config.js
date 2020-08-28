// config.js
require('dotenv').config();
const config = {
 app: {
   port: process.env.PORT
 },
    db: {
        host: process.env.HOST || '0.0.0.0/0',
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    }
};

export default config;