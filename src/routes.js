const express = require('express')

const routes = express.Router()

const MaquinasController = require("./controllers/MaquinasController")

routes.get('/maquinas', MaquinasController.index)
routes.post('/maquinas', MaquinasController.create)
routes.put('/maquinas/:cod_maquina', MaquinasController.update)
routes.delete('/maquinas/:cod_maquina', MaquinasController.delete)


module.exports = routes