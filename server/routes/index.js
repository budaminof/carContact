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
    var data = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phonenumber: req.body.phonenumber, licenseplate: req.body.licenseplate, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        var query = client.query("INSERT INTO registered(firstname, lastname, licenseplate, phonenumber) values($1, $2, $3, $4)", [data.firstname, data.lastname, data.licenseplate, data.phonenumber]);


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


router.get(API_URL+'/todos', function(req, res) {
    var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");
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

router.get(API_URL+'/todos2/:plateNumber', function(req, res) {
    var results = [];
    var data = { plate: req.params.plateNumber };
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
          text: 'SELECT phonenumber FROM registered WHERE licenseplate = $1',
          values: [data.plate]
        });
        console.log(query);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            console.log("results:");
            for(var i = 0; i < results.length; i++){
              console.log(results[i].phonenumber);

              textClient.sms.messages.create({
                to: results[i].phonenumber.toString(),
                from: '+17204087635',
                body: 'ahoy hoy! Testing Twilio and node.js'
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

router.put(API_URL+'/todos/:todo_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.todo_id;
    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};
    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");
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



router.delete(API_URL+'/todos/:todo_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.todo_id;
    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");
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
