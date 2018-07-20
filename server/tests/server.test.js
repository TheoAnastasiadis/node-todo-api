const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const {ObjectID} = require('mongodb')

const todos = [{
    text: "First test todo",
    _id: '5b51d4739aa1684160e933f2'
},{
    text: "Second test todo",
    _id: '5b51d9337a5d13382863bbfa'
}]

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
           return Todo.insertMany(todos) 
        })
        .then(() => done()) 
})

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = "Test todo text"

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find({text})
                .then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                })
                .catch((err) => done(err))
            })
    })


    it('should not create todo with invalid text field', (done) => {
        var text = ""

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .expect((res) => {
                expect(typeof res.body.text).toBe('undefined')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find()
                .then((todos) => {
                    expect(todos.length).toBe(2)
                    done()
                })
                .catch((err) => done(e))
            })
    })
})

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app).get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return 404 if ID not valid', (done) => {
        var wrongID = '123'
        request(app).get(`/todos/${wrongID}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe("ID is not valid.")
            })
            .end(done)
    })

    it('should return 404 when todo with non-existent ID is not found', (done) => {
        var nonExistentID = '5b51d9337a5d13382863bbf9'
        request(app).get(`/todos/${nonExistentID}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe("Todo not found.")
            })
            .end(done)
    })

    it('should return todo when ID exists', (done) => {
        request(app).get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe("First test todo")
            })
            .expect((res) => {
                expect(res.body.todos._id).toBe(todos[0]._id)
            })
            .end(done)
    })
})