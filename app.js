const path = require("path");
const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const contactRoute = require("./routes/contactRoute");
const PORT = 8000;
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
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


