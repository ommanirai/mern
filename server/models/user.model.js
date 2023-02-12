const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // db_modelling
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // to remove white spaces
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phoneNumber: {
        type: Number
    },
    address: {
        tempAddress: [String],
        permanentAddress: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    dob: {
        type: Date
    },
    role: {
        type: Number, // 1 for admin, 2 for enduser
        default: 2
    },
    isActivated: { // flag
        type: Boolean,
        default: true,
    },
    image:{
        type: String,
    }
},{
    Timestamp: true // automate created and updated time
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel