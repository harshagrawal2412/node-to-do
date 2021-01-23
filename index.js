const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require('body-parser')
var db= require('./db');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get("/", function (req, res) {
  console.log(req.body)
  db.query("SELECT * FROM list", function (error, rows, fields) {
    if (!!error) {
      console.log("Error in the query");
    } else {
      console.log("Successful Query");
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post('/add', urlencodedParser, function (req, res) {
  let add_task=`INSERT INTO list(Task) values('${req.body.Task}');`
  console.log(req.body)
  db.query(add_task, (error, result) => {
    if (error) {
      console.log(error);
    }else
      res.send('Task Added Successfully');
  }) 
})

app.delete("/:Task",async (req, res, next) => {
  try {
    let task = req.params.Task;
    if (task) {
      let sql = "DELETE FROM list WHERE Task=?";
      let result = await db.query(sql, [task]);
      res.send("Task Deleted");
    } else {
      res.send("Error");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
})

app.listen(1337);