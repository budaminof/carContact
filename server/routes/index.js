var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = require(path.join(__dirname, '../', '../', 'config'));
//var conString = "postgres://cooperheinrichs:@localhost/todo";
var conString = require(path.join(__dirname, '../', '../', 'config'));
var client = new pg.Client(conString);

var twilio = require('twilio');
// Twilio Credentials
var accountSid = 'AC498deede3787a484eae32dab29529bf3';
var authToken = 'dde82c65a5d47252cbb110a7959cd693';
// Create a new REST API client to make authenticated requests against
// the twilio back end
var textClient = new twilio.RestClient(accountSid, authToken);
var API_URL = '/api/v1';


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

module.exports = router;

router.post(API_URL+'/todos', function(req, res) {
    var results = [];
    // Grab data from http request
    // var pData = JSON.parse(req.body.text);
    // console.log(pData);
    var data = {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      licenseplate: req.body.licenseplate,
      state: req.body.state,
      phonenumber: req.body.phonenumber,
      complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        var query = client.query("INSERT INTO registered(email, password, firstname, lastname, licenseplate, state, phonenumber) values($1, $2, $3, $4, $5, $6, $7)", [data.email, data.password, data.firstname, data.lastname, data.licenseplate, data.state, data.phonenumber]);


        // SQL Query > Select Data
        //= client.query("SELECT * FROM items ORDER BY id ASC");
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

router.get(API_URL+'/todos2/:plateNumber/:msg', function(req, res) {
// router.get(API_URL+'/todos2/:plateNumber/:state', function(req, res) {
    var results = [];
    var data = { plate: req.params.plateNumber, state: req.params.state };
    switch(req.params.msg){
      case "msg1":
        data.msg = "You're getting towed.";
        break;
      case "msg2":
        data.msg = "Someone needs you to move your car.";
        break;
      case "msg3":
        data.msg = "Your meter is about to expire.";
        break;
      case "msg4":
        data.msg = "There is a safety issue with your car.";
        break;
    }
    data.msg = data.msg + " This message was sent via Car Contact.";

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query({
          // text: 'SELECT phonenumber FROM registered WHERE licenseplate = $1 AND state = $2',
          // values: [data.plate, data.state]
          text: 'SELECT phonenumber FROM registered WHERE licenseplate = $1',
          values: [data.plate]
        });
        console.log("query: ");
        console.log(data.plate.length);
        console.log(data.plate);
        console.log(query);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            for(var i = 0; i < results.length; i++){
              console.log(results[i].phonenumber);

              textClient.sms.messages.create({
                to: results[i].phonenumber.toString(),
                from: '+17204087635',
                body: data.msg,
              }, function(error, message){
                if(!error){
                  console.log("Success! The SID for this SMS message is: ");
                  console.log(message.sid);

                  console.log('Message sent on :');
                  console.log(message.dateCreated);
                } else {
                  console.log('Oops! There was an error.');
                }
              });
            }
            return res.json(results);
        });
    });
});
