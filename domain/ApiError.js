//klasse voor een ApiError 
class ApiError {
    //constructor voor de ApiError, loggen van inhoud, errorcode en tijd+datum
    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = Date()
    }
}
module.exports = ApiError;