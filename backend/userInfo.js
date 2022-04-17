const express = require('express');
const router=express.Router();
const { ObjectId } = require("mongodb");
const app = express();
const port= process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
//app.use('/', router);
const url = "mongodb+srv://dbUser:IIpKZGMaDoVjPt9e@cluster0.lq8ew.mongodb.net/Cluster0?retryWrites=true&w=majority";

let database = mongoose.connection;
let userSchema= new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: String
});

let userModel=mongoose.model('users',userSchema);
module.exports=function(app){
    app.get("/users", (req, res) => {
        userModel.find({}, function(err, users) {
            if (err) {
                throw new Error(err)
            } else {
                var allUsers = {};

                users.forEach(function(eachUser) {
                  allUsers[eachUser._id] = eachUser;
                });

                res.send(allUsers); 
            } 
          });
    });
    app.get("/users/:email", (req, res) => {
        const email = req.params.email;
        userModel.find({email}, function(err, user) {
            if (err) {
                throw new Error(err)
            } else {
                res.send(user); 
            } 
          });
    });
    app.post("/addUser", (req, res) => {
        let newUser = req.body;
        userModel.collection.insertOne(newUser, function(err, docs){
            if (err) {
                res.send({"Error": err});
            } else {
                res.send({"Success": true});
            }
        })
    });
}

