const knex = require("../database")
const ls = require("local-storage")

module.exports = {

    //Pesquisa Pedido
    async search (req, res){

        const{codPedido} = req.body

        const dadosPedido = await knex('pedidos')
        .where({cod_pedido:codPedido})
        .select('pedidos.*');

        // const{
        //     cod_pedido,
        //     quantidade_produto_pedido,
        //     rotulagem_pedido,
        //     data_inicio_pedido,
        //     status_pedido,
        //     cod_funcionario,
        //     cod_cliente,
        //     status
        // } = dadosPedido[0]


        const dadosProdutosPedido = await knex('pedido_produtos')
        .where({cod_pedido:codPedido})
        .select('pedido_produtos.*')

        const{
            cod_produto,
            cod_pedido,
        } = dadosProdutosPedido[0]



        return res.render('consulta_pedido.html', )
    },
    async seachCliente(req, res, next) {
        try{

            const dadosCliente = await knex('clientes')
            .select('clientes.cod_cliente', 'clientes.nome_cliente');
            const clientes = []
    
            for (var i = 0; i < dadosCliente.length; i++) {
                for (var j = 0; j < 1; j++) {
                    clientes.push(dadosCliente[i].cod_cliente + ' - ' + dadosCliente[i].nome_cliente)
                }
            }
            return res.render('cadastro_pedido.html', {clientes})

        } catch (error){
            next(error)
        }
    },
    async seachProduto(req, res, next) {
        try{
            const{
                codCliente,
            } = req.body    
            

            const dadosProduto = await knex('produtos')
            .where({'produtos.cod_cliente':codCliente})
            .select('produtos.cod_produto', 'produtos.nome_produto');
            const produtos = []
    
            for (var i = 0; i < dadosProduto.length; i++) {
                for (var j = 0; j < 1; j++) {
                    produtos.push(dadosProduto[i].cod_produto + ' - ' + dadosProduto[i].nome_produto)
                }
            }
            return res.render('cadastro_pedido1.html', { produtos, codCliente })

        } catch (error){
            next(error)
        }
    },
    async dadosPedido(req, res, next) {
        try{

            const{
                codProduto,
            } = req.body 

            const cliente = await knex('produtos')
            .where({'produtos.cod_produto':codProduto})
            .join('clientes', 'produtos.cod_cliente', '=', 'clientes.cod_cliente')
            .select('produtos.cod_cliente', 'clientes.nome_cliente');
            const codCliente = []
    
            for (var i = 0; i < cliente.length; i++) {
                for (var j = 0; j < 1; j++) {
                    codCliente.push(cliente[i].cod_cliente + ' - ' + cliente[i].nome_cliente)
                }
            }
            return res.render('cadastro_pedido2.html', {codCliente, codProduto})
        } catch (error){
            next(error)
        }
    },
    async getDadosPedido(req, res, next){
        try{
            return res.render('cadastro_pedido2.html', {codCliente, codProduto})
        }catch(error){
            next(error)
        }
    },
    async create(req, res, next, ) {
        try{
            
            const {
                quantProduto,
                rotulagem,
                materiaPrima,
                codCliente,
                codProduto,
            } = req.body

            
            var displayDate = (myDate.getMonth()+1) + '/' + (myDate.getDate()) + '/' + myDate.getFullYear();
            var usuario = ls.get('usuario');

            const itensPedido = await knex('pedidos')
            .where({'produtos.cod_produto':codProduto})
            .join('clientes', 'produtos.cod_cliente', '=', 'clientes.cod_cliente')
            .select('produtos.cod_cliente', 'clientes.nome_cliente');

            await knex('pedidos').insert({
                data_inicio_pedido: displayData,
                status_pedido: 'aberto',
                cod_funcionario:usuario,
                cod_cliente: codCliente,
            })

            await knex('pedido_produtos').insert({
                cod_produto: codProduto,
                cod_pedido,
                quantidade_produto,
                rotulagem_produto,
            })

            return res.render('cadastro_pedido2.html', {codCliente, codProduto})
        } catch (error){
            next(error)
        }
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