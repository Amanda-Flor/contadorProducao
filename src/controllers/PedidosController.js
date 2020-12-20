const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')
module.exports = {

    //Pesquisa Pedido
    async seachCliente(req, res, next) {
        try{

            //apresentando clientes no select no html
            const clientes = await knex('clientes')
            .select('clientes.cod_cliente', 'clientes.nome_cliente');
                  

            return res.render('cadastro_pedido.html', {clientes})

        } catch (error){
            next(error)
        }
    },

    async listarProduto(req, res, next){
        try{
            //Pega o valor do select cliente
            const{
                codCliente
            } = req.body
            
            //Criar um local Storage para cliente
            var cod = String(codCliente)
            ls('cliente', cod)

            //NOVO PEDIDO
                //obter data 
            var data = new Date();
            var hoje = data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate();
                //obter cod funcionario
            const usuario = ls('usuario')
                //inserir na tabela
            await knex('pedidos').insert({
                data_inicio_pedido: hoje,
                status_pedido: 'aberto',
                cod_funcionario:usuario,
                cod_cliente: codCliente,
            })
            //buscar ultimo cod do pedido
            const codigosPedido = await knex('pedidos')
            .select('pedidos.cod_pedido')
            const codPedido = String(codigosPedido[codigosPedido.length-1].cod_pedido)
                //criar local storage para pedido
            ls('pedido', codPedido)

            

            //buscar nome do cliente no banco
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': codCliente})
            .select('clientes.nome_cliente')

            var nomeCliente = cliente[0].nome_cliente

                
            //Listar produto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': codCliente})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            // //Preparar parametro para nomeProduto e tabelaProdutos
            // const nomeProduto = ''
            // const tabelaProdutos = ''

            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto})
        }catch(error){
            next(error)
        }
    },

    async escolherProduto(req, res, next){
        try {

            //preparar paramentro nomeCliente
            var cod = Number(ls('cliente'))
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': cod})
            .select('clientes.nome_cliente')

            const nomeCliente = cliente[0].nome_cliente
            
            //Listar produto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': cod})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            //Pega o valor do select produto
            const{
                codProduto
            } = req.body
            
            //Criar um local Storage produto
            var produto = String(codProduto)
            ls('produto', produto)
            
            //buscar nome do produto no banco
            const arrayProduto = await knex('produtos')
            .where({'produtos.cod_produto': codProduto})
            .select('produtos.nome_produto')

            const nomeProduto = arrayProduto[0].nome_produto

            //Preparar parametro para tabelaProdutos
            const tabelaProdutos = ''

            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto, nomeProduto, tabelaProdutos})
        } catch (error) {
            next(error)
        }
    },

    async criarPedidoProduto(req, res, next){
        try {

            //Prepara paramento nomeCliente
                //pegar local Strorage no cliente
            const cod = Number(ls('cliente'))

                //fazer busca no banco do nome do cliente
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': cod})
            .select('clientes.nome_cliente')

                //preparando array
            const nomeCliente = cliente[0].nome_cliente
            

            //Preparar parametro listaProduto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': cod})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            //Preparar paramentro nomeProduto
                //Pegar local storage do produto
            const produto = Number(ls('produto'))
                //busca de nome do produto no banco
            const arrayProduto = await knex('produtos')
            .where({'produtos.cod_produto': produto})
            .select('produtos.nome_produto')

            const nomeProduto = arrayProduto[0].nome_produto



            //Prepara paramentro tabelaProdutos
                //NOVO PEDIDO_PRODUTOS
                //prepara dados para inserção
                const{
                    quantProduto,
                    rotulagem,
                } = req.body
                //inserir dados do banco pedido_produtos
                await knex('pedidoProdutos').insert({
                    cod_produto: produto,
                    cod_pedido: Number(ls('pedido')),
                    quantidade_produto: quantProduto,
                    rotulagem_produto: rotulagem,
                })
                //buscar no banco pedido_produtos pelo cod do pedido
            const tabelaProdutos = await knex('pedidoProdutos')
            .where({'pedidoProdutos.cod_pedido': Number(ls('pedido'))})
            .select('pedidoProdutos.*')



            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto, nomeProduto, tabelaProdutos})
        } catch (error) {
            next(error)
        }
    },





    async search (req, res){

        //pesquisando todos os clientes
        const dadosPedido = await knex('pedidos')
        .join('clientes', 'pedidos.cod_cliente', '=', 'clientes.cod_cliente')
        .select('pedidos.cod_pedido', 'clientes.nome_cliente');
        

        return res.render('consulta_pedido.html', { dadosPedido })
    },
    
    async searchPedido (req, res){

        const{codPedido} = req.body

        const dadosPedido = await knex('pedidos')
        .where({'cod_pedido':codPedido})
        .join('funcionarios', 'pedidos.cod_funcionario', '=', 'pedidos.cod_funcionario')
        .join('clientes', 'pedidos.cod_cliente', '=', 'clientes.cod_cliente')
        .select('pedidos.*', 'clientes.nome_cliente', 'funcionarios.nome_funcionarios');

        const{
            cod_pedido,
            data_inicio_pedido,
            status_pedido,
            nome_cliente,
            nome_funcionarios,
        } = dadosPedido[0]

        console.log(dadosPedido[0])

        //consulta de produtos do pedido
        const dadosPedidoProdutos = await knex('pedidoprodutos')
        .where({'cod_pedido':codPedido})
        .join('produtos', 'pedidoprodutos.cod_produto', '=', 'produtos.cod_produto')
        .select('pedidoprodutos.cod_pedidoProdutos', 'produtos.nome_produto', 'pedidoprodutos.quantidade_produto')

        console.log(dadosPedido[0])
        
        return res.render('consulta_pedido.html', {cod_pedido, data_inicio_pedido, status_pedido, nome_cliente, nome_funcionarios, dadosPedidoProdutos})
    },
    async update(req, res, next) {
        try{
            const {
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente,
                status
            } = req.body

            const {cod_pedido} = req.params

            await knex("pedidos")
            .update({
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente,
                status
            })
            .where({cod_pedido})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_pedido} = req.params

            await knex("pedidos")
            .where({cod_pedido})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}