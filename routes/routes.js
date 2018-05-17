const StudentenhuisController = require('../controllers/studentenhuis-controller')
const mconstroller = require('../controllers/maaltijd-controller')
let express = require('express');
let routes = express.Router();







routes.post('/studentenhuis', StudentenhuisController.createStudentenhuis)

routes.get('/studentenhuis', StudentenhuisController.getAllStudentenhuizen)

routes.get('/studentenhuis/:id', StudentenhuisController.getStudenthuisById)

routes.delete('/studentenhuis/:id', StudentenhuisController.deleteStudentenhuis)

routes.put('/studentenhuis/:id', StudentenhuisController.updateStudentenhuis)

routes.get('/studentenhuis/:id/maaltijd', mconstroller.getAllMaaltijden)

routes.get('/studentenhuis/:id/maaltijd/:id2', mconstroller.getMaaltijdById)

routes.post('/studentenhuis/:id/maaltijd', mconstroller.createMaaltijd)

routes.delete('/studentenhuis/:id/maaltijd/:id2', mconstroller.deleteMaaltijdById)

routes.put('/studentenhuis/:id/maaltijd/:id2', mconstroller.updateMaaltijdById)



module.exports = routes;