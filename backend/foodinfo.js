const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const twilio = require('twilio');
const Schema = mongoose.Schema;
const app = express();
app.use(express.json({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const accountSid='AC6d48a9b4c6a3b6d8f034f1005f5e1202';
const authToken='66231fa7fc025e84c5716ec3d9efab1a';
const client= new twilio(accountSid, authToken);

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const food = mongoose.model("foods", new Schema({ 
    id: ObjectId,
    data: Buffer,
    email: String,
    name: String,
    startTime: String,
    endTime: String,
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
    app.get("/food/:id", (req, res) => {
        const id = req.params.id;
        food.findById(id, function(err, foods) {
            if (err) {
                throw new Error(err)
            } else {
                res.send(foods); 
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
            startTime: req.body.startTime,
            endTime: req.body.endTime,
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
    app.put("/pickup/:id", (req, res) => {
        const id = req.params.id;
        const userEmail=req.body.email;
        const updateFood = {
            status: true
        }
        const url2= 'http://localhost:5000/food/' + id;
        fetch(url2).then(res => {
            if(!res.ok){
                throw res;
              }
              return res.json();
            }).then(data => {
                url3='http://localhost:5000/users/' + data[0][email];
                fetch(url3).then(res => {
                    if(!res.ok){
                        throw res;
                      }
                      return res.json();
                    }).then(data => {
                        const donorNumber=data[0]["phoneNumber"];
                      });
              });
        food.findByIdAndUpdate(id, updateFood, function(err, docs) {
            if (err) {
                throw new Error(err);
            } else {
                let url = 'http://localhost:5000/users/' + userEmail;
                fetch(url).then(res => {
                if(!res.ok){
                    throw res;
                  }
                  return res.json();
                }).then(data => {
                    const userNumber=data[0]["phoneNumber"];
                  });
                res.send(updateFood);
            }
        });
    })
}