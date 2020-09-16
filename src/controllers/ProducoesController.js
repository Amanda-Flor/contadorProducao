const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("producoes")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                data_inicio_producao,
                data_final_producao,
                video_producao,
                quant_embalagem_producao,
                cod_funcionario,
                cod_ordemProducao,
                cod_maquina,
            } = req.body
            await knex('producoes').insert({
                data_inicio_producao,
                data_final_producao,
                video_producao,
                quant_embalagem_producao,
                cod_funcionario,
                cod_ordemProducao,
                cod_maquina,
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    }
    // async update(req, res, next) {
    //     try{
    //         const {
    //             data_inicio_producao,
    //             data_final_producao,
    //             video_producao,
    //             quant_embalagem_producao,
    //             cod_funcionario,
    //             cod_ordemProducao,
    //             cod_maquina,
    //         } = req.body

    //         const {cod_producao} = req.params

    //         await knex("producoes")
    //         .update({
    //             data_inicio_producao,
    //             data_final_producao,
    //             video_producao,
    //             quant_embalagem_producao,
    //             cod_funcionario,
    //             cod_ordemProducao,
    //             cod_maquina,
    //         })
    //         .where({cod_producao})

    //         return res.send()
    //     } catch (error) {
    //         next(error)
    //     }
    // },
    // async delete(req, res, next){
    //     try{
    //         const{cod_producao} = req.params

    //         await knex("producoes")
    //         .where({cod_producao})
    //         .del()

    //         return res.send()
    //     } catch (error){
    //         next(error)
    //     }
    // }
}