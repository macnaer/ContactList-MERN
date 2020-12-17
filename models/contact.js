const mongoose = "mongoose";
const Schema = mongoose.Schema;
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        avatar: {
            type: Number,
        },
        status: {
            type: String,
        },
        email:{
            type: String,
            reqired: true
        },
        gender: {
            type: String,
            reqired: true
        }

    }
)

module.exports = mongoose.model("Contact", contactSchema);

// created: '2013/08/08',

