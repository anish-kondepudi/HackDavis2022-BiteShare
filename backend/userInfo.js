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
    console.log("hi");
    app.get("/users", (req, res) => {
        userModel.find().then(function(err, foundUser){
            console.log(foundUser);
            res.send(foundUser);
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
/*app.get("/users", (req, res) => {
    console.log("hi");
    const data = userModel.find();
    console.log(data);
    res.send(data);
});
*/