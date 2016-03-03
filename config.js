//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

// var conString = "postgres://jelniepednuqjd:l7Lso4hxZqpqGYHQHBC1hVl75_@ec2-54-83-3-38.compute-1.amazonaws.com:5432/ddoccuqthfn0l1";
// var conString = process.env.DATABASE_URL || require('./.env');
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';


module.exports = conString;
