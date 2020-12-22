const path = require("path");
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactRoute = require("./routes/contactRoute");
const PORT = 8000;
const app = express();

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    next();
})

app.use("/api/", contactRoute);
app.use((error, req, res, next) => {
    console.log("app.js error ", error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json()({message: message});
})


mongoose.connect(
    'mongodb+srv://master:masterpass@contactlistcluster.djhii.mongodb.net/ContactList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))   
}).catch(error => console.log(error));


