const express = require('express');

const app = express();
const port= process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const url = "mongodb+srv://dbUser:IIpKZGMaDoVjPt9e@cluster0.lq8ew.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(url).then(
    () => {
        console.log("Connected! Now finding ... ");
        app.listen(5000, () => {
            console.log("Listening at port 5000!");
        });
    },
    err => {
        console.log("Error" + err);
    }
);

