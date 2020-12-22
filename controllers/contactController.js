const path = require("path");
const Contact = require('../models/contact');
const { validationResult  } = require("express-validator")

exports.getContacts = (req, res, next ) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({message: "Fetched all contacts.", contacts: contacts})
        }).catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next();
        })
}

exports.createContact = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation error, incorrect input.");
        error.statusCode = 422;
        throw error;
    }
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