const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("ordemProducoes")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
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