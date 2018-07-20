var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

// var newTodo = new Todo({
//     text: "Cook dinner",
// })

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc)
// }).catch((err) => {
//     console.log("Unable to save todo", err)
// }) 

var newUser = new User({
    emai:"theoanastasiadis98@gmail.com"
})

newUser.save()
    .then((doc) => {
        console.log('Added User succesfully', doc)
    })
    .catch((err) => {
        console.log('Unable to add user', err)
    })
