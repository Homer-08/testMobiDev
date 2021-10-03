const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    registration_date: {
        type: Date
    },
    age: {
        type: Number
    },
    followers: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User