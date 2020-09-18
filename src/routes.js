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
//CRUD Cliente
.post('/salvarCliente', ClientesController.create)
.post('/pesquisaCliente', ClientesController.search)


//CRUD Maquinas
.post('/pesquisaMaquina', MaquinasController.search)
.post('/salvarMaquina', MaquinasController.create)


//CRUD Funcionarios
.post('/salvarFuncionario', FuncionariosController.create)
// .post('/pesquisaFuncionario', FuncionariosController.search)


//CRUD Pedidos
// .post('/salvarPedido', PedidosController.create)
// .post('/pesquisaPedido', PedidosController.search)

//CRUD Produtos
.post('/pesquisaProduto', ProdutosController.search)
.post('/salvarProduto', ProdutosController.create)








//renderizando os html em rotas
routes
.get('/', function (req, res) {res.render('login.html');})
.get('/home', function (req, res) {res.render('home.html');})
.get('/funcionario', function (req, res) {res.render('funcionario.html');})
.get('/cliente', function (req, res) {res.render('cliente.html');})
.get('/maquina', function (req, res) {res.render('maquina.html');})
.get('/produto', function (req, res) {res.render('produto.html');})
.get('/pedido', function (req, res) {res.render('pedido.html');})
.get('/ordemProducao', function (req, res) {res.render('ordem_producao.html');})
.get('/producao', function (req, res) {res.render('producao.html');})
.get('/relatorio', function (req, res) {res.render('relatorios.html');})
.get('/informacao', function (req, res) {res.render('informaçoes.html');})

.get('/CadastroCliente', function (req, res) {res.render('cadastro_cliente.html');})
.get('/CadastroFuncionario', function (req, res) {res.render('cadastro_funcionario.html');})
.get('/CadastroMaquina', function (req, res) {res.render('cadastro_maquina.html');})
.get('/CadastroOrdemProducao', function (req, res) {res.render('cadastro_ordem_producao.html');})
.get('/CadastroPedido', function (req, res) {res.render('cadastro_pedido.html');})
.get('/CadastroProduto', function (req, res) {res.render('cadastro_produto.html');})

.get('/ConsultaCliente', function (req, res) {res.render('consulta_cliente.html');})
.get('/ConsultaFuncionario', function (req, res) {res.render('consulta_funcionario.html');})
.get('/ConsultaMaquina', function (req, res) {res.render('consulta_maquina.html');})
.get('/ConsultaOrdemProducao', function (req, res) {res.render('consulta_ordemProducao.html');})
.get('/ConsultaPedido', function (req, res) {res.render('consulta_pedido.html');})
.get('/ConsultaProduto', function (req, res) {res.render('consulta_produto.html');})

module.exports = routes