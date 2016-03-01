var pg = require('pg'); //require postgres?
var path = require('path');
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo'; //this is the string that leads us to our server on 5432

var conString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(conString); //makes a new client connect to port 5432
client.connect(); //connect the client to the db
var query = client.query('CREATE TABLE Registered(id SERIAL PRIMARY KEY, firstName VARCHAR(255) not null, lastName VARCHAR(255) not null, licensePlate VARCHAR (6) not null, phoneNumber VARCHAR (10))'); //make a table

query.on('end', function() { client.end(); });
