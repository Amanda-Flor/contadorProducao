const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')

module.exports = {
    //Apresenta as ops cadastradas
    async searchOP(req, res, next) {
        try{

            const itensOP = await knex('ordemProducoes')
            .select('ordemProducoes.cod_ordemProducao');
            return res.render('consulta_ordemProducao.html', { itensOP })

        } catch (error){
            next(error)
        }
    },
    async search (req, res, next){
        
        try{
            
            const{codOP} = req.body

            const dadosOP = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao':codOP})
            .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
            .join('pedidoProdutos', 'pedidoProdutos.cod_pedidoProdutos', '=', 'ordemproducoes.cod_pedidoProdutos')
            .join('produtos', 'pedidoProdutos.cod_produto', '=', 'produtos.cod_produto')
            .select(
                'ordemproducoes.cod_ordemProducao', 
                'ordemproducoes.quantidade_dias_OrdemProdução', 
                'ordemproducoes.status_ordemProducao',
                'maquinas.nome_maquina', 
                'ordemproducoes.cod_pedidoProdutos', 
                'produtos.nome_produto',
                'pedidoProdutos.quantidade_produto'
            );
            const op = dadosOP[0]

            return res.render('consulta_ordemProducao.html', {op})
        }catch(error){
            next(error)
        }
    },
    async searchPedido(req, res, next) {
        try{

            const codPedidos = await knex('pedidos')
            .select('pedidos.cod_pedido');

            return res.render('cadastro_ordem_producao.html', {codPedidos})

        } catch (error){
            next(error)
        }
    },
    async selectProduto(req, res, next) {
        try{
            const {codPedido} = req.body
            //armazenar dados do pedido no local Storage
            ls('pedidoOP', String(codPedido))

            //apresentar produtos relacionados ao pedido selecionado 
                //Pesquisa produtos do pedido
            const dadosProduto = await knex('pedidoProdutos')
            .where({'pedidoProdutos.cod_pedido':codPedido})
            .join('produtos', 'produtos.cod_produto', '=', 'pedidoProdutos.cod_produto')
            .select('pedidoProdutos.cod_pedido','pedidoProdutos.cod_produto', 'produtos.nome_produto', 'pedidoProdutos.rotulagem_produto', 'pedidoProdutos.quantidade_produto', 'pedidoProdutos.cod_pedidoProdutos')
            return res.render('cadastro_ordem_producao.html', {dadosProduto})

        } catch (error){
            next(error)
        }
    },
    async createOP(req, res, next) {
        try{

            const {
                codProduto
            } = req.body;
            //criar um local storage para armazenar os dados do produtoOP
            ls('produtoOP', String(codProduto))

            //buscar informações do produto
            const itemProduto = await knex('produtos')
            .join('pedidoProdutos', 'produtos.cod_produto', '=', 'pedidoProdutos.cod_produto')
            .select('produtos.cod_produto', 'produtos.nome_produto')
            
            const dadosProduto1 = itemProduto[0]

            return res.render('cadastro_ordem_producao.html', {dadosProduto1})
        } catch (error){
            next(error)
        }
        
    },   
    async finalizarOrdemProducao(req,res,next){
        try {
            const{
                diasOP
            } = req.body
        
            //cod_produto
            const produto = Number(ls('produtoOP'))

            //cod_maquina
                //pesquisar na tabela produtos qual a maquina que produz o produto
            const codMaquina = await knex('pedidoProdutos')
            .join('produtos', 'pedidoProdutos.cod_produto', '=', 'produtos.cod_produto')
            .where({'pedidoProdutos.cod_pedidoProdutos': produto})
            .select('produtos.cod_maquina')
            const maquina = codMaquina[0]

            //cadastrar op do produto
            await knex('ordemproducoes').insert({
                quantidade_dias_OrdemProdução: diasOP,
                status_ordemProducao: 'aberto',
                cod_maquina: maquina.cod_maquina,
                cod_pedidoProdutos: produto
            })

            return res.render('ordem_producao.html')
            
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try{
            const {
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            } = req.body

            const {cod_ordemProducao} = req.params

            await knex("ordemProducoes")
            .update({
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                cod_maquina,
                cod_pedido
            })
            .where({cod_ordemProducao})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_ordemProducao} = req.params

            await knex("ordemProducoes")
            .where({cod_ordemProducao})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}