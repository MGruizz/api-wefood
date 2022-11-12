const Joi = require('joi');
const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

// middlewares 
app.use(express.json());

// routes
app.use(require('./src/routes/index'));

// PORT
const port = 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

