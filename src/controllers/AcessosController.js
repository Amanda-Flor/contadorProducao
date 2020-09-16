const knex = require("../database")

//Conexão no Banco de Dados
module.exports = {
    async index (req, res){
        const results = await knex("acessos")

        return res.json(results)
    },
    async create(req, res, next) {
        try{
            const {
                email_funcionario,
                senha_funcionario,
                cod_funcionario,
            } = req.body
            await knex('acessos').insert({
                email_funcionario,
                senha_funcionario,
                cod_funcionario,
            })

            return res.status(201).send()
        } catch (error){
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                senha_funcionario,
                cod_funcionario
            } = req.body

            const {email_funcionario} = req.params

            await knex("acessos")
            .update({
                senha_funcionario,
                cod_funcionario
            })
            .where({email_funcionario})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_funcionario} = req.params

            await knex("acessos")
            .where({cod_funcionario})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}

//Conexão com o Front-End