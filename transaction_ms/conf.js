require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongoDB: {
    name: process.env.MONGO_DBNAME,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PWD,
  },
};
