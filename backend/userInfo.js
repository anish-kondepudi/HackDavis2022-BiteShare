const express = require('express');
const router=express.Router();
const app = express();
const port= process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(mongoose());
app.use(express.json());
app.use('/', router);
const url = "mongodb+srv://dbUser:IIpKZGMaDoVjPt9e@cluster0.lq8ew.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(url).then(
    () => {
        console.log("Connected");
    },
    err => {
        console.log("Error" + err);
    }
);
let database = mongoose.connection;
let userSchema= new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    Address: String,
    phoneNumber: String
});

let userModel=mongoose.model('users',userSchema);
module.exports=mongoose.model("Users", userModel);
app.get('/', function(req,res,next){
    console.log("Connected");
});
app.listen(PORT, () => `Server running on port ${PORT}`);
