const Joi = require('joi');
const express = require('express');
var cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());

// middlewares 
app.use(express.json());

// routes
app.use(require('./src/routes/index'));

// PORT
app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}...`));

