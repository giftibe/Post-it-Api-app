//PACKAGES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongodbSession = require('connect-mongodb-session')(session)
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//IMPORTS
const database = require('./src/db');
const router = require('./src/routes/index.routes');
const PORT = process.env.PORT || 3000;

//CONFIGURATION
const store = new MongodbSession({
    uri: process.env.DATABASE_URI,
    collection: 'sessions'
})

const sessionConfig = {
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60, //time span of cookie
        secure: false, //for production set this to true
        httpOnly: true // true means no access to cookie via javascript(user has to give consent)
    },
    resave: false,
    store: store,
    saveUninitialized: true,// in production set this to false because of GDPR laws
}

app.use(session(sessionConfig))


app.use('/api', router);
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
    database();
});
