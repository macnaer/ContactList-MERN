const express = require("express");
const router = express.Router();
const contactControler = require("../controllers/contactController");

router.get('/contacts', contactControler.getContacts)
module.exports = router;