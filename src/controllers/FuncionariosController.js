const knex = require("../database")

module.exports = {
    async index(req, res) {
        res.render('funcionario.html');
    },
    async index2 (req, res){
        const results = await knex("funcionarios")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                nome_funcionarios,
                telefone_funcionario,
                data_nascimento_funcionario,
                cep_funcionario,
                naturalidade_funcionario,
                sexo_funcionario,
                nivel_acesso_funcionario,
                cpf_funcionario,
            } = req.body
            await knex('funcionarios').insert({
                nome_funcionarios,
                telefone_funcionario,
                data_nascimento_funcionario,
                cep_funcionario,
                naturalidade_funcionario,
                sexo_funcionario,
                nivel_acesso_funcionario,
                cpf_funcionario
            }) 
            return res.render('funcionario.html')

        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                nome_funcionarios,
                telefone_funcionario,
                data_nascimento_funcionario,
                cep_funcionario,
                naturalidade_funcionario,
                sexo_funcionario,
                nivel_acesso_funcionario,
                cpf_funcionario,
            } = req.body

            const {cod_funcionario} = req.params

            await knex("funcionarios")
            .update({
                nome_funcionarios,
                telefone_funcionario,
                data_nascimento_funcionario,
                cep_funcionario,
                naturalidade_funcionario,
                sexo_funcionario,
                nivel_acesso_funcionario,
                cpf_funcionario,
            })
            .where({cod_funcionario})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_funcionario} = req.params

            await knex("funcionarios")
            .where({cod_funcionario})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}