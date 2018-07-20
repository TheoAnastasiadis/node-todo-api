// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017',{ 
    useNewUrlParser: true 
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server!')
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')
    //deleteMany
    db.collection('Todos').deleteMany({
        text: "Eat lunch"
    })
    .then(result => result.result)
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log('Unable to delete', err)
    })

})

