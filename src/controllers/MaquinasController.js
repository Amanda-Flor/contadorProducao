const knex = require("../database")
const { search } = require("./ClientesController")
const ls = require("local-storage")
const usuario = ls('usuario')

module.exports = {
    //apresenta as maquinas cadastradas
    async search (req, res){

        //pesquisando todos os clientes
        const dadosMaquinas = await knex('maquinas')
        .select('maquinas.cod_maquina', 'maquinas.nome_maquina');
        

        return res.render('consulta_maquina.html', { dadosMaquinas })
    },
    //Pesquisa Cliente
    //Pesquisa de Maquinas
    async searchMaquina (req, res){

        const{codMaquina} = req.body

        const dadosMaquina = await knex('maquinas')
        .where({cod_maquina:codMaquina})
        .select('maquinas.*');

        const{
            cod_maquina,
            nome_maquina,
            tipo_maquina,
            cavidade_maquina,
            cavidade_uso_maquina,
            ciclo_maquina,
            ciclo_uso_maquina,
        } = dadosMaquina[0]

        return res.render('consulta_maquina.html', {cod_maquina, nome_maquina, tipo_maquina, cavidade_maquina, cavidade_uso_maquina, ciclo_maquina, ciclo_uso_maquina})
    },
    //Cadastro de Maquina
    async create(req, res, next) {
        try{
            const {
                nomeMaquina,
                tipoMaquina,
                cavidadeMaquina,
                cavidadeUsoMaquina,
                cicloMaquina,
                cicloUsoMaquina,
            } = req.body;

            await knex('maquinas').insert({
                nome_maquina: nomeMaquina,
                tipo_maquina:tipoMaquina,
                cavidade_maquina: cavidadeMaquina,
                cavidade_uso_maquina: cavidadeUsoMaquina,
                ciclo_maquina: cicloMaquina,
                ciclo_uso_maquina: cicloUsoMaquina,
                tipo_maquina: tipoMaquina,
                status_maquina: "parada",
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