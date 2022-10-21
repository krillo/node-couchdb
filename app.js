const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const NodeCouchDB = require("node-couchdb");
const { log } = require("console");

const couch = new NodeCouchDB({
  host: "127.0.0.1",
  protocol: "http",
  port: 5984,
  auth: {
    user: "admin",
    pass: "admin",
  },
});

const dbName = "reptilo";
const viewUrl = "_design/all_customers/_view/all/";

couch.listDatabases().then(
  (dbs) => console.log(dbs),
  (err) => {
    console.log("cant lits dbs...");
  }
);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  // res.render("index");
  couch.get(dbName, viewUrl).then(
    ({ data, headers, status }) => {
      // data is json response
      // headers is an object with all response headers
      // status is statusCode number
      console.log("data.data.rows", data.rows);
      res.render("index", { customers: data.rows });
    },
    (err) => {
      // either request error occured
      // ...or err.code=EDOCMISSING if document is missing
      // ...or err.code=EUNKNOWN if statusCode is unexpected
      // res.send(err);
    }
  );
});

app.post("/customer/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  couch.uniqid().then((ids) => {
    const id = ids[0];
    couch
      .insert("reptilo", {
        _id: id,
        name: name,
        email: email,
        titles: [],
      })
      .then(
        (data, headers, status) => {
          res.redirect("/");
        },
        (err) => {
          res.send(err);
        }
      );
  });
});

app.post("/customer/delete/:id", (req, res) => {
  const id = req.params.id;
  const rev = req.body.rev;
  couch.del(dbName, id, rev).then(
    ({ data, headers, status }) => {
      // data is json response
      // headers is an object with all response headers
      // status is statusCode number
      res.redirect("/");
    },
    (err) => {
      // either request error occured
      // ...or err.code=EDOCMISSING if document does not exist
      // ...or err.code=EUNKNOWN if response status code is unexpected
      res.send(err);
    }
  );
});

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});
