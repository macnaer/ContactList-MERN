const path = require("path");
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactRoute = require("./routes/contactRoute");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use("/api/", contactRoute);


mongoose.connect(
    'mongodb+srv://master:masterpass@contactlistcluster.djhii.mongodb.net/ContactList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))   
}).catch(error => console.log(error));


