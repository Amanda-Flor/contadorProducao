const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')

module.exports = {

    //Apresenta Clientes cadastrados
    async search (req, res){

        //pesquisando todos os clientes
        const dadosClientes = await knex('clientes')
        .where({'clientes.status_cliente': 'ativo'})
        .select('clientes.cod_cliente', 'clientes.nome_cliente');
        

        return res.render('consulta_cliente.html', { dadosClientes })
    },
    //Pesquisa Cliente
    async searchCliente (req, res){

        const{codCliente} = req.body

        const dadosClientes = await knex('clientes')
        .where({'cod_cliente':codCliente})    
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


    
    async apresentarInfoCliente(req, res, next) {
        try{
            const {
                codCliente
            } = req.body

            const dadosCliente = await knex('clientes')
            .where({cod_cliente:codCliente})
            .select(
                'clientes.cod_cliente',
                'clientes.nome_cliente',
                'clientes.email_cliente',
                'clientes.telefone_cliente',
                'clientes.cnpj_cliente'
            )
            const infoCliente = dadosCliente[0]
            console.log(infoCliente)
            return res.render('atualizar_cliente.html', {infoCliente})
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next){
        try {
            const {
                codCliente,
                cpnjCliente,
                nomeCliente,
                telefoneCliente,
                emailCliente,
            } = req.body

            await knex("clientes")
            .where({cod_cliente:codCliente })
            .update({
                nome_cliente: nomeCliente,
                email_cliente: emailCliente,
                telefone_cliente: telefoneCliente,
                cnpj_cliente: cpnjCliente
            })
            return res.render('cliente.html')

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{codCliente} = req.body

            await knex("clientes")
            .where({cod_cliente: codCliente})
            .update({
                status_cliente: 'desativado',
            })

            return res.render('cliente.html')
        } catch (error){
            next(error)
        }
    }
}