const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?appid=7db442f1038a38ba42ed8b3eef72d4af&q=Shanghai&units=metric";

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
      res.write("<h2>The temperature here is " + temp + " degrees celsius.</h2>");
      res.write("<p>The humidity is " + humidity + " %.</p>");
      res.write("<p>The weather is currently " + description + ".</p>");
      res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="weather-icon">')
      res.send();
    })
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
