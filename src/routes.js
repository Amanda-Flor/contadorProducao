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
const LoginController = ("./controller/AcessosController")


routes
//login
.post('/acesso', AcessosController.login)
.post('/salvarAcessoFuncionario', AcessosController.create)

//CRUD Cliente
.post('/salvarCliente', ClientesController.create)
.post('/pesquisaCliente', ClientesController.search)


//CRUD Maquinas
.post('/pesquisaMaquina', MaquinasController.search)
.post('/salvarMaquina', MaquinasController.create)


//CRUD Funcionarios
.post('/salvarFuncionario', FuncionariosController.create)
.post('/alterarFuncionario', FuncionariosController.update)
.get('/apresentarFuncionario', FuncionariosController.search)


//CRUD Produtos
.get('/CadastroProduto', ProdutosController.searchForm)
.post('/salvarProduto', ProdutosController.create)
.post('/pesquisaProduto', ProdutosController.searchProduto)
.get('/ConsultarProduto', ProdutosController.searchProdutos)

//CRUD OP
.get('/CadastroOrdemProducao', OrdemProducaoController.searchPedido)
.post('/CadastroOrdemProducao', OrdemProducaoController.selectProduto)
.post('/salvarOrdemProducao', OrdemProducaoController.createOP)
.get('/ConsultaOrdemProducao', OrdemProducaoController.searchOP)
.post('/pesquisarOrdemProducao', OrdemProducaoController.search)












//CRUD Pedidos
.get('/CadastroPedido', PedidosController.seachCliente)
.post('/CadastroPedido', PedidosController.seachProduto)
.get('/salvarPedido', PedidosController.getDadosPedido)
.post('/salvarPedido', PedidosController.dadosPedido)
.post('/finalizarPedido', PedidosController.create)
.post('/pesquisaPedido', PedidosController.search)

















//renderizando os html em rotas

.get('/', function (req, res) {res.render('login.html');})
.get('/home', function (req, res) {res.render('home.html');})
.get('/funcionario', FuncionariosController.search)
.get('/cliente', function (req, res) {res.render('cliente.html');})
.get('/maquina', function (req, res) {res.render('maquina.html');})
.get('/produto', function (req, res) {res.render('produto.html');})
.get('/pedido', function (req, res) {res.render('pedido.html');})
.get('/ordem_producao', function (req, res) {res.render('ordem_producao.html');})
.get('/producao', function (req, res) {res.render('producao.html');})
.get('/relatorio', function (req, res) {res.render('relatorios.html');})
.get('/informacoes', function (req, res) {res.render('informacoes.html');})








.get('/CadastroCliente', function (req, res) {res.render('cadastro_cliente.html');})
.get('/CadastroFuncionario', function (req, res) {res.render('cadastro_funcionario.html');})
.get('/CadastroMaquina', function (req, res) {res.render('cadastro_maquina.html');})



.get('/ConsultaCliente', function (req, res) {res.render('consulta_cliente.html');})
.get('/ConsultaFuncionario', function (req, res) {res.render('consulta_funcionario.html');})
.get('/ConsultaMaquina', function (req, res) {res.render('consulta_maquina.html');})

.get('/ConsultaPedido', function (req, res) {res.render('consulta_pedido.html');})


module.exports = routes