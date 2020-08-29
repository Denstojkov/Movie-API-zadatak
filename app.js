const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  ejs = require("ejs"),
  fetch = require('node-fetch'),
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
		  
		  let test = [];
		  let result = data.Search;
		  
		  result.forEach(function(data){
			  
			 if(Recent.findOne({
    			Title: data.Title
  			},(err,found) => {
				 if(err){
					 console.log(err);
				 }else if(found){
					console.log("-----------------");
					 console.log(found);
					
				 }
				 
				 
				 
			 }  ));
			
		  test.push(data);
		  })
		 console.log(test);
          res.render("index", {
            result: test
          });
        })
    } else {

      
      console.log("Found Local");
      res.render("index", {
        result: foundData
      });
    }
  });


});

app.get("/search/:id", (req, res) => {
  let result = req.params.id;
  Recent.findById(result, (err, found) => {
    if (err || found == null) {
      fetch("http://www.omdbapi.com/?i=" + result + "&apikey=b322e698").then(response => response.json())
        .then(data => {
          let contentAbout = {
            Title: data.Title,
            Year: data.Year,
            Genre: data.Genre,
            Actors: data.Actors,
            Plot: data.Plot,
            Poster: data.Poster
          };

          Recent.create(contentAbout, (err, created) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Newly Created");
              console.log(created);
              res.render("about", {
                about: created
              });
            }
          });
        });
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