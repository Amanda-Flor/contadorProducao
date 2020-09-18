const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("ordemProducoes")

        return res.json(results)
    },
    async searchProduto(req, res, next) {
        try{

            // //Dados dos Produtos por Pedido
            // const{codPedido} = req.body
            // const dadosDBProdutosPedido = await knex('pedido_produtos')
            // .where({cod_pedido:codPedido})    
            // .select('pedido_produtos.*');

            // const {
            //     cod_pedido,
            //     cod_produto,
            // } = dadosDBProdutosPedido[0]

            // //Dados dos Produtos
            // const dadosProdutosPedido = await knex('produtos')
            // .where({cod_produto:cod_produto})    
            // .select('produtos.*');
            // const{
            //     cod_produto,
            //     nome_produto,
            //     materia_prima_produto,
            //     quantidade_lote_produto,
            //     cod_cliente,
            //     cod_maquina,
            // } = dadosProdutosPedido[0]

            // //Dados do Pedido
            // const dadosPedido = await knex('pedidos')
            // .where({cod_pedido:cod_pedido})    
            // .select('pedidos.*');
            // const{
            //     cod_pedido,
            //     quantidade_produto_pedido,
            //     rotulagem_pedido,
            //     data_inicio_pedido,
            //     status_pedido,
            //     cod_funcionario,
            //     cod_cliente,
            //     status,
            // } = dadosPedido[0]

            // return res.render('cadastro_ordem_producao.html', { cod_produto, nome_produto, rotulagem_pedido,quantidade_produto_pedido, data_inicio_pedido })

            const {
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            } = req.body
            await knex('ordemProducoes').insert({
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            } = req.body

            const {cod_ordemProducao} = req.params

            await knex("ordemProducoes")
            .update({
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            })
            .where({cod_ordemProducao})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_ordemProducao} = req.params

            await knex("ordemProducoes")
            .where({cod_ordemProducao})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}