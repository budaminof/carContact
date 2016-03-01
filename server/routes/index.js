var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = require(path.join(__dirname, '../', '../', 'config'));
//var conString = "postgres://cooperheinrichs:@localhost/todo";
var conString = require(path.join(__dirname, '../', '../', 'config'));
var client = new pg.Client(conString);



router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

module.exports = router;

router.post('/api/v1/todos', function(req, res) {
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
        client.query("INSERT INTO registered(firstname, lastname, licenseplate, phonenumber) values($1, $2, $3, $4)", [data.firstname, data.lastname, data.licenseplate, data.phonenumber]);

        /*
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
        });*/
    });
});

// router.post('/api/v1/todos', function(req, res){
//   //this is the results array that is returned once it has-success
//   //been populated with rows of data from the database
//   var results = [];
//   //this is a new object consisting of all the text from the
//   //body of the request and a boolean.
//   //the boolean is stored in the database.
//   var data = {text: req.body.text, complete: false  };
//
//   pg.connect(conString, function(err, client, done){
//     //this handles any connection problems
//     if(err){
//       done(); //closes the connection
//       console.log(err);
//       //return a response
//       return res.status(500).json({ success: false, data: err});
//     }
//     //use SQL to insert the data into the table
//       client.query("INSERT INTO registered(firstname, lastname, licenseplate, phonenumber) values($1, $2, $3, $4)", ["testname1", "testname2", "tplate", "testphone"]);
//
//     query.on('row', function(row){
//       results.push(row);
//     });
//     //event listener on end close the connection and return results to client
//     query.on('end', function(){
//       done();
//       return res.json(results);
//     });
//   });
// });

router.get('/api/v1/todos', function(req, res) {

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

router.put('/api/v1/todos/:todo_id', function(req, res) {

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



router.delete('/api/v1/todos/:todo_id', function(req, res) {
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
