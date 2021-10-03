const mongoose = require('mongoose')
const Schema = mongoose.Schema

const connSchema = new Schema({
    follower: {
        type: String
    },
    following: {
        type: String
    }
})

const Connection = mongoose.model('Connection', connSchema)

module.exports = Connection