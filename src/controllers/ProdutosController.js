const { select, as, update } = require("../database");
const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')



module.exports = {
    
    //Apresenta cliente e maquina para completar a criação
    async searchForm (req, res, next){

        try{
        
            const maquinas = await knex('maquinas')
            .select('maquinas.nome_maquina', 'maquinas.cod_maquina');

            const clientes = await knex('clientes')
            .select('clientes.nome_cliente', 'clientes.cod_cliente');
            
            return res.render('cadastro_produto.html' , {clientes, maquinas});
            
        }catch(error){
            next(error)
        }
    },

    async create(req, res, next) {
        try{

            const {
                cliente,
                maquina,
                nomeProduto,
                quantLote,
            } = req.body;


            //inserir no banco de dados
            await knex('produtos').insert({
                nome_produto: nomeProduto,
                quantidade_lote_produto: quantLote,
                cod_cliente: cliente,
                cod_maquina: maquina,
                status_produto: 'ativo',
            })


            
            return res.render('produto.html')
        } catch (error){
            next(error)
        }
            
            return res.render("cadastro_produto.html")
        
    },

    //Apresenta produtos cadastrados
    async searchProdutos (req, res){
    
        const itensProdutos = await knex('produtos')
        .where({'produtos.status_produto': 'ativo'})
        .select('produtos.nome_produto', 'produtos.cod_produto');

        
        return res.render('consulta_produto.html' , {itensProdutos})

    },

    //Apresentação dados do produtos pesquisado
    async searchProduto (req, res){

        const{codProduto} = req.body
        
        const dadosProduto = await knex('produtos')
        .where({cod_produto:codProduto})
        .join('maquinas', 'produtos.cod_maquina', '=', 'maquinas.cod_maquina')
        .join('clientes', 'produtos.cod_cliente', '=', 'clientes.cod_cliente')
        .select('produtos.cod_produto', 'produtos.nome_produto', 'produtos.quantidade_lote_produto', 'maquinas.nome_maquina', 'clientes.nome_cliente', 'clientes.email_cliente', 'clientes.telefone_cliente');

        const{
            cod_produto,
            nome_produto,
            quantidade_lote_produto,
            nome_maquina,
            nome_cliente,
            email_cliente,
            telefone_cliente,
        } = dadosProduto[0]
        
        return res.render('consulta_produto.html', {cod_produto, nome_produto, quantidade_lote_produto, nome_maquina, nome_cliente, email_cliente, telefone_cliente,})
    },
    
    async apresentarInfoProdutos(req, res, next) {
        try{
            const {
                codProduto
            } = req.body

            const dadosProduto = await knex('produtos')
            .where({cod_produto:codProduto})
            .join('maquinas', 'produtos.cod_maquina', '=', 'maquinas.cod_maquina')
            .join( 'clientes', 'clientes.cod_cliente', '=', 'produtos.cod_cliente')
            .select(
                'produtos.cod_produto',
                'produtos.nome_produto', 
                'produtos.quantidade_lote_produto', 
                'maquinas.nome_maquina',
                'produtos.status_produto',
                'clientes.nome_cliente'
            )
            const infoProdutos = dadosProduto[0]

            const dadosMaquina = await knex('maquinas')
            .select('cod_maquina', 'nome_maquina')

            const maquinas = dadosMaquina

            return res.render('atualizar_produto.html', {infoProdutos, maquinas})
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next){
        try {
            const {
                codProduto,
                maquina,
                nomeProduto,
                quantLote,
            } = req.body

            await knex("produtos")
            .where({cod_produto:codProduto })
            .update({
                nome_produto: nomeProduto ,
                quantidade_lote_produto: quantLote,
                cod_maquina: maquina
            })
            return res.render('produto.html')

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{codProduto} = req.body

            await knex("produtos")
            .where({cod_produto: codProduto})
            .update({
                status_produto: 'desativado',
            })

            return res.render('produto.html')
        } catch (error){
            next(error)
        }
    }
}