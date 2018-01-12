// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const quandlEodHelper = require('quandl-eod-helper');
const Eod = new quandlEodHelper();
//const year = '2016'

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html=

app.use(express.static(__dirname + '/public/views'));



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});


app.get("/stock/:qwe", function (request, response) {
  var tickr = ["haha","hehe"];
  //request.params.qwe.split(",").forEach(function(element){
   // tickr.push(element)
 // });
  //console.log(tickr)
  const year = 2018
  tickr.forEach(function(tick){
    Eod.config({ year, tick });
    Eod.fetch()
    .then((data) => {
      Object.values(data[0]["dataset"]["data"]).forEach(function(element){
        var dateArray = [];
        
        element[0].split("-").forEach(function(element){
          dateArray.push(element)
        }) ;
        
        function toMonth(month){
            if (month == 1) {return "January"}
            if (month == 2) {return "February"}
            if (month == 3) {return "March"}
            if (month == 4) {return "April"}
            if (month == 5) {return "May"}
            if (month == 6) {return "June"}
            if (month == 7) {return "July"}
            if (month == 8) {return "August"}
            if (month == 9) {return "September"}
            if (month == 10) {return "October"}
            if (month == 11) {return "November"}
            if (month == 12) {return "December"}
        }
        
        dateArray[1] = toMonth(dateArray[1])
        //console.log("year" + date[0] + " month" + date[1] + " date" + date[2])
        var date = new Date(dateArray[1] + " " + dateArray[2] + " " + dateArray[0])
        var unixTime = date.getTime();
        element[0] = unixTime
      }) //raw JSON response
      console.log(data[0]["dataset"]["data"])
    })
  })
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
