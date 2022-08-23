const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://MichaelCuelli:${password}@fullstackhelsinki.t2yrylm.mongodb.net/phonebook?retryWrites=true&w=majority`


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phonebookSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        if(process.argv[3] === undefined || number === process.argv[4]){ 
            return PhoneBook.find({}).then(result => {
                console.log('phonebook');
                result.forEach(phonebook => {
                    console.log(phonebook);
                })
                mongoose.connection.close()
            });
        }else{
        const phonebook = PhoneBook({
            name: process.argv[3],
            number: process.argv[4]
        })

        return phonebook.save();
    }
    })
    .then(() => {
        if(process.argv[3] !== undefined && number !== process.argv[4]){ 
            console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        }
        return mongoose.connection.close()
    })
    .catch((err) => {
        console.log(err);
    })