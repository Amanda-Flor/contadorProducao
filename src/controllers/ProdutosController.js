const { select, as } = require("../database");
const knex = require("../database")
// var  ls  = require ( ' local-storage ' )



module.exports = {
    
    //Apresenta produtos cadastrados
    async searchProdutos (req, res){
    
        const itensProdutos = await knex('produtos')
        .select('produtos.nome_produto');
        const produtos = []

        for (var i = 0; i < itensProdutos.length; i++) {
            for (var j = 0; j < 1; j++) {
                produtos.push(itensProdutos[i].nome_produto)
            }
        }
        
        return res.render('consulta_produto.html' , {produtos})

    },

    //Apresentação dados do produtos pesquisado
    async searchProduto (req, res){

        const{codProduto} = req.body
        
        const dadosProduto = await knex('produtos')
        .where({cod_produto:codProduto})
        .join('maquinas', 'produtos.cod_maquina', '=', 'maquinas.cod_maquina')
        .join('clientes', 'produtos.cod_cliente', '=', 'clientes.cod_cliente')
        .select('produtos.cod_produto', 'produtos.nome_produto', 'produtos.materia_prima_produto', 'produtos.quantidade_lote_produto', 'maquinas.nome_maquina', 'clientes.nome_cliente', 'clientes.email_cliente', 'clientes.telefone_cliente');

        const{
            cod_produto,
            nome_produto,
            materia_prima_produto,
            quantidade_lote_produto,
            nome_maquina,
            nome_cliente,
            email_cliente,
            telefone_cliente,
        } = dadosProduto[0]

        return res.render('consulta_produto.html', {cod_produto, nome_produto,materia_prima_produto, quantidade_lote_produto, nome_maquina, nome_cliente, email_cliente, telefone_cliente,})
    },

    //Apresenta cliente e maquina para completar a criação
    async searchForm (req, res, next){

        try{
        
            const itensMaquinas = await knex('maquinas')
            .select('maquinas.nome_maquina', 'maquinas.cod_maquina');
            const maquinas = []
        
            for (var i = 0; i < itensMaquinas.length; i++) {
                for (var j = 0; j < 1; j++) {
                    maquinas.push(itensMaquinas[i].cod_maquina + ' - ' + itensMaquinas[i].nome_maquina)
                }
            }

            const itensClientes = await knex('clientes')
            .select('clientes.nome_cliente', 'clientes.cod_cliente');
            const clientes = []
    
            for (var i = 0; i < itensClientes.length; i++) {
                for (var j = 0; j < 1; j++) {
                    clientes.push(itensClientes[i].cod_cliente + ' - ' + itensClientes[i].nome_cliente)
                }
            }

            return res.render('cadastro_produto.html' , {clientes, maquinas})
            
        }catch(error){
            next(error)
        }
    },

    async create(req, res, next) {
        try{


            const itensMaquinas = await knex('maquinas')
            .select('maquinas.nome_maquina', 'maquinas.cod_maquina');
            const maquinas = []
        
            for (var i = 0; i < itensMaquinas.length; i++) {
                for (var j = 0; j < 1; j++) {
                    maquinas.push(itensMaquinas[i].cod_maquina)
                }
            }

            const itensClientes = await knex('clientes')
            .select('clientes.nome_cliente', 'clientes.cod_cliente');
            const clientes = []
    
            for (var i = 0; i < itensClientes.length; i++) {
                for (var j = 0; j < 1; j++) {
                    clientes.push(itensClientes[i].cod_cliente)
                }
            }

            const {
                cliente,
                maquina,
                nomeProduto,
                materiaPrima,
                quantLote,
            } = req.body;


            //inserir no banco de dados
            await knex('produtos').insert({
                nome_produto: nomeProduto,
                materia_prima_produto: materiaPrima,
                quantidade_lote_produto: quantLote,
                cod_cliente: clientes[cliente],
                cod_maquina: maquinas[maquina],
            })


            
            return res.render('cadastro_produto.html')
        } catch (error){
            next(error)
        }
            
            return res.render("cadastro_produto.html")
        
    },

    
    async update(req, res, next) {
        try{
            const {
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
            } = req.body

            const {cod_produto} = req.params

            await knex("produtos")
            .update({
                nome_produto,
                materia_prima_produto,
                quantidade_lote_produto,
                cod_cliente,
                cod_maquina,
            })
            .where({cod_produto})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_produto} = req.params

            await knex("produtos")
            .where({cod_produto})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}