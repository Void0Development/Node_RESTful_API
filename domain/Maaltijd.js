// Maaltijd class

const assert = require('assert')
const ApiError = require('./ApiError')





class Maaltijd{
    constructor(naam, beschrijving, ingredienten, allergie, prijs){
        try{
            assert(typeof(naam)=== 'string', 'name must be a string')
            assert(typeof(beschrijving)=== 'string', 'beschrijving must be a string')
            assert(typeof(ingredienten)=== 'string', 'ingredienten must be a string')
            assert(typeof(allergie)=== 'string', 'allergie must be a string')
            assert(typeof(prijs)=== 'number', 'prijs must be a int')
        }
        catch(ex){
            throw(new ApiError(ex.toString(),422))
        }
        this.naam = naam
        this.beschrijving = beschrijving
        this.ingredienten = ingredienten
        this.allergie = allergie
        this.prijs = prijs
    }
}

module.exports = Maaltijd