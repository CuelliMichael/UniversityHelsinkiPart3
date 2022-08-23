const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://MichaelCuelli:${password}@fullstackhelsinki.t2yrylm.mongodb.net/person?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        if (process.argv[3] === undefined || process.argv[4] === undefined) {
            return Person.find({}).then(result => {
                console.log('person')
                result.forEach(person => {
                    console.log(person)
                })
                mongoose.connection.close()
            })
        } else {
            const person = Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            return person.save()
        }
    })
    .then(() => {
        if (process.argv[3] !== undefined &&  process.argv[4] !== undefined) {
            console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        }
        return mongoose.connection.close()
    })
    .catch((err) => {
        console.log(err)
    })