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
.get('/cliente', function (req, res) {res.render('cliente.html');})
.get('/CadastroCliente', function (req, res) {res.render('cadastro_cliente.html');})
//.get('/ConsultaCliente', function (req, res) {res.render('consulta_cliente.html');})
.get('/ConsultaCliente', ClientesController.search)
.post('/pesquisaCliente', ClientesController.searchCliente)
.post('/salvarCliente', ClientesController.create)



//CRUD Maquinas
.get('/maquina', function (req, res) {res.render('maquina.html');})
.get('/CadastroMaquina', function (req, res) {res.render('cadastro_maquina.html');})
.get('/ConsultaMaquina', MaquinasController.search)
.post('/pesquisaMaquina', MaquinasController.searchMaquina)
.post('/salvarMaquina', MaquinasController.create)


//CRUD Funcionarios
.get('/CadastroFuncionario', function (req, res) {res.render('cadastro_funcionario.html');})
.get('/funcionario', FuncionariosController.search)
.post('/salvarFuncionario', FuncionariosController.create)
.get('/ConsultaFuncionario', FuncionariosController.searchFuncionario)
.get('/apresentarFuncionario', FuncionariosController.search)


//CRUD Produtos
.get('/produto', function (req, res) {res.render('produto.html');})
.get('/CadastroProduto', ProdutosController.searchForm)
.post('/salvarProduto', ProdutosController.create)
.post('/pesquisaProduto', ProdutosController.searchProduto)
.get('/ConsultarProduto', ProdutosController.searchProdutos)

//CRUD OP
.get('/ordem_producao', function (req, res) {res.render('ordem_producao.html');})
.get('/CadastroOrdemProducao', OrdemProducaoController.searchPedido)
.post('/CadastroOrdemProducao', OrdemProducaoController.selectProduto)
.post('/salvarOrdemProducao', OrdemProducaoController.createOP)
.post('/finalizarOrdemProducao', OrdemProducaoController.finalizarOrdemProducao)
.get('/ConsultaOrdemProducao', OrdemProducaoController.searchOP)
.post('/pesquisarOrdemProducao', OrdemProducaoController.search)

//CRUD Pedidos
.get('/pedido', function (req, res) {res.render('pedido.html');})
//.get('/ConsultaPedido', function (req, res) {res.render('consulta_pedido.html');})
.get('/CadastroPedido', PedidosController.seachCliente)
.post('/listarProduto', PedidosController.listarProduto)
.post('/escolherProduto', PedidosController.escolherProduto)
.post('/criarPedidoProduto', PedidosController.criarPedidoProduto)
.post('/pesquisaPedido', PedidosController.search)

//PRODUCAO
.get('/producao', ProducoesController.index)
.post('/pesquisaOP', ProducoesController.pesquisaOP)
.post('/criarproducao', ProducoesController.createProducao)
.get('/continuarProducao', ProducoesController.continuarProducao)
.get('/finalizarProducao', ProducoesController.finalizarProducao)


//Páginas Gerais
.get('/', function (req, res) {res.render('login.html');})
.get('/home', function (req, res) {res.render('home.html');})
.get('/relatorio', function (req, res) {res.render('relatorios.html');})
.get('/informacoes', function (req, res) {res.render('informacoes.html');})


module.exports = routes