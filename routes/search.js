const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
let router = express.Router();
const fetch = require('node-fetch');
Recent = require("../models/recent"),


router.post("/", (req, res) => {
    let inputSearchResult = req.body.userSrc;
    console.log(inputSearchResult);
    Recent.findOne({
      Title: inputSearchResult
    }, (err, foundData) => {
      if (err || foundData == null) {
        fetch("http://www.omdbapi.com/?s=" + inputSearchResult + "&apikey=b322e698")
          .then(response => response.json())
          .then(apiResponse => {
            
            res.render("index", {
              result: apiResponse.Search
            });
          }).catch((error) =>{
              console.log(error);
          });
      } else {
        console.log("Title found in local database");
        res.render("index", {
          local: foundData
        });
      }
     });
  
  
  });


module.exports = router;
