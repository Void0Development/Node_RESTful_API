const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const authTest = require('./authentication.routes.test')

chai.should()
chai.use(chaiHttp)

let key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY1MDQ5NDQsImlhdCI6MTUyNjUwMTM0NCwic3ViIjoiaGJkZHJpbW1AYXZhbnMubmwifQ.7vDvT6KzzNWFiGofit8Sqgb80ZzfH9GiumVYm4Om3O4'
describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        let token = 'kdfj'
        chai.request(server)
        .post('/api/studentenhuis')
        .set('x-access-token', token)
        .send({"naam": "Harm van Drimmelen", "adres": "Terheijdenseweg 190"})
        .end(function(error, res){res.should.have.status(401)})
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        //let key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY0OTcwNTQsImlhdCI6MTUyNjQ5MzQ1NCwic3ViIjoiaGJkZHJpbW1AYXZhbnMubmwifQ.8mrZbVj9CftVuFJD7cyOPQwE7ZRn-DAELZUly94pQLg'
        chai.request(server)
        .post('/api/studentenhuis')
        .set('x-access-token',  key)
        .send({"naam": "Harm van Drimmelen", "adres": "Terheijdenseweg 190"})
        .end(function(error, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
        })
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        //let key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY0OTcwNTQsImlhdCI6MTUyNjQ5MzQ1NCwic3ViIjoiaGJkZHJpbW1AYXZhbnMubmwifQ.8mrZbVj9CftVuFJD7cyOPQwE7ZRn-DAELZUly94pQLg'
        chai.request(server)
        .post('/api/studentenhuis')
        .set('x-access-token', key)
        .send({"adres": "Terheijdenseweg 190"})
        .end(function(error, res){
            res.should.have.status(412)
        })
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        //let key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY0OTcwNTQsImlhdCI6MTUyNjQ5MzQ1NCwic3ViIjoiaGJkZHJpbW1AYXZhbnMubmwifQ.8mrZbVj9CftVuFJD7cyOPQwE7ZRn-DAELZUly94pQLg'
        chai.request(server)
        .post('/api/studentenhuis')
        .set('x-access-token', key)
        .send({"naam": "Harm van Drimmelen"})
        .end(function(error, res){
            res.should.have.status(412)
        })
        done()
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        let token = 'kdfj'
        chai.request(server)
        .get('/api/studentenhuis')
        .set('x-access-token', token)
        .end(function(error, res){res.should.have.status(401)})
        done()
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/studentenhuis')
        .set('x-access-token', key)
        .end(function(error, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
        })
        done()
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        let token = 'kdfj'
        chai.request(server)
        .get('/api/studentenhuis/1')
        .set('x-access-token', token)
        .end(function(error, res){res.should.have.status(401)})
        done()
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/studentenhuis/1')
        .set('x-access-token', key)
        .end(function(error, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
        })
        done()
    })

    it('should return an error when using an non-existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .get('/api/studentenhuis/1000')
        .set('x-access-token', key)
        .end(function(error, res){
            res.should.have.status(404)

        })
        done()
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        let token = 'kdfj'
        chai.request(server)
        .put('/api/studentenhuis/1')
        .set('x-access-token', token)
        .end(function(error, res){res.should.have.status(401)})
        done()
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .put('/api/studentenhuis/1')
        .set('x-access-token', key)
        .send({"naam": "Harm van Drimmelen", "adres": "Terheijdenseweg 190"})
        .end(function(error, res){
            res.should.have.status(200)
            res.body.should.be.a('object')
        })
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .put('/api/studentenhuis/3')
        .set('x-access-token', key)
        .send({
            "adres": "Terheijdenseweg 190"
        })
        .end(function(error, res){
            res.should.have.status(409)
        })
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .put('/api/studentenhuis/3')
        .set('x-access-token', key)
        .send({"naam": "Harm van Drimmelen"})
        .end(function(error, res){
            res.should.have.status(412)
        })
        done()
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        let token = 'kdfj'
        chai.request(server)
        .delete('/api/studentenhuis/1')
        .set('x-access-token', token)
        .end(function(error, res){res.should.have.status(401)})
        done()
    })

})