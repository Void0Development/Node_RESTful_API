const StudentenhuisController = require('../controllers/studentenhuis-controller')
let express = require('express');
let routes = express.Router();





routes.post('/studentenhuis', StudentenhuisController.createStudentenhuis)

routes.get('/studentenhuis', StudentenhuisController.getAllStudentenhuizen)

routes.get('/studentenhuis/:id', StudentenhuisController.getStudenthuisById)

routes.delete('/studentenhuis/:id', StudentenhuisController.deleteStudentenhuis)

routes.put('/studentenhuis/:id', StudentenhuisController.updateStudentenhuis)

module.exports = routes;