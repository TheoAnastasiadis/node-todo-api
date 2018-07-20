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
    db.collection('Todos').find().count()
    .then((count) => {
        console.log('Todos count: ')
        console.log(JSON.stringify(count, undefined, 2))
        client.close()
    })
    .catch((err) => {
        console.log('Unable to fetch todos', err)
        client.close()
    })

})

