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
    if (!req.file) {
        const error = new Error('No image.');
        error.statusCode = 422;
        throw error;
    }
        const imageUrl = req.file.path;
        console.log("createContact ", req.body);
        const { name, role, avatar, status, email, gender } = req.body;
        const contact = new Contact({
            name, role, avatar, status, email, gender, avatar: imageUrl
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

exports.getContact = (req, res, next) => {
    const contactId = req.params.id;
    Contact.findById(contactId).then(contact => {
        if(!contact){
            const error = new Error("Contact not found.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: "Contact found", contact:contact})
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}