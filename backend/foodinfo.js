const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const twilio = require('twilio');
const Schema = mongoose.Schema;
const app = express();
app.use(express.json({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const axios=require('axios');
accountSid='AC6d48a9b4c6a3b6d8f034f1005f5e1202';
const authToken='66231fa7fc025e84c5716ec3d9efab1a';
const client= new twilio(accountSid, authToken);

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const food = mongoose.model("foods", new Schema({ 
    id: ObjectId,
    data: String,
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
                    if(!indFood.status) {
                        allFood[indFood._id] = indFood;
                    }
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

    app.get("/food/email/:email", (req, res) => {
        const email = req.params.email;
        food.find({email}, function(err, allFoodOfEmail) {
            if (err) {
                throw new Error(err)
            } else {
                res.send(allFoodOfEmail); 
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
        console.log("Image data given: " + req.body.data);
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
        const userPhoneNumber=req.body.userPhoneNumber;
        let donorPhoneNumber=req.body.donorPhoneNumber;
        console.log("User phone: " + userPhoneNumber);
        console.log("Doner phone: " + donorPhoneNumber);
        console.log("Body: " + req.body);
        let donorAddress=req.body.donorAddress;
        const updateFood = {
            status: true
        }
        const url2= 'http://localhost:5000/food/' + id;
        food.findByIdAndUpdate(id, updateFood, function(err, docs) {
            if (err) {
                throw new Error(err);
            } else {
                //console.log("before axios 1");
                /*axios.get(url2).then(res => {
                    console.log("in axios 1");
                    if(!res.ok){
                        throw res;
                      }
                      return res.json();
                    }).then(data => {
                        url3='http://localhost:5000/users/' + data[0][email];
                        axios.get(url3).then(res => {
                            console.log("in axios 2");
                            if(!res.ok){
                                throw res;
                              }
                              return res.json();
                            }).then(data => {
                                donorNumber=data[0]["phoneNumber"];
                                donorAddress=data[0]["address"];
                              });
                      });
                let url = 'http://localhost:5000/users/' + userEmail;
                axios.get(url).then(res => {
                    console.log("in axios 3");
                if(!res.ok){
                    throw res;
                  }
                  return res.json();
                }).then(data => {
                    const userNumber=data[0]["phoneNumber"];
                  });*/
                client.messages.create({
                    body: "Someone is coming to pick up your food",
                    to: donorPhoneNumber,
                    from: '+19896144532'
                })
                client.messages.create({
                    body: "You registered to pick up food from " +donorAddress,
                    to: userPhoneNumber,
                    from: '+19896144532'
                })
                res.send(updateFood);
            }
        });
    })
}
