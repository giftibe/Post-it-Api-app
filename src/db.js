const mongoose = require('mongoose');

function database() {
    mongoose
    .set('strictQuery', true)
    .connect(process.env.DATABASE_URI, {
      // userCreateIndex: true,
      // useNewUrlParser:true,
      // userUnifiedTopology:true,
    })
    .then(() => {
        console.log('Hurray! mongoDB is connected');
    })
    .catch((err) => {
        console.log(
        '====== An error occured while connecting to database ======= ' + err
        );
    });
}

module.exports = database;
