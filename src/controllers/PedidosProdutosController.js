const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("pedido_produtos")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                cod_produto,
                cod_pedido
            } = req.body
            await knex('pedido_produtos').insert({
                cod_produto,
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
                cod_pedido
            } = req.body

            const {cod_produto} = req.params

            await knex("pedido_produtos")
            .update({
                cod_pedido
            })
            .where({cod_produto})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_produto} = req.params

            await knex("pedido_produtos")
            .where({cod_produto})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}