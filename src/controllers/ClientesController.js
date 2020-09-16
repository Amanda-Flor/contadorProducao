const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("clientes")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                nome_cliente,
                email_cliente,
                telefone_cliente,
                cpnj_cliente
            } = req.body
            await knex('clientes').insert({
                nome_cliente,
                email_cliente,
                telefone_cliente,
                cpnj_cliente
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                nome_cliente,
                email_cliente,
                telefone_cliente,
                cpnj_cliente
            } = req.body

            const {cod_cliente} = req.params

            await knex("clientes")
            .update({
                nome_cliente,
                email_cliente,
                telefone_cliente,
                cpnj_cliente
            })
            .where({cod_cliente})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_cliente} = req.params

            await knex("clientes")
            .where({cod_cliente})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}