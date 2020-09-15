const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("maquinas")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                nome_maquina,
                tipo_maquina,
                cavidade_maquina,
                cavidade_uso_maquina,
                ciclo_maquina,
                ciclo_uso_maquina
            } = req.body
            await knex('maquinas').insert({
                nome_maquina,
                tipo_maquina,
                cavidade_maquina,
                cavidade_uso_maquina,
                ciclo_maquina,
                ciclo_uso_maquina
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                nome_maquina,
                tipo_maquina,
                cavidade_maquina,
                cavidade_uso_maquina,
                ciclo_maquina,
                ciclo_uso_maquina
            } = req.body

            const {cod_maquina} = req.params

            await knex("maquinas")
            .update({
                nome_maquina,
                tipo_maquina,
                cavidade_maquina,
                cavidade_uso_maquina,
                ciclo_maquina,
                ciclo_uso_maquina
            })
            .where({cod_maquina})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_maquina} = req.params

            await knex("maquinas")
            .where({cod_maquina})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}