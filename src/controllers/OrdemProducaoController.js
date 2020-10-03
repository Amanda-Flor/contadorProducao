const knex = require("../database")
const ls = require("local-storage")
const usuario = ls('usuario')

module.exports = {
    //Apresenta as ops cadastradas
    async searchOP(req, res, next) {
        try{

            const itensOP = await knex('ordemproducoes')
            .select('ordemproducoes.cod_ordemProducao');

            console.log(itensOP)
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
            .join('produtos', 'ordemproducoes.cod_produto', '=', 'produtos.cod_produto')
            .select('ordemproducoes.cod_ordemProducao', 'ordemproducoes.quantidade_dias_OrdemProdução', 'ordemproducoes.status_ordemProducao','maquinas.nome_maquina', 'ordemproducoes.cod_pedido', 'produtos.nome_produto');

            const{
                cod_ordemProducao,
                quantidade_dias_OrdemProdução,
                status_ordemProducao,
                nome_maquina,
                cod_pedido,
                nome_produto,
            } = dadosOP[0]

            // const produtosOP = await knex('pedidoprodutos')
            // .where({cod_pedido: cod_pedido})
            // .select('pedido_produtos.cod_produto')

            // const{
            //     cod_produto
            // } = produtosOP
            // const produtos = []
    
            // for (var i = 0; i < produtosOP.length; i++) {
            //     for (var j = 0; j < 1; j++) {
            //         produtos.push(produtosOP[i].cod_produto)
            //     }
            // }

            return res.render('consulta_ordemProducao.html', {cod_ordemProducao, quantidade_dias_OrdemProdução, status_ordemProducao, nome_maquina, cod_pedido, nome_produto})
        }catch(error){
            next(error)
        }
    },


    async searchPedido(req, res, next) {
        try{

            const codPedidos = await knex('pedidos')
            .select('pedidos.cod_pedido');

            return res.render('cadastro_ordem_producao.html', { codPedidos })

        } catch (error){
            next(error)
        }
    },
    async selectProduto(req, res, next) {
        try{
            const {codPedido} = req.body

            //armazenar dados do pedido no local Storage
            ls('pedidoOP', String(codPedido))
            var pedido = ls('pedidoOP')

            //apresentar produtos relacionados ao pedido selecionado 
                //Pesquisa produtos do pedido
            const dadosProduto = await knex('pedidoprodutos')
            .where({'pedidoprodutos.cod_pedido':codPedido})
            .join('produtos', 'produtos.cod_produto', '=', 'pedidoprodutos.cod_produto')
            .select('pedidoprodutos.cod_pedido','pedidoprodutos.cod_produto', 'produtos.nome_produto', 'pedidoprodutos.rotulagem_produto', 'pedidoprodutos.quantidade_produto')

            
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
            const produto = Number(ls('produtoOP'))

            //buscar informações do produto
            const itemProduto = await knex('produtos')
            .where({'produtos.cod_produto': produto })
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
        
            //cod_pedido
            const pedido = Number(ls('pedidoOP'))
            //cod_produto
            const produto = Number(ls('produtoOP'))

            //cod_maquina
                //pesquisar na tabela produtos qual a maquina que produz o produto
            const codMaquina = await knex('produtos')
            .where({'produtos.cod_produto': produto})
            .select('produtos.cod_maquina')
            const maquina = codMaquina[0]
            //cadastrar op do produto
            await knex('ordemproducoes').insert({
                quantidade_dias_OrdemProdução: diasOP,
                status_ordemProducao: 'aberto',
                cod_maquina: maquina.cod_maquina,
                cod_pedido: pedido,
                cod_produto: produto,
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