const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')

module.exports = {

    //Apresenta Clientes cadastrados
    async search (req, res){

        //pesquisando todos os clientes
        const dadosClientes = await knex('clientes')
        .select('clientes.cod_cliente', 'clientes.nome_cliente');
        

        return res.render('consulta_cliente.html', { dadosClientes })
    },
    //Pesquisa Cliente
    async searchCliente (req, res){

        const{codCliente} = req.body

        const dadosClientes = await knex('clientes')
        .where({cod_cliente:codCliente})    
        .select('clientes.*');

        const {
            cod_cliente,
            nome_cliente,
            email_cliente,
            telefone_cliente,
            cnpj_cliente,
        } = dadosClientes[0]


        return res.render('consulta_cliente.html', { cod_cliente, nome_cliente, email_cliente, telefone_cliente, cnpj_cliente})
    },
    //Cadastro de Cliente
    async create(req, res, next) {
        try{

            const {
                nomeCliente,
                emailCliente,
                telefoneCliente,
                cpnjCliente,

            } = req.body;

            await knex('clientes').insert({
                nome_cliente: nomeCliente,
                email_cliente: emailCliente,
                telefone_cliente: telefoneCliente,
                cnpj_cliente: cpnjCliente,
                status_cliente: "ativo"
            })

            
            return res.render('cliente.html')
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