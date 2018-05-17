const db = require('../dbconfig/sqlconnect')



module.exports = {
    createStudentenhuis(req,res,next){
         const name = req.body.naam
         const adress = req.body.adres
        console.log('create studentenhuis')
        // console.log(name + adress)
        db.query('INSERT INTO studentenhuis (naam,adres) VALUES ("' + 1 + '","' + name+ '","' + adress+ '","' + 1 +'")', function(error,rows,fields){
            if(error){
                next(error)
            }else{
                res.status(200).json({
                    status: {
                        query:'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },

    getAllStudentenhuizen(req,res,next){
        console.log('studenthuizen-controller getAll')
        db.query('SELECT * FROM studentenhuis', function(error, rows, fields){
            if(error){
                next(error)
            }else{
                res.status(200).json({
                    status: {
                        query: 'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },

    getStudenthuisById(req,res, next){
        console.log('studentenhuisById get was called')
        const id = req.params.id
        db.query('SELECT * FROM studentenhuis WHERE ID=' + id, function(error, rows, fields){
            if(error){
                next(error)
            }else{
                res.status(200).json({
                    status: {
                        query: 'ok'
                    },
                    result: rows
                }).end()
            }
        })
    },

    deleteStudentenhuis(req, res, next){
        console.log('Studentenhuis delete was called')
        const id = parseInt(req.body.id)
        db.query('DELETE FROM studentenhuis WHERE ID ='+ id, function(error,rows, fields){
            if(error){
                res.status(500).json({
                    status: 500,
                    description: error.message || error
                }).end()
            }else{
                res.status(200).json({
                    status:200,
                    description: 'Studentenhuis with id: ' + id + 'delete'
                }).end()
            }
        })
    },

    updateStudentenhuis(req,res,next){
        const id = req.params.id
        const naam = req.body.naam
        const adres = req.body.adres
        console.log(id + " " + naam + " " + adres)

        db.query('UPDATE studentenhuis SET naam =' + naam + ', adres =' + adres + ' WHERE ID=' + id, function(req,res,next){
            if(error){
                response.status(500).json({
                    status: 500,
                    description: error.message || error
                }).end()
            }else{
                response.status(200).json({
                    status: 200,
                    description: 'Studentenhuis updated'
                })
            }
        })
    }
}