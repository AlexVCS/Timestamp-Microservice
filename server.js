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

function isNumbersOnly(string) {
  return /^\d+$/.test(string)
}

function makeDate(string) {
  if (isNumbersOnly(string)) {
    return new Date(parseInt(string))
  } else {
    return new Date(string)
  }
}

app.get("/api/:date?",  function (req, res) {
  let dateObject = null
  let requestDate = req.params.date
  if (!requestDate) {
    dateObject = new Date()
  } else {
    dateObject = makeDate(requestDate)
  }

  if(isNaN(dateObject.valueOf())) {
    res.json({
      "error": "Invalid Date"
    })
  }

  res.json({
    "unix": dateObject.valueOf(),
    "utc": dateObject.toUTCString()
  })
})

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});