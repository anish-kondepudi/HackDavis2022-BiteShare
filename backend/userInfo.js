const express = require('express');

const app = express();
const port= process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(mongoose());
app.use(express.json());

const url = "mongodb+srv://dbUser:IIpKZGMaDoVjPt9e@cluster0.lq8ew.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(url).then(
    () => {
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
    },
    err => {
        console.log("Error" + err);
    }
);

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
app.listen(PORT, () => `Server running on port ${PORT}`);

