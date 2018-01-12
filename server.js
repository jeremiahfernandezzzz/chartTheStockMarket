// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const quandlEodHelper = require('quandl-eod-helper');
const Eod = new quandlEodHelper();
const year = '2016'
const tickers = ['AAPL', 'MSFT']
Eod.config({ year, tickers });

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


app.get("/stock", function (request, response) {
  Eod.fetch()
  .then((data) => {
    console.log(data[0]) //raw JSON response
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
