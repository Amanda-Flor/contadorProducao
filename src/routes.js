const express = require('express')

const routes = express.Router()

const MaquinasController = require("./controllers/MaquinasController")

routes.get('/maquinas', MaquinasController.index)

module.exports = routes