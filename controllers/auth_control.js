const auth = require('../auth/authMe');
const assert = require('assert');
const moment = require('moment');
const db = require('../dbconfig/sqlconnect');
const ApiError = require('../domain/ApiError');

module.exports = {

       validateToken(request, response, next) {
        console.log('Validation of token requested');
        const token = request.header('x-access-token') || '';
            auth.decodeToken(token, (error, payload) => {
                if(error) {
                   response.status(401).json({
                    message: "Niet geautoriseerd (geen valid token)",
                    code: 401,
                    datetime: moment().format()
                }).end();
                } else {
                    console.log('Authenticated! Payload = ');
                    console.dir(payload);
                    request.user = payload.sub;
                    next();
                }
            });
        },

    login(req, res, next) {
        try {
            console.log('Login attempt');
            const email = req.body.email || '';
            const password = req.body.password || '';

            console.log('Username ' + email + ' password ' + password);


            assert(email !== '', 'Username was not defined or passed as empty');
            assert(password !== '', 'Password was not defined or passed as empty');
            assert(typeof(email) === 'string', 'Username is not of type string');
            assert(typeof(password) === 'string', 'Password is not of type string');
           assert(email.trim().length > 6, "Email meer dan 2 chars");

           assert(password.trim().length > 2, "Wachtwoord meer dan 2 chars");


        

            db.query('SELECT * FROM user WHERE Email=? AND Password=?', [email, password], (error, rows, fields) => {
               if(error) {
                   res.status(500).json({
                       status: 500,
                       description: error.message 
                   }).end();
                   console.log('Internal error');
               } else {
                   if(rows.length > 0) {

                       const token = auth.encodeToken(email /*, id*/);
                       res.status(200).json({
                           token: token,
                           email: email
                       }).end();
                       console.log('Successfull login!');
                   }  else {
                       res.status(401).json({
                           message: "Niet geautoriseerd (geen valid token)",
                           code: 401,
                           datetime: moment().format()
                       }).end();
                       console.log('Invalid login!');
                   }
               }
            });
        } catch (err) {
            throw (new ApiError(err.toString(), 412))
        
        }
    } ,

    register(req, res, next) {
        try {
            console.log('Registration attempt');
            const firstname = req.body.firstname || '';
            const lastname = req.body.lastname || '';
            const email = req.body.email || '';
            const password = req.body.password || '';


  
            assert(firstname!== '', 'Email was not defined or passed as empty');
            assert(lastname!== '', 'Email was not defined or passed as empty');
            assert(email!== '', 'Email was not defined or passed as empty');
            assert(password !== '', 'Password was not defined or passed as empty');
            assert(typeof(firstname) === 'string', 'Username is not of type string');
            assert(typeof(lastname) === 'string', 'Password is not of type string');
            assert(typeof(email) === 'string', 'Username is not of type string');
            assert(typeof(password) === 'string', 'Password is not of type string');
            
            assert(firstname.trim().length > 2, "Voornaam meer dan 2 chars");
            assert(lastname.trim().length > 2, "Achternaam meer dan 2 chars");
            assert(email.trim().length > 2, "Email meer dan 2 chars");
            assert(password.trim().length > 2, "Wachtwoord meer dan 2 chars");


            db.query('SELECT * FROM user WHERE Email=? AND Password=?;', [email, password], (error, rows, fields) => {
                if(error) {
                    res.status(500).json({
                        status: 500,
                        description: error.message || error
                    }).end();
                } else {
                    if(rows.length > 0) {
                        res.status(412).json({
                            message: "Een account met deze inlogdata bestaat al",
                           code: 412,
                           datetime: moment().format()
                        }).end();
                    }  else {
                        db.query('INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (?,?,?,?);', [firstname, lastname, email, password], (error, rows, fields) => {
                            const token = auth.encodeToken(email);
                            res.status(200).json({
                                status: 200,
                                description: 'Account aaangemaakt',
                                token: token
                            }).end();
                        });
                    }
                }
            });
        } catch (err) {
            throw (new ApiError(err.toString(), 412))
        }
    }
    
    
};

