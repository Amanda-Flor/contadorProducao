const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("pedidos")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente
            } = req.body
            await knex('pedidos').insert({
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente
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
                cod_cliente
            } = req.body

            const {cod_pedido} = req.params

            await knex("pedidos")
            .update({
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente
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