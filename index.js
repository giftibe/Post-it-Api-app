//PACKAGES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./src/routes/index.routes');
require('dotenv').config();
const cors = require('cors');

//IMPORTS
const database = require('./src/db');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
    database();
});
