const knex = require("../database")

module.exports = {

    //Pesquisa de Produtos
    async search (req, res){


        const{codProduto} = req.body

        const dadosProduto = await knex('produtos')
        .where({cod_produto:codProduto})
        .select('produtos.*');

        const{
            cod_produto,
            nome_produto,
            materia_prima_produto,
            quantidade_lote_produto,
            cod_cliente,
            cod_maquina,
        } = dadosProduto[0]

        return res.render('consulta_produto.html', {cod_produto, nome_produto,materia_prima_produto, quantidade_lote_produto,cod_cliente, cod_maquina})
    },

    //Cadastro de Produto
    async create(req, res, next) {
        try{
            const {
                nomeProduto,
                materiaPrima,
                quantLote,
                cnpjCliente,
                codMaquina,
            } = req.body

            //
            await knex('produtos').insert({
                nome_produto: nomeProduto,
                materia_prima_produto: materiaPrima,
                quantidade_lote_produto: quantLote,
                cod_cliente: cnpjCliente,
                cod_maquina: codMaquina,
            })

            return res.render("cadastro_produto.html")
        } catch (error){
            next(error)
        }
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