const db = require('../dbconfig/sqlconnect')
const auth = require('../auth/authMe')
const jwt = require('jwt-simple')
const config = require('../auth/config')
const ApiError = require('../domain/ApiError')

module.exports = {
    createMaaltijd(req, res, next) {
        console.log('post maaltijd was called')
        const id = parseInt(req.params.id)
        const name = req.body.naam
        const beschrijving = req.body.beschrijving
        const ingredienten = req.body.ingredienten
        const allergie = req.body.allergie
        const prijs = req.body.prijs

        const token = req.header('x-access-token') || ''
        const payload = jwt.decode(token, config.secretKey);

        console.log('create maaltijd')
        // console.log(name + adress)
        console.log(id)
        db.query('SELECT userId FROM studentenhuis WHERE id="' + id + '"', function (error, result, fields) {
            console.log(payload.sub.toString())
            console.log(result)
            if (result.length === 0) {
                console.log(result)
                console.log(payload.sub.toString())
                next(new ApiError('Niet gevonden'), 404)
            } else {
                db.query('INSERT INTO maaltijd (Naam,Beschrijving,Ingredienten,Allergie,Prijs,UserID,StudentenhuisID) VALUES ("' +
                    name + '","' +
                    beschrijving + '","' +
                    ingredienten + '","' +
                    allergie + '","' +
                    prijs + '","' +
                    result[0].userId + '","' +
                    result[0].userId + '")', function (error, rows, fields) {
                        if (name === '' || beschrijving === '' || ingredienten === '' || allergie === '' || prijs < 0 || result[0].userId <= 0 || typeof name !== 'string' || typeof beschrijving !== 'string' || ingredienten !== 'string' || allergie !== 'string' || prijs !== 'number' || result[0].userId !== 'number') {
                            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief'), 412)
                        } else {
                            res.status(200).json({
                                status: {
                                    query: 'De maaltijd is toegevoegd'
                                },
                                result: rows
                            }).end()
                        }
                    })
            }
        })
    },

    getAllMaaltijden(req, res, next) {
        console.log('get all maaltijden was called')
        const id = parseInt(req.params.id)
        db.query('SELECT * FROM maaltijd WHERE studentenhuisID = ' + id, function (error, rows, fields) {
            if (rows.length === 0) {
                next(new ApiError('Niet gevonden'), 404)
            } else {
                res.status(200).json(rows).end()
            }
        })
    },

    getMaaltijdById(req, res, next) {
        console.log('get maaltijd by id was called')
        const id = req.params.id
        const id2 = req.params.id2
        db.query('SELECT * FROM maaltijd WHERE ID=? AND studentenhuisID=?', [id2, id], function (error, rows, fields) {
            if (rows.length === 0) {
                next(new ApiError('Niet gevonden (huisId of maaltijdid bestaat niet'), 404)
            } else {
                res.status(200).json(rows).end()
            }
        })
    },

    deleteMaaltijdById(req, res, next) {
        console.log('delete maaltijd by id was called')
        const id = parseInt(req.params.id)
        const id2 = pasreInt(req.params.id2)

        const token = req.header('x-access-token') || ''
        const payload = jwt.decode(token, config.secretKey);
        console.log(typeof id)
        db.query('SELECT UserID FROM studentenhuis WHERE id =' + id, function (error, result, fields) {
            console.log(typeof parseInt(result[0].UserID))
            console.log(parseInt(result[0].UserID))
            console.log(id)
            if (result.length === 0) {
                next(new ApiError('Niet gevonden', 404))
            } else {
                db.query('SELECT id FROM `user` WHERE email="' + payload.sub.toString() + '"', function (error, results, fields) {
                    console.log(results)
                    if (parseInt(results[0].id) != parseInt(result[0].UserID)) {
                        next(new ApiError('Conflict', 409))
                    } else {
                        db.query('DELETE FROM maaltijd WHERE ID= ' + id2, function (error, rows, fields) {
                            if (rows.length===0) {
                                next(new ApiError('Niet gevonden', 404))
                            } else {
                                res.status(200).json({
                                    status: 200,
                                    description: 'Deleted maaltijd with id: ' + id2
                                }).end()
                            }
                        })
                    }
                })
            }
        })
    },

    updateMaaltijdById(req, res, next) {
        console.log('update maaltijd by id was called')
        const id = parseInt(req.params.id)
        const id2 = parseInt(req.params.id2)

        const naam = req.body.naam
        const beschrijving = req.body.beschrijving
        const ingredienten = req.body.ingredienten
        const allergie = req.body.allergie
        const prijs = req.body.prijs

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
                } else {
                    db.query('SELECT id FROM maaltijd WHERE studentenhuis =' + id2, function (error, results, fields) {
                        if (results.length === 0) {
                            next(new ApiError('Niet gevonden'), 404)
                        } else if (id2 != id) {
                            next(new ApiError('Conflict', 409))
                        } else {
                            db.query('UPDATE maaltijd SET Naam= ' +
                                naam + ',Beschrijving= ' +
                                beschrijving + 'Ingredienten= ' +
                                ingredienten + 'Allergie= ' +
                                allergie + 'Prijs= ' +
                                prijs + 'WHERE ID= ' + id, function (error, rows, fields) {
                                    if (naam === '' || beschrijving === '' || ingredienten === '' || allergie === '' || prijs < 0 || naam !== 'string' || beschrijving !== 'string' || ingredienten !== '' || allergie !== '' || prijs !== 'number') {
                                        next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
                                    } else {
                                        res.status(200).json({
                                            status: 200,
                                            description: 'Studentenhuis updated'
                                        })
                                    }
                                })
                        }
                    })
                }
            })
        })
    }


}