const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  ejs = require("ejs"),
  fetch = require('node-fetch'),
  swaggerJSDoc = require("swagger-jsdoc"),
  swaggerUI = require("swagger-ui-express"),
  methodOvveride = require("method-override"),
  Recent = require("./models/recent"),
  Search = require('./routes/search'),
  ajaxQuickSearch = require('./routes/ajaxQuickSearch'),
  searchGetID = require('./routes/searchGetID');
  app = express();
  router = express.Router();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(__dirname + "/public/"));

mongoose.connect("mongodb://localhost:27017/serapion", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/search",Search);
app.use("/quicksearch", ajaxQuickSearch);
app.use("/search/", searchGetID);

 

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(80, function () {
  console.log("Server on 80");
});