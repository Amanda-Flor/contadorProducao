const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("produtos")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
            } = req.body
            await knex('produtos').insert({
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
            } = req.body

            const {cod_produto} = req.params

            await knex("produtos")
            .update({
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
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

            await knex("produtos")
            .where({cod_produto})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}