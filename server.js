// Setup empty JS object to act as endpoint for all routes
projectData = {};
let data = [];

// Require Express to run server and routes
const express = require('express');

const dotEnv = require('dotenv')
dotEnv.config();

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
    console.log(`server runing in localhost port: ${port}`);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(data)
});

// Post Route
app.post('/addZipCode', (req, res) => {
    newEntry = {
        date: req.body.date,
        name: req.body.name,
        temp: req.body.temp,
        tempMax: req.body.tempMax,
        tempMin: req.body.tempMin,
        FeelsLike: req.body.FeelsLike,
        feelings: req.body.feelings
    };
    
    data.push(newEntry);
    res.send(data);
});  