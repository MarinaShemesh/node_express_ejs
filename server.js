const express = require('express');
const bodyParser = require('body-parser');
// We need bodyParser to make use of the req.body
// re.body is the input that we got from the index.ejs form, i.e. the city
const request = require('request');
const apiKey = "it is a secret";


const app = express()

// we need to expose the style.css file to express:
app.use(express.static('public'));

// bodyParser allows us to make use of the req.body
app.use(bodyParser.urlencoded({ extended: true }));

// EJS is accessed by default in the views folder
app.set('view engine', 'ejs')



app.get('/', function (req, res) {
  res.render ('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request (url, function(err, response,body){
    if (err){
      res.render('index', {weather: null, 
                           error: 'Error, please try again'});

      } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});

    } else {
      let weatherText = `It's ${weather.main.temp} degrees Celsius in ${weather.name}
                  and ${weather.clouds.all} percent cloudy and ${weather.icon}`;
      
          res. render ('index', {weather:weatherText,                               
                                error: null})     
    }

   }

  });
  
})

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})

https://www.worldweatheronline.com/blog/2015/04/10/use-different-weather-icons-application/