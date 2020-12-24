const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const contactControler = require("../controllers/contactController");

router.get('/contacts', contactControler.getContacts)
router.post('/contacts', 
[ 
    body('name').trim().isLength({min: 3})
], 
contactControler.createContact)
module.exports = router;