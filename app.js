const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "7db442f1038a38ba42ed8b3eef72d4af"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;

  https.get(url, function (response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const humidity = weatherData.main.humidity
      const city = weatherData.name
      const icon = weatherData.weather[0].icon
      const description = weatherData.weather[0].description
      res.write("<h1>" + city + "</h1>");
      res.write("<h2>The temperature is " + temp + " degrees celsius.</h2>");
      res.write("<p>The humidity is " + humidity + "%.</p>");
      res.write("<p>The weather is currently " + description + ".</p>");
      res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="weather-icon">')
      res.write('<button onclick="history.back()">check another city</button>')
      res.send();
    })
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
