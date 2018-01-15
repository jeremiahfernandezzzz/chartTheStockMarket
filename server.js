// server.js
// where your node app starts

// init project
var express = require('express');
var app = require('express')();
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
  MongoClient.connect(url, function(err, db){
      if (db){
            console.log("connected to " + url);
            db.collection("chart-state").find({},{ticker:1, _id: 0}).toArray().then(function(element){
              var tickers = []
              Object.values(element).forEach(function(tick){
                tickers.push(tick.ticker)
              })
              io.emit("tickback", tickers)
            })
      }
      if (err) {
       console.log("did not connect to " + url)
      }
    })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('data', function(data){
    console.log(data)
    MongoClient.connect(url, function(err, db){
      if (db){
            console.log("connected to " + url);
            db.collection("chart-state").find({ticker: data}).toArray().then(function(element){
              if (element == ""){
                console.log(data + "inserted")
                db.collection("chart-state").insert({ticker : data})
                io.emit("tickback", data)
              } else {
                console.log(JSON.stringify(element) + " ticker already exists")
                //io.emit("tickback", tickers)
              }
            })
            console.log(data)
            //io.emit("tickback", tickers);
      }
      if (err) {
       console.log("did not connect to " + url)
      }
    })
  });
  socket.on("delete", function(data){
    console.log(data)
    
  console.log('a user connected');  
  MongoClient.connect(url, function(err, db){
      if (db){
      db.collection("chart-state").remove({ticker: data})
      }
      db.collection("chart-state").find({}).forEach(function(element){
              //console.log("dbsdf" + JSON.stringify(element.ticker))
        socket.emit("tickback", element.ticker);
      })
    })
  
  })
  //io.emit('event', asd); // main namespace

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
//var listener = app.listen(process.env.PORT, function () {
//  console.log('Your app is listening on port ' + listener.address().port);
//});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3000');
});
