const knex = require("../database")

module.exports = {
    async searchOP(req, res, next) {
        try{

            const itensOP = await knex('ordemproducoes')
            .select('ordemproducoes.cod_ordemProducao');
            const ops = []
    
            for (var i = 0; i < itensOP.length; i++) {
                for (var j = 0; j < 1; j++) {
                    ops.push(itensOP[i].cod_ordemProducao)
                }
            }
            return res.render('consulta_ordemProducao.html', { ops })

        } catch (error){
            next(error)
        }
    },
    async search (req, res, next){
        
        try{

            const{codOP} = req.body

            const itensOP = await knex('ordemproducoes')
            .select('ordemproducoes.cod_ordemProducao');
            const ops = []
    
            for (var i = 0; i < itensOP.length; i++) {
                for (var j = 0; j < 1; j++) {
                    ops.push(itensOP[i].cod_ordemProducao)
                }
            }

            const codOrdemProducao = ops[codOP]
            console.log(codOrdemProducao)
            const dadosOP = await knex('ordemproducoes')
            .where({cod_ordemProducao:codOrdemProducao})
            .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
            .select('ordemproducoes.cod_ordemProducao', 'ordemproducoes.data_inicio_ordemProducao','ordemproducoes.data_final_ordemProducao', 'maquinas.nome_maquina', 'ordemproducoes.cod_pedido');

            const{
                cod_ordemProducao,
                data_inicio_ordemProducao,
                data_final_ordemProducao,
                nome_maquina,
                cod_pedido,
            } = dadosOP[0]

            const produtosOP = await knex('pedido_produtos')
            .where({cod_pedido: cod_pedido})
            .select('pedido_produtos.cod_produto')

            const{
                cod_produto
            } = produtosOP
            const produtos = []
    
            for (var i = 0; i < produtosOP.length; i++) {
                for (var j = 0; j < 1; j++) {
                    produtos.push(produtosOP[i].cod_produto)
                }
            }

            return res.render('consulta_ordemProducao.html', {cod_ordemProducao, data_inicio_ordemProducao, data_final_ordemProducao, nome_maquina, cod_pedido, produtos})
        }catch(error){
            next(error)
        }
    },
    async searchPedido(req, res, next) {
        try{

            const itensPedido = await knex('ordemproducoes')
            .select('ordemproducoes.cod_pedido');
            const pedidos = []
    
            for (var i = 0; i < itensPedido.length; i++) {
                for (var j = 0; j < 1; j++) {
                    pedidos.push(itensPedido[i].cod_pedido)
                }
            }
            return res.render('cadastro_ordem_producao.html', { pedidos })

        } catch (error){
            next(error)
        }
    },
    async selectProduto(req, res, next) {
        try{
            const {codPedido} = req.body

            //Pesquisa produtos do pedido
            const itensPedido = await knex('pedido_produtos')
            .where({cod_pedido:codPedido})
            .join('produtos', 'produtos.cod_produto', '=', 'pedido_produtos.cod_produto')
            .select('pedido_produtos.cod_pedido', 'produtos.nome_produto', 'pedido_produtos.rotulagem_produto', 'pedido_produtos.quantidade_produto')

            
            return res.render('cadastro_ordem_producao.html', {itensPedido})

        } catch (error){
            next(error)
        }
    },
    async createOP(req, res, next) {
        try{

            const {
                CodPedido,
                nomeProduto,
                rotulagemProduto,
                quantidadeProduto,
                inicioOP,
                finalOP,
            } = req.body;

            console.log(nomeProduto)

            //consulta produto no banco para salvar na tabela ordemproducoes
            const itensProduto = await knex('produtos')
            .where({nome_produto:nomeProduto})
            .select('produtos.cod_produto', 'produtos.cod_maquina')


            //inserir no banco de dados
            await knex('produtos').insert({
                data_inicio_ordemProducao: inicioOP,
                data_final_ordemProducao: finalOP,
                cod_maquina:cod_maquina,
                cod_pedido:cod_produto,
            })

            console.log("cadastrado")
            return res.render('cadastro_ordemProducao.html')
        } catch (error){
            next(error)
        }
            
            return res.render("cadastro_ordem_producao.html")
        
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