import 'dotenv/config'
/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const ApiKey = process.env.API_KEY;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    // get data from user form (zipcpde, user feelings)
    const newZipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    // GET Web API Data
    getOpenWeatherMapData(baseURL, newZipCode, ApiKey)
    
    // POST data to server
    .then((data) => {
        // prepare required data
        const name = data.name; // city name
        const temp = (data.main.temp - 273.15).toFixed() + '°'; // Temperature
        const tempMax = (data.main.temp_max - 273.15).toFixed() + '°'; // maximum temperature
        const tempMin = (data.main.temp_min - 273.15).toFixed() + '°'; // minimum temperature
        const FeelsLike = (data.main.feels_like - 273.15).toFixed() + '°'; // feel like temperature
        
        // post data
        postData('/addZipCode', {
            date: newDate,
            name: name,
            temp: temp,
            tempMax: tempMax,
            tempMin: tempMin,
            FeelsLike: FeelsLike,
            feelings: feelings
        });
    })

    // GET Project Data & update user interface
    .then(() => {
        updateUI();
    });
}


/* Function to GET Web API Data */
const getOpenWeatherMapData = async (url, zip, kay) => {
    
    // fetch data from API
    const res = await fetch(url + zip + kay);
    
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error ', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    
    // post data to server
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
   });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    // get all data from server
    const req = await fetch('/all');

    try {
        const allData = await req.json();
        // get last element 
        const index = allData.length - 1;
        
        // update UI Element 
        document.getElementById('date').innerHTML = allData[index].date;
        document.querySelector('#temp h3').innerHTML = allData[index].name;
        document.querySelector('#temp h2').innerHTML = 'Temperature';
        document.querySelector('#temp h1').innerHTML = allData[index].temp;
        document.querySelector('#temp h4').innerHTML = allData[index].tempMax + ' / ' + allData[index].tempMin + ' feels like ' + allData[index].FeelsLike;
        document.getElementById('content').innerHTML = 'Your feelings : ' + allData[index].feelings;
    } catch (error) {
        console.log('error ', error);
    }
}