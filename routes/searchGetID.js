const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
let router = express.Router();
const fetch = require('node-fetch');
Recent = require("../models/recent"),


router.get("/:id", (req, res) => {
    let findByID = req.params.id;
    Recent.findOne({ID:findByID}, (err, found) => {
      if (err || found == null) {
        fetch("http://www.omdbapi.com/?i=" + findByID + "&apikey=b322e698").then(response => response.json())
          .then(apiResponse => {
         
            let contentAbout = {
              ID: apiResponse.imdbID,
              Title: apiResponse.Title,
              Year: apiResponse.Year,
              Genre: apiResponse.Genre,
              Actors: apiResponse.Actors,
              Plot: apiResponse.Plot,
              Poster: apiResponse.Poster
            };
            
            Recent.create(contentAbout, (err, created) => {
              if (err) {
                console.log(err);
              } else {
                console.log("New content added to the database");
                
                res.render("about", {
                  about   : created
                });
              }
            });
          }).catch();
      } else {
        console.log("Found data by ID in local database");
        res.render("about", {about:found});
      }
  
  
  
    });
  
  
  });


module.exports = router;
