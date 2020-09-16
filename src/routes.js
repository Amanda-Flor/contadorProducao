const express = require('express')

const routes = express.Router()

const MaquinasController = require("./controllers/MaquinasController")
const ClientesController = require("./controllers/ClientesController")
const FuncionariosController = require("./controllers/FuncionariosController")
const AcessosController = require("./controllers/AcessosController")
const ProdutosController = require("./controllers/ProdutosController")
const PedidosController = require("./controllers/PedidosController")
const OrdemProducaoController = require("./controllers/OrdemProducaoController")
const PedidosProdutosController = require("./controllers/PedidosProdutosController")
const ProducoesController = require("./controllers/ProducoesController")

// CRUD Maquinas
routes.get('/maquinas', MaquinasController.index)
routes.post('/maquinas', MaquinasController.create)
routes.put('/maquinas/:cod_maquina', MaquinasController.update)
routes.delete('/maquinas/:cod_maquina', MaquinasController.delete)

// CRUD Clientes
routes.get('/clientes', ClientesController.index)
routes.post('/clientes', ClientesController.create)
routes.put('/clientes/:cod_cliente', ClientesController.update)
routes.delete('/clientes/:cod_cliente', ClientesController.delete)

// CRUD Funcionarios
routes.get('/funcionarios', FuncionariosController.index)
routes.post('/funcionarios', FuncionariosController.create)
routes.put('/funcionarios/:cod_funcionario', FuncionariosController.update)
routes.delete('/funcionarios/:cod_funcionario', FuncionariosController.delete)

// CRUD Acessos
routes.get('/acessos', AcessosController.index)
routes.post('/acessos', AcessosController.create)
routes.put('/acessos/:email_funcionario', AcessosController.update)
routes.delete('/acessos/:cod_funcionario', AcessosController.delete)

// CRUD Produtos
routes.get('/produtos', ProdutosController.index)
routes.post('/produtos', ProdutosController.create)
routes.put('/produtos/:cod_produto', ProdutosController.update)
routes.delete('/produtos/:cod_produto', ProdutosController.delete)

// CRUD Pedidos
routes.get('/pedidos', PedidosController.index)
routes.post('/pedidos', PedidosController.create)
routes.put('/pedidos/:cod_pedido', PedidosController.update)
routes.delete('/pedidos/:cod_pedido', PedidosController.delete)

// CRUD Ordem de Produção
routes.get('/ordemProducoes', OrdemProducaoController.index)
routes.post('/ordemProducoes', OrdemProducaoController.create)
routes.put('/ordemProducoes/:cod_ordemProducao', OrdemProducaoController.update)
routes.delete('/ordemProducoes/:cod_ordemProducao', OrdemProducaoController.delete)

// CRUD Pedido-Produtos
routes.get('/pedido_produtos', PedidosProdutosController.index)
routes.post('/pedido_produtos', PedidosProdutosController.create)
routes.put('/pedido_produtos/:cod_produto', PedidosProdutosController.update)
routes.delete('/pedido_produtos/:cod_produto', PedidosProdutosController.delete)

//Inserção e Pesquisa de Produção
routes.get('/producoes', ProducoesController.index)
routes.post('/producoes', ProducoesController.create)


module.exports = routes