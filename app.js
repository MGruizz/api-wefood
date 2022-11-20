const Joi = require('joi');
const express = require('express');
var cors = require('cors');
const app = express();

require('dotenv').config();


app.use(cors());
app.use(express.json());

// routes
app.use(require('./src/routes/index'));

// middlewares 

// PORT
app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}...`));

