const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

const port = 3005;

var cors = require('cors');
const { json } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// create a helper function that checks for if it's a valid date
// const checkForValidDate = 



app.get("/api/:date?",  function (req, res, next) {
  if (!req.params.date) {
    req.params.date = Date.now()
  } else if (/^\d{4}-\d{2}-\d{2}$/) {
    req.params.date = Date.parse(`${req.params.date} 00:00:00`)
  }
  // else if ( // check if unix date is valid
  //   ) {
  //   req.params.date = parseInt(req.params.date)
  // } else {
  //   // send res for invalid date
      // res.json({
      // "error": "Invalid Date"
      // })
  // }
  next()
}, function (req, res) {
  let date = new Date(req.params.date);
    res.json({
      "unix": date.valueOf(),
      "utc": date.toUTCString()
    })
})

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});
