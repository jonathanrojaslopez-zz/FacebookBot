const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')

const APP_TOKEN = 'EAAE5Conk9RIBACScJxlkkUmJtWZCgfjGEBJz4i7pIPk43giHUZANKduz2oqHKAGTAC7I1Na42wpzkybYmxE7rIdPDC7405793MwBD8e1TtSf2YqLWvDtJBVtZChnkB29kGhZBrRFiQUqNZCVAKtt5A8Xxgi4ZCZARTKAx9tMV9PHgZDZD'

var app = express();
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'johnny_token') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook',function (req,res) {
	var data = req.body;
	console.log(data);
	res.sendStatus(200)
})