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

<<<<<<< HEAD
<<<<<<< HEAD
app.get('/', function(req,res,next){
    mongoose.connect(url).then(
        () => {
            let dbo = db.db("BiteShare");
            dbo.collection("Login_Table").find().then(users => res.json(users))
        },
        err => {
            console.log("Error" + err);
        }
    );
});

=======
>>>>>>> b37ca6d (api user get)
=======
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
/*app.get("/users", (req, res) => {
    console.log("hi");
    const data = userModel.find();
    console.log(data);
    res.send(data);
});
<<<<<<< HEAD
>>>>>>> e9949c6 (temp2)
app.listen(PORT, () => `Server running on port ${PORT}`);
=======
*/
>>>>>>> fd67a27 (User post added)
