const express = require("express");
const router = express.Router();
const contactControler = require("../controllers/contactController");

router.get('/contacts', contactControler.getContacts)
router.post('/contact', [ 
] , contactControler.createContact)
module.exports = router;