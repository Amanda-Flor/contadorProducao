const knex = require("../database")
const ls = require("local-storage")
//Conexão no Banco de Dados
module.exports = {
    async login (req, res){
        const{
            email,
            senha,
        } = req.body


        const dadosUsuario = await knex('acessos')
        .where({email_funcionario:email})
        .select('acessos.*');

        const{
            email_Funcionario,
            senha_funcionario,
            cod_funcionario,
        } = dadosUsuario[0]


        if(email_Funcionario == email && senha_funcionario == senha){
            
            ls('usuario', cod_funcionario)

            return res.render('home.html')
        }else{
            const menssagem = 'Dados incorretos!'
            return res.render('login.html', {menssagem})
            
        }
    },
    async create(req, res, next) {

        try{
            const {
                emailFuncionario,
                senhaFuncionario,
                codFuncionario: cod_cadastro,
            } = req.body
            await knex('acessos').insert({
                email_funcionario: emailFuncionario,
                senha_funcionario: senhaFuncionario,
                cod_funcionario: codFuncionario,
            })

            // alert("Cadastrado com sucesso!")
            return res.render('funcionario.html')
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