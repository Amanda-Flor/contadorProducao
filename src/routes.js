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

routes
.get('/', function (req, res) {
    res.render('login.html');
})
.get('/home', function(req, res) {
    res.render('home.html');
})
.get('/maquina', function(req, res) {
    res.render('maquina.html');
})
.get('/cliente', function(req, res) {
    res.render('cliente.html');
})
.get('/produto', function(req, res) {
    res.render('produto.html');
})
.get('/pedido', function(req, res) {
    res.render('pedido.html');
})
.get('/ordemProducao', function(req, res) {
    res.render('ordem_producao.html');
})
.get('/producao', function(req, res) {
    res.render('producao.html');
})
.get('/relatorio', function(req, res) {
    res.render('relatorio.html');
})
.get('/informacoes', function(req, res) {
    res.render('informacoes.html');
})
.get('/CadastroCliente', function(req, res) {
    res.render('cadastro_cliente.html');
})
.get('/CadastroProduto', function(req, res) {
    res.render('cadastro_produto.html');
})
.get('/CadastroPedido', function(req, res) {
    res.render('cadastro_pedido.html');
})
.get('/CadastroOrdemProducao', function(req, res) {
    res.render('cadastro_ordem_producao.html');
})
.get('/ProducaoMaquina', function(req, res) {
    res.render('producao_maquina.html');
})
.get('/ConsultaCliente', function(req, res) {
    res.render('consulta_cliente.html');
})
.get('/ConsultaMaquina', function(req, res) {
    res.render('consulta_maquina.html');
})
.get('/ConsultaPedido', function(req, res) {
    res.render('consulta_pedido.html');
})
.get('/ConsultaProduto', function(req, res) {
    res.render('consulta_produto.html');
})
.get('/ConsultaOrdemProducao', function(req, res) {
    res.render('consulta_ordemProducao.html');
})

// CRUD Maquinas
routes.get('/maquinas', MaquinasController.index)
routes.post('/CadastroMaquina', MaquinasController.create)
routes.put('/maquinas/:cod_maquina', MaquinasController.update)
routes.delete('/maquinas/:cod_maquina', MaquinasController.delete)

// CRUD Clientes
routes.get('/clientes', ClientesController.index)
routes.post('/clientes', ClientesController.create)
routes.put('/clientes/:cod_cliente', ClientesController.update)
routes.delete('/clientes/:cod_cliente', ClientesController.delete)


// CRUD Funcionarios
routes.get('/funcionario', function(req, res){ res.render('funcionario.html')})
// routes.get('/funcionario', FuncionariosController.index)
routes.post('/CadastroFuncionario', FuncionariosController.create)
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