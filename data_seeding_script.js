const User = require('./model/users')
const Connection = require('./model/connections')
const faker = require('faker')
const UserCount = 100
const ConnectionCount = 300

function dataSeedingScript() {
    User.countDocuments((err, result) => {
        if (err) {
            console.log(err)
        }
        if (result != UserCount) {
            User.collection.deleteMany()
            for (let i = 0; i <= UserCount - 1; i++) {
                const user = new User({
                    name: faker.name.firstName(),
                    surname: faker.name.lastName(),
                    registration_date: faker.date.past(),
                    age: faker.datatype.number({ 'min': 18, 'max': 100 })
                })
                user.save()
            }
        }
    })
    Connection.countDocuments((err, result) => {
        if (err) {
            console.log(err)
        }
        if (result != ConnectionCount) {
            Connection.collection.deleteMany()
            User.find({})
                .then((result) => {
                    for (let i = 0; i <= ConnectionCount - 1; i++) {
                        const conn = new Connection({
                            follower: result[faker.datatype.number({ 'min': 1, 'max': 99 })]._id,
                            following: result[faker.datatype.number({ 'min': 1, 'max': 99 })]._id
                        })
                        if (conn.follower == conn.following) {
                            conn.follower = result[faker.datatype.number({ 'min': 1, 'max': 99 })]._id
                            conn.following = result[faker.datatype.number({ 'min': 1, 'max': 99 })]._id
                        }
                        conn.save()
                    }
                })
        }
    })
}


module.exports = { dataSeedingScript }