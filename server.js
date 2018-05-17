let http = require('http');
let express = require('express');
let bodyParser	= require('body-parser');
let ApiError = require('./domain/ApiError.js')
let studentenhuis_routes = require('./routes/routes')
const authRouter= require('./routes/auth_routes');
//const logonRouter= require('./routes/logon_routes');
//const regRouter= require('./routes/reg_routes');
const AuthController = require('./controllers/auth_control');

let app = express();

let port = process.env.PORT || 3000 // heroku || local

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//alle requests weergeven
app.all('*', function(req, res, next){
    console.log( req.method + " " + req.url);
    next();
});

app.use(express.static(__dirname + '/public'));


app.use('/api', authRouter);
//app.use('/api/login', logonRouter);

// On all other routes, check for API key
app.all('*', AuthController.validateToken);


//routing van de API
app.use('/api', studentenhuis_routes);
app.use('/api', require('./routes/status')); //status van db verifieren



//error voor niet bestaande endpoints
app.use('*', function (req, res, next) {
	const endpointEerror = new ApiError("This endpoint does not exist", 404)
	next(endpointEerror )
})

//Error verwerken
app.use((err, req, res, next) => {

	if (err instanceof require('assert').AssertionError) {
		console.log('AssertionError: ' + err)
		err.code = 500
	} else if (err instanceof ApiError) {
		console.log('ApiError: ' + err)
	} else {
		console.log('Other Error: ' + err)
	}

	res.status(err.code).json(err).end()	
})




app.listen(port, function() {
    console.log('Server gestart op localhost:'+ port);
});

module.exports = app;