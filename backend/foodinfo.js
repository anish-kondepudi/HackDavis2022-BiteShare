/*const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
app.use(express.json());

const food = mongoose.model("foods", new Schema({ 
    id: ObjectId,
}));


module.exports = function(app){
    app.get("/food", (req, res) => {
        const query = food.where(foodIdentification);
        query.findOne(function(err, foundFood) {
            console.log("Error: " + err);
            console.log("Found food: " + foundFood);
        })
    });
    app.post("/food", (req, res) => {
        newFood = {id: req.params.id};
        food.collection.insertOne(newFood, function(err, docs){
            if (err) {
                res.send({"Error": err});
            } else {
                res.send({"Success": true});
            }
        })
    })
}*/