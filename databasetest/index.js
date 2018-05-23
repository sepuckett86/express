// Require express
var express = require('express')
var app = express()

// Require path to enable loading html page
var path = require("path");

// Require the 'sqlite3' package
const sqlite3 = require('sqlite3');
// Open up the SQLite database in './db.sqlite'
const db = new sqlite3.Database('./db.sqlite');

// Declare variable to send to homepage
let myVariable;

// Clear any previous table
db.run('DROP TABLE IF EXISTS MyTable', error => {
  if (error) {
    throw error;
  };
  // Create table
  db.run('CREATE TABLE MyTable (id INTEGER PRIMARY KEY, quote TEXT NOT NULL)', error => {
    if (error) {
      throw error;
    }
    // Add to table
    db.run('INSERT INTO MyTable (id, quote) VALUES (1, "This is a quote. Do not quote me on that.")', error => {
      if (error) {
        throw error;
      }
      // Get data from table and assign to myVariable
      db.all('SELECT * FROM MyTable', (error, rows) => {
        console.log(rows);
        myVariable = rows;
      })
    });
  });
});

// Get index.html for home page
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname+'/index.html'));
// })

app.get('/', function (req, res) {
  res.send(myVariable);
  })

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
