const path = require("path");
const express = require('express')
const bodyParser = require('body-parser');


const PORT = 3000;
const app = express();
const contactRoute = require("./routes/contactRoute");

app.use("/", contactRoute);
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
