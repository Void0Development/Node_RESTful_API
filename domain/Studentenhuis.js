//Studentenhuis class

const assert = require('assert')
const ApiError = require('./ApiError')

class Studentenhuis{
    constructor(naam, adres){
        try{
            assert(typeof(naam)==='string', 'naam must be a string')
            assert(typeof(adres)=== 'string', 'adres must be a string')
            assert(naam !== '', 'Naam was empty')
            assert(adres !== '', 'Adres was empty')
        }catch(ex){
            throw(new ApiError(ex.toString(),412))
        }
        this.naam = naam
        this.adres = adres
    }
}

module.exports = Studentenhuis