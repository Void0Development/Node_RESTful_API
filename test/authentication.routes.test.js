/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const assert = chai.assert;    
const expect = chai.expect;    
const should = chai.should();  

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {

    it('should return a token when providing valid information', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        // Tip: deze test levert een token op. Dat token gebruik je in 
        // andere testcases voor beveiligde routes door het hier te exporteren
        // en in andere testcases te importeren via require.
        // validToken = res.body.token
        // module.exports = {
        //     token: validToken
        // }

       
        chai.request(server)
            .post('/api/register')
             .send({
                 "firstname": "test",
                 "lastname" : "gebruiker",
                 "email": "gebruiker13337@test.co",
                 "password":"SECURETEAM"
             })
             .end((err,res)=>{
                 res.should.have.status(200)
                 const response = res.body
                 response.should.have.property('token').which.is.an('string')
                 validToken = res.body.token
                 done()
             })
             module.exports = {
               token: validToken
              }



        //sdone()
    })

    it('should return an error on GET request', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)

        .get('/api/register')

        .end((err,res)=>{
            res.should.have.status(401)  
            done()         
        })

    })

    it('should throw an error when the user already exists', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
         .send({
                "firstname": "test",
                 "lastname" : "gebruiker",
                 "email": "gebruiker13337@test.co",
                 "password":"SECURETEAM"
         })
        chai.request(server)
        .post('/api/register')
         .send({
                "firstname": "test",
                 "lastname" : "gebruiker",
                 "email": "gebruiker13337@test.co",
                 "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })


    })

    it('should throw an error when no firstname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
        .post('/api/register')
         .send({
             "lastname" : "DOOM",
             "email": "test@test.de",
             "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })

    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
        .post('/api/register')
         .send({
             "firstname" : "a",
             "lastname" : "DOOM",
             "email": "test@test.de",
             "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })


    })

    it('should throw an error when no lastname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
         .send({
             "firstname" : "amd",
             "email": "test@test.de",
             "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
         .send({
             "firstname" : "amd",
             "lastname" : "x",
             "email": "test@test.de",
             "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })
    })

    it('should throw an error when email is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
         .send({
             "firstname" : "amd",
             "lastname" : "klangextase",
             "email": "t",
             "password":"SECURETEAM"
         })
         .end((err,res)=>{
             res.should.have.status(412)
             const response = res.body
             response.should.have.property('code').equals(412)
             done()
         })
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
         .send({
                "firstname": "test",
                 "lastname" : "gebruiker",
                 "email": "gebruiker13337@test.co",
                 "password":"SECURETEAM"
         })

        chai.request(server)
        .post('/api/login')
        .send({
            "email": "gebruiker13337@test.co",
            "password":"SECURETEAM"
        })
        .end((err,res)=>{
            res.should.have.status(200)
            const response = res.body
            response.should.have.property('token').which.is.an('string')
            done()
        })
    })

    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //


        chai.request(server)
        .post('/api/login')
        .send({
            "password":"testme"
        })
        .end((err,res)=>{
            res.should.have.status(412)
            const response = res.body
            done()
        })
        
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
                 "email": "gebruiker13337@test.co",
                 "password":"nonono"
        })
        .end((err,res)=>{
            res.should.have.status(401)
            const response = res.body
            done()
        })


    })

    it('should throw an error when using an invalid email', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
            "email": "t4324823",
            "password":"nein"
        })
        .end((err,res)=>{
            res.should.have.status(401)
            const response = res.body
            done()
        })


    })

})