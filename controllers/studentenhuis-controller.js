const db = require('../dbconfig/sqlconnect')
const ApiError = require('../domain/ApiError')
const auth = require('../auth/authMe')
const jwt = require('jwt-simple')
const config = require('../auth/config');



module.exports = {
    createStudentenhuis(req, res, next) {
        try {
            const name = req.body.naam
            const adres = req.body.adres

            const token = req.header('x-access-token') || ''
            const payload = jwt.decode(token, config.secretKey);
            console.log('create studentenhuis')
            // console.log(name + adres)
            console.log(payload.sub)
            db.query('SELECT id FROM `user` WHERE email="' + payload.sub.toString() + '"', function (error, result, fields) {
                console.log(result)
                console.log(result)
                if (error) {
                    next(error)
                } else {
                    db.query('INSERT INTO studentenhuis (Naam,Adres,UserID) VALUES ("' + name + '","' + adres + '","' + result[0].id + '")', function (error, rows, fields) {
                        if (name === '' || adres === '' || result[0].id <= 0 || typeof name !== 'string' || typeof adres !== 'string' || typeof result[0].id !== 'number') {
                            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
                        } else {
                            res.status(200).json({
                                status: {
                                    ID: result[0].id,
                                    naam: name,
                                    adres: adres,
                                    contact: 'zie email',
                                    email: payload.sub
                                },
                                result: rows
                            }).end()
                        }
                    })
                }
            })
        } catch (err) {
            throw (new ApiError(err.toString(), 412))
        }
    },

    getAllStudentenhuizen(req, res, next) {
        console.log('studenthuizen-controller getAll')
        db.query('SELECT * FROM studentenhuis', function (error, rows, fields) {
            if (error) {
                next(new ApiError('Poep',123))
            } else {
                res.status(200).json({
                    status: {
                        query: 'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },

    getStudenthuisById(req, res, next) {
        console.log('studentenhuisById get was called')
        const id = req.params.id
        db.query('SELECT * FROM studentenhuis WHERE ID=' + id, function (error, rows, fields) {
            if (rows.length === 0) {
                next(new ApiError('Niet gevonden(huisid bestaat niet)', 404))
            } else {
                res.status(200).json({
                    status: {
                        query: 'ok]'
                    },
                    result: rows
                }).end()
            }
        })
    },

    deleteStudentenhuis(req, res, next) {
        console.log('Studentenhuis delete was called')
        const id = req.params.id

        const token = req.header('x-access-token') || ''
        const payload = jwt.decode(token, config.secretKey);
        console.log(typeof id)
        db.query('SELECT UserID FROM studentenhuis WHERE id =' + id, function (error, result, fields) {
            console.log(typeof parseInt(result[0].UserID))
            console.log(parseInt(result[0].UserID))
            console.log(id)
            db.query('SELECT id FROM `user` WHERE email="' + payload.sub.toString() + '"', function (error, results, fields) {
                console.log(results)
                if (parseInt(results[0].id) != parseInt(result[0].UserID)) {
                    next(new ApiError('Conflict', 409)) 
                } else if (result.length === 0) {
                    next(new ApiError('Niet gevonden', 404)) 
                } else {
                    db.query('DELETE FROM studentenhuis WHERE ID =' + id, function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                            throw (new ApiError(error.toString(), 403))
                        } else {
                            res.status(200).json({
                                status: 200,
                                description: 'Studentenhuis with id: ' + id + 'delete'
                            }).end()
                        }
                    })
                }
            })
        })
    },

    updateStudentenhuis(req, res, next) {
        const id = parseInt(req.params.id)
        const naam = req.body.naam
        const adres = req.body.adres
        console.log(id + " " + naam + " " + adres)
        console.log(typeof id + typeof naam + typeof adres)
        //const id = req.params.id
        const token = req.header('x-access-token') || ''
        const payload = jwt.decode(token, config.secretKey);
        console.log(typeof id)
        console.log(typeof naam)
        console.log(typeof adres)
        db.query('SELECT UserID FROM studentenhuis WHERE id =' + id, function (error, result, fields) {
            console.log(typeof parseInt(result[0].UserID))
            console.log(parseInt(result[0].UserID))
            console.log(id)
            db.query('SELECT id FROM `user` WHERE email="' + payload.sub.toString() + '"', function (error, results, fields) {
                console.log(results)
                if (parseInt(results[0].id) != parseInt(result[0].UserID)) {
                    next(new ApiError('Conflict', 409))
                } else if (result.length === 0) {
                    next(new ApiError('Niet gevonden', 404))
                } else {
                    db.query('UPDATE studentenhuis SET naam =?, adres =? WHERE ID=?', [naam, adres, id], function (error, result, fields) {
                        if (name === '' || adres === '' || typeof naam === 'undefined'|| typeof adres === 'undefined' || id <= 0 || typeof name !== 'string' || typeof adres !== 'string' || id !== 'number') {
                            next(new ApiError('Een of meerdere properties in de request body ontbreken of zijn foutief',412))
                        } else {
                            res.status(200).json({
                                status: 200,
                                description: 'Studentenhuis updated'
                            })
                        }
                    })
                }
            })
        })

    }
}