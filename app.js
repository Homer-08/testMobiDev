const express = require('express')
const mongoose = require('mongoose')
const User = require('./model/users')
const Connection = require('./model/connections')
const { dataSeedingScript } = require('./data_seeding_script')

const Port = process.env.Port ?? 3000
const app = express()
const dbURL = 'mongodb+srv://Homer:qwerty12345@cluster0.tycci.mongodb.net/test?retryWrites=true&w=majority'
const UserCount = 100
const ConnectionCount = 300

mongoose.connect(dbURL, { useUnifiedTopology: true })
    .then(() => app.listen(Port, () => { console.log('Start...') }))
    .catch((err) => console.log(err))

dataSeedingScript()

app.get('/popular', (req, res) => {
    User.find({})
        .then((result) => {
            for (let i = 0; i <= UserCount - 1; i++) {
                let currentID = result[i]._id
                Connection.find({ following: { '$eq': currentID } }).count().then((numConn) => {
                    User.updateOne({ _id: currentID._id }, { $set: { followers: numConn } }, () => { })
                })
            }
        })
    User.find({}, { __v: 0 }).sort({ followers: -1 }).limit(3).then((popular) => {
        res.send(popular)
    })
})

app.get('/friendscount', (req, res) => {
    let friendsCount = 0
    Connection.find({})
        .then((resOne) => {
            for (let j = 0; j <= ConnectionCount - 1; j++) {
                for (let k = 0; k <= ConnectionCount - 1; k++) {
                    if ((resOne[j].follower == resOne[k].following) && (resOne[j].following == resOne[k].follower)) {
                        friendsCount++
                    }
                }
            }
            res.send('Friends count: ' + friendsCount.toString())
        })

})