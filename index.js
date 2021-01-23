require("dotenv/config");
const express = require("express");
const mysql = require("mysql");
const app = express();
var bodyParser = require("body-parser");
var db = require("./db");

const PORT = process.env.PORT || 3306;

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json({ type: "application/*+json" }));

app.get("/", function (req, res) {
  console.log(req.body);
  db.query("SELECT * FROM list", function (error, rows, fields) {
    if (error) {
      console.log("Error in the query");
      res.send(error);
    } else {
      console.log("Successful Query");
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post("/add", urlencodedParser, function (req, res) {
  let add_task = `INSERT INTO list(Task) values('${req.body.Task}');`;
  console.log(req.body);
  db.query(add_task, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Task Added Successfully");
    }
  });
});

app.delete("/:id", async function (req, res) {
  var id = req.params.id;
  let del = `DELETE FROM list WHERE id=${id}`;
  db.query(del, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Successfully Deleted!!");
    }
  });
});

app.put("/:id", urlencodedParser, async (req, res) => {
  if (!req.body.Task) {
    res.send("Error");
  }
  let id = req.params.id;
  let update = `UPDATE list SET Task = '${req.body.Task}' WHERE id = ${id};`;
  db.query(update, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Task was updated Successfully!!");
    }
  });
});

app.listen(PORT);
