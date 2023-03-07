const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const { Comment, Post, Users } = require('./src/postit.models/models');
const database = require('./src/db');

const port = process.env.port || 6969;


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    database();
});
