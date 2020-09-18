const knex = require("../database")
const { search } = require("./ClientesController")

module.exports = {
    //Pesquisa de Maquinas
    async search (req, res){

        const{codMaquina} = req.body


        const dadosMaquina = await knex('maquinas')
        .where({cod_maquina:codMaquina})
        .select('maquinas.*');

        const{
            cod_maquina,
            nome_maquina,
            cavidade_maquina,
            cavidade_uso_maquina,
            ciclo_maquina,
            ciclo_uso_maquina,
            tipo_maquina,
        } = dadosMaquina[0]

        return res.render('consulta_maquina.html', { cod_maquina, nome_maquina, cavidade_maquina, cavidade_uso_maquina, ciclo_maquina, ciclo_uso_maquina, tipo_maquina })
    },

    //Cadastro de Maquina
    async create(req, res, next) {
        try{
            const {
                nomeMaquina,
                cavidadeMaquina,
                cavidadeUsoMaquina,
                cicloMaquina,
                cicloUsoMaquina,
                tipoMaquina,
            } = req.body;

            await knex('maquinas').insert({
                nome_maquina: nomeMaquina,
                cavidade_maquina: cavidadeMaquina,
                cavidade_uso_maquina: cavidadeUsoMaquina,
                ciclo_maquina: cicloMaquina,
                ciclo_uso_maquina: cicloUsoMaquina,
                tipo_maquina: tipoMaquina,
            })
            return res.render('cadastro_maquina.html')
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