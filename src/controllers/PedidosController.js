const knex = require("../database")

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

        console.log(dadosPedido[0])
        const dadosProdutosPedido = await knex('pedido_produtos')
        .where({cod_pedido:codPedido})
        .select('pedido_produtos.*')

        const{
            cod_produto,
            cod_pedido,
        } = dadosProdutosPedido[0]

        console.log(dadosPedido[0])


        return res.render('consulta_pedido.html', )
    },
    async create(req, res, next) {
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
            await knex('pedidos').insert({
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente,
                status
            })

            return res.status(201).send()
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