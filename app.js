const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  ejs = require("ejs"),
  fetch = require('node-fetch'),
  swaggerJSDoc = require("swagger-jsdoc"),
  swaggerUI = require("swagger-ui-express"),
  methodOvveride = require("method-override"),
  Recent = require("./models/recent");
app = express();





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

 
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", (req, res) => {
  let search = req.body.userSrc;
  console.log(search);

  Recent.findOne({
    Title: search
  }, (err, foundData) => {
    if (err || foundData == null) {
		
      fetch("http://www.omdbapi.com/?s=" + search + "&apikey=b322e698")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          res.render("index", {
            result: data.Search
          });
        });
    } else {

      
      console.log("Found Local");
      console.log(foundData);
      res.render("index", {
        local: foundData
      });
    }
  });


});

app.get("/search/:id", (req, res) => {
  let result = req.params.id;
  console.log(result);
  Recent.findOne({ID:result}, (err, found) => {
    if (err || found == null) {
      fetch("http://www.omdbapi.com/?i=" + result + "&apikey=b322e698").then(response => response.json())
        .then(data => {
       
          let contentAbout = {
            ID: data.imdbID,
            Title: data.Title,
            Year: data.Year,
            Genre: data.Genre,
            Actors: data.Actors,
            Plot: data.Plot,
            Poster: data.Poster
          };
          
          console.log(contentAbout);
          Recent.create(contentAbout, (err, created) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Newly Created");
              
              res.render("about", {
                about: created
              });
            }
          });
        }).catch();
    } else {
      console.log("Found in Local Database");
      res.render("about", {about:found});
    }



  });


});

app.post("/quicksearch", (req, res) => {
  let search = req.body.userSrc;

  Recent.findOne({
    Title: search
  }, (err, foundData) => {
    if (err || foundData == null) {
      fetch("http://www.omdbapi.com/?s=" + search + "&apikey=b322e698")
        .then(response => response.json())
        .then(data => {
          res.send({
            result: data.Search
          });
        });
    } else {

      
      console.log("Found Local");
      res.send( {
        result: foundData
      });
    }
  });


});

app.listen(3000, function () {
  console.log("Server on 3000");
});