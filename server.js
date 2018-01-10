// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
var Quandl = require("quandl");
var quandl = new Quandl();
 
var options = {
    api_key: "c781SfZ9pzK9vLTrrGqP"
}
 
quandl.configure(options);

app.use(express.static(__dirname + '/public/views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});


app.get("/stock", function (request, response) {
  quandl.dataset({ source: "BITCOIN", table: "MTGOXUSD" }, function(err, response){
    if(err)
        throw err;
 
    console.log(response);
  });
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
