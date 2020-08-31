const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
let router = express.Router();
const fetch = require('node-fetch');
Recent = require("../models/recent"),


  router.post("/", (req, res) => {
    let ajaxSearchResult = req.body.userSrc;
    Recent.findOne({
      Title: ajaxSearchResult
    }, (err, foundData) => {
      if (err || foundData == null) {
        fetch("http://www.omdbapi.com/?s=" + ajaxSearchResult + "&apikey=b322e698")
          .then(response => response.json())
          .then(apiResponse => {
            res.send({
              result: apiResponse.Search
            });
          });
      } else {
  
        
        console.log("Found Title in Local database");
        res.send( {
          result: foundData
        });
      }
    });
  
  
  });

module.exports = router;
