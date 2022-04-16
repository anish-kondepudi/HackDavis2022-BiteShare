const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const Schema = mongoose.Schema;
const app = express();
app.use(express.json({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const food = mongoose.model("foods", new Schema({ 
    id: ObjectId,
    data: Buffer,
    email: String,
    name: String,
    description: String,
    status: Boolean,
    deleted: Boolean
}));


module.exports = function(app){
    app.get("/food", (req, res) => {
        food.find({}, function(err, foods) {
            if (err) {
                throw new Error(err)
            } else {
                var allFood = {};
            
                foods.forEach(function(indFood) {
                  allFood[indFood._id] = indFood;
                });
            
                res.send(allFood); 
            } 
          });
    });
    
    app.post("/food", (req, res) => {
        /*fs.readFile(req.body.food, function(err, data){
            if (err) {
                console.log("Error: " + err);
            } else {
                console.log("Data: " + data);
            }
        });*/
        newFood = {
            _id: new ObjectId(),
            data: req.body.data,
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            deleted: false,
            status: false
        }
        food.collection.insertOne(newFood, function(err, docs) {
            if (err) {
                throw new Error(err);
            } else {
                res.send(newFood);
            }
        });
    })
}