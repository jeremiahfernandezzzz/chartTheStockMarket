// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient;
var url = process.env.DB_URL;

const quandlEodHelper = require('quandl-eod-helper');
const Eod = new quandlEodHelper();
//const year = '2016';
var http = require('http').Server(app);
var io = require('socket.io')(http);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html=

app.use(express.static(__dirname + '/public/views'));


io.on('connection', function(socket){
  console.log('a user connected');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/views/stock.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});


app.post("/stock", function (request, response) {
  MongoClient.connect(url, function(err, db){
        if (db){
              console.log("connected to " + url);
              db.collection("chart-state").insert({tickers : "asd"})
        }
        if (err) {
         console.log("did not connect to " + url)
        }
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
