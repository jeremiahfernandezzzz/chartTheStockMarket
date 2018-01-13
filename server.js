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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
