const path = require("path");
const Contact = require('../models/contact');

exports.getContacts = (req, res, next ) => {
    res.send("Message");
}

exports.createContact = (req, res, next) => {
    console.log("createContact ", req.body);
    const { name, role, avatar, status, email, gender } = req.body;
    const contact = new Contact({
        name, role, avatar, status, email, gender
    });
    contact.save().then(result => {
        res.status(201).json({
            message: "Contact successfully creted"
        })
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}