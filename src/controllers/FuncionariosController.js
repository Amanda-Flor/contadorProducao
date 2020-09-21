const knex = require("../database")
const ls = require("local-storage")



module.exports = {

    //Pesquisa Funcionario
    async search(req, res, next) {

        var usuario = ls.get('usuario');
        const dadosFuncionario = await knex('funcionarios')
        .where({cod_funcionario:usuario})
        .select('funcionarios.*');
        console.log(usuario)

        const{
            cod_funcionario,
            nome_funcionarios,
            telefone_funcionario,
            data_nascimento_funcionario,
            cep_funcionario,
            naturalidade_funcionario,
            sexo_funcionario,
            nivel_acesso_funcionario,
            cpf_funcionario,
        } = dadosFuncionario[0]


        return res.render('funcionario.html', {cod_funcionario, nome_funcionarios, telefone_funcionario, data_nascimento_funcionario, cep_funcionario, naturalidade_funcionario, sexo_funcionario, nivel_acesso_funcionario, cpf_funcionario,});
    },

    //Cadastro Funcionario
    async create(req, res, next) {
        try{
            const {
                nomeFuncionario,
                telefoneFuncionario,
                dataNascimentoFuncionario,
                cepFuncionario,
                naturalidadeFuncionario,
                sexo,
                nivelAcessoFuncionario,
                cpfFuncionario,
                emailFuncionario,
                senhaFuncionario,
            } = req.body;
            console.log(sexo)

            await knex('funcionarios').insert({
                nome_funcionarios: nomeFuncionario,
                telefone_funcionario: telefoneFuncionario,
                data_nascimento_funcionario: dataNascimentoFuncionario,
                cep_funcionario:  cepFuncionario,
                naturalidade_funcionario: naturalidadeFuncionario,
                sexo_funcionario: sexo,
                nivel_acesso_funcionario: nivelAcessoFuncionario,
                cpf_funcionario: cpfFuncionario,
            }) 

            const acessoFuncionario = await knex('funcionarios')
            .where({cpf_funcionario:cpfFuncionario})
            .select('funcionarios.cod_funcionario');
            const codFuncionario = acessoFuncionario[0].cod_funcionario;
            
            console.log(codFuncionario)
            await knex('acessos').insert({
                email_funcionario: emailFuncionario,
                senha_funcionario: senhaFuncionario,
                cod_funcionario: codFuncionario,
            })

            //buscar funcionario que foi cadastrado
            const listaFucionarios = await knex('funcionarios')
            .select('funcionarios.cod_funcionario')
             
            const cod = listaFucionarios[listaFucionarios.length-1].cod_funcionario

            //listar dados do funcionario
            const funcionario = await knex ('funcionarios')
            .where({'funcionarios.cod_funcionario':cod})
            .select('funcionarios.*')
            
            const dadosFuncionario = funcionario[0]
            
            return res.render('apresentar_funcionario_cadastrado.html', {dadosFuncionario});

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