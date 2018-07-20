const express = require('express')
const bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {ObjectID} = require('mongodb')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

const app = express()
const port = process.env.PORT || 3000;
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save()
    .then((doc) => {
        res.send(doc)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({
                todos
            })
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    console.log(id)

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            message: "ID is not valid."
        })
    }

    Todo.findById(id)
        .then((todos) => {
            if (todos) {
                res.send({
                    todos
                })
            }
            else {
                res.status(404).send({
                    message: "Todo not found."
                })
            }
        })
        .catch((err) => {
            res.status(404).send({
                message: "Couldn't search for Todo."
            })
        })
})

app.listen(port, () => {
    console.log(`Started on port ${port}...`)
})

module.exports = {
    app
}