// config.js
//port = process.env.PORT || 3000,
const config = {
 app: {
   port: 3000
 },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'my_brand_db'
    }
};

module.exports = config;