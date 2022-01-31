var express = require('express');
var app = express();

const port = 3005;

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", time = (req, res, next) => {
    req.time = new Date(req.params.date).toUTCString(),
    // new Date(Number(req.params.date))
    next()
  }, function (req, res) {
    res.json({
      "unix": req.time
      // "utc": req.time.toUTCString()
    })
  }
)

//if statement for if the date is an invalid string
// if req.time === null,
// }, function (req, res) {
  // res.json({
  //   error: "Invalid Date"
  // })

var listener = app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});
