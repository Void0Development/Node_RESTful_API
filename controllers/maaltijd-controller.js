const Maaltijd = require('../domain/Maaltijd')
const assert = require('assert')

let maaltijdlist = []

module.exports = {
    createMaaltijd(req, res, next){
        console.log('post maaltijd was called')
        console.log(req.body)

        const naam = req.body.naam
        const beschrijving = req.body.beschrijving
        const ingredienten = req.body.ingredienten
        const allergie = req.body.allergie
        const prijs = req.body.prijs

        const maaltijd = new Maaltijd(
            naam
            ,beschrijving
            ,ingredienten
            ,allergie
            ,prijs)

        maaltijdlist.push(maaltijd)

        res.status(200).json(maaltijd).end()
    },

    getAllMaaltijden(req,res,next){
        console.log('get all maaltijden was called')
        res.status(200).json(maaltijdlist).end()
    },

    


}