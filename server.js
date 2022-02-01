const PORT = process.env.PORT || 3000;
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

app.get("/api/:date?",  function (req, res, next) {
  if (req.params.date?.includes("-")) {
    req.params.date = Date.parse(`${req.params.date} 00:00:00`)
  } else {
    req.params.date = parseInt(req.params.date)
  }
  next()
}, function (req, res) {
  let date = new Date(req.params.date);
  res.json({
    "unix": date.valueOf(),
    "utc": date.toUTCString()
  })
})

//if statement for if the date is an invalid string
// if req.time === null,
// }, function (req, res) {
  // res.json({
  //   error: "Invalid Date"
  // })

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});
