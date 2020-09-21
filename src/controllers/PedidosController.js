const knex = require("../database")
const ls = require("local-storage")

module.exports = {

    //Pesquisa Pedido
    async seachCliente(req, res, next) {
        try{

            //apresentando clientes no select no html
            const clientes = await knex('clientes')
            .select('clientes.cod_cliente', 'clientes.nome_cliente');
                  

            return res.render('cadastro_pedido.html', {clientes})

        } catch (error){
            next(error)
        }
    },

    async listarProduto(req, res, next){
        try{
            //Pega o valor do select cliente
            const{
                codCliente
            } = req.body
            
            //Criar um local Storage para cliente
            var cod = String(codCliente)
            ls('cliente', cod)

            //buscar nome do cliente no banco
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': codCliente})
            .select('clientes.nome_cliente')

            var nomeCliente = cliente[0].nome_cliente

            //Listar produto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': codCliente})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            //Preparar parametro para nomeProduto e tabelaProdutos
            const nomeProduto = ''
            const tabelaProdutos = ''

            //NOVO PEDIDO
                //obter data 
            var data = new Date();
            var hoje = data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate();
                //obter cod funcionario
            const usuario = ls('usuario')
                //inserir na tabela
            await knex('pedidos').insert({
                data_inicio_pedido: hoje,
                status_pedido: 'aberto',
                cod_funcionario:usuario,
                cod_cliente: codCliente,
            })
                //buscar ultimo cod do pedido
            const codigosPedido = await knex('pedidos')
            .select('pedidos.cod_pedido')
            const codPedido = String(codigosPedido[codigosPedido.length-1].cod_pedido)
                //criar local storage para pedido
            ls('pedido', codPedido)

            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto, nomeProduto, tabelaProdutos})
        }catch(error){
            next(error)
        }
    },

    async escolherProduto(req, res, next){
        try {

            //preparar paramentro nomeCliente
            var cod = Number(ls('cliente'))
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': cod})
            .select('clientes.nome_cliente')

            const nomeCliente = cliente[0].nome_cliente
            
            //Listar produto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': cod})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            //Pega o valor do select produto
            const{
                codProduto
            } = req.body
            
            //Criar um local Storage produto
            var produto = String(codProduto)
            ls('produto', produto)
            
            //buscar nome do produto no banco
            const arrayProduto = await knex('produtos')
            .where({'produtos.cod_produto': codProduto})
            .select('produtos.nome_produto')

            const nomeProduto = arrayProduto[0].nome_produto

            //Preparar parametro para tabelaProdutos
            const tabelaProdutos = ''

            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto, nomeProduto, tabelaProdutos})
        } catch (error) {
            next(error)
        }
    },

    async criarPedidoProduto(req, res, next){
        try {

            //Prepara paramento nomeCliente
                //pegar local Strorage no cliente
            const cod = Number(ls('cliente'))

                //fazer busca no banco do nome do cliente
            const cliente = await knex('clientes')
            .where({'clientes.cod_cliente': cod})
            .select('clientes.nome_cliente')

                //preparando array
            const nomeCliente = cliente[0].nome_cliente
            

            //Preparar parametro listaProduto
            const listaProduto = await knex('produtos')
            .where({'produtos.cod_cliente': cod})
            .select('produtos.nome_produto', 'produtos.cod_produto')

            //Preparar paramentro nomeProduto
                //Pegar local storage do produto
            const produto = Number(ls('produto'))
                //busca de nome do produto no banco
            const arrayProduto = await knex('produtos')
            .where({'produtos.cod_produto': produto})
            .select('produtos.nome_produto')

            const nomeProduto = arrayProduto[0].nome_produto



            //Prepara paramentro tabelaProdutos
                //NOVO PEDIDO_PRODUTOS
                //prepara dados para inserção
                const{
                    quantProduto,
                    rotulagem,
                } = req.body
                //inserir dados do banco pedido_produtos
                await knex('pedido_produtos').insert({
                    cod_produto: produto,
                    cod_pedido: Number(ls('pedido')),
                    quantidade_produto: quantProduto,
                    rotulagem_produto: rotulagem,
                })
                //buscar no banco pedido_produtos pelo cod do pedido
            const tabelaProdutos = await knex('pedido_produtos')
            .where({'pedido_produtos.cod_pedido': Number(ls('pedido'))})
            .select('pedido_produtos.*')



            return res.render('cadastro_pedido_produtos.html', {nomeCliente, listaProduto, nomeProduto, tabelaProdutos})
        } catch (error) {
            next(error)
        }
    },








































    async seachProduto(req, res, next) {
        try{
            const{
                codCliente,
            } = req.body   

            //Preparando cod do cliente para inserir no banco
            const codcliente = await knex('clientes')
            .where({'clientes.nome_cliente':codCliente})
            .select('clientes.cod_cliente')
            
            const cliente = codcliente[codcliente.length-1].cod_cliente
            ls('cliente', cliente)

            
            //Para apresentar o cliente selecionado na pagina
            const nomeCliente = await knex('clientes')
            .where({'clientes.cod_cliente': cliente})
            .select('clientes.nome_cliente','clientes.cod_cliente')

            const apresentarCliente = nomeCliente[0]
            
            //FUNCIONARIO
            var usuario = ls.get('usuario');

            //DATA => atribuir data em localStorage
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth();
            var ano = data.getFullYear();
            var data1 = ano + '-' + (mes+1) + '-' + dia;

            // //Criar Pedido no banco de dados 
            // await knex('pedidos').insert({
            //     data_inicio_pedido: data1,
            //     status_pedido: 'aberto',
            //     cod_funcionario:usuario,
            //     cod_cliente: cliente,
            // })

            //Pegando o valor do último cod_pedido que vou criado
            const pedidos = await knex('pedidos')
            .select('pedidos.cod_pedido')

            var pedido = pedidos[pedidos.length-1].cod_pedido;
    
            //guardadno cod_pedido gerado para cadastrar os produtos ao pedido
            ls('pedido', pedido)
            


            //apresentar os produtos do cliente selecionado
            const dadosProduto = await knex('produtos')
            .where({'produtos.cod_cliente':cliente})
            .select('produtos.nome_produto');
            const produtos = []
    
            for (var i = 0; i < dadosProduto.length; i++) {
                for (var j = 0; j < 1; j++) {
                    produtos.push(dadosProduto[i])
                }
            }

            return res.render('cadastro_pedido1.html',{ produtos, apresentarCliente })

        } catch (error){
            next(error)
        }
    },
    async dadosPedido(req, res, next) {
        try{

            //Salvar dados dos produtos do pedido
            const {
                codProduto,
                quantProduto,
                rotulagem,
            } = req.body

            console.log(codProduto)
            //converter nome do produto para o cod
            const dadosProduto = await knex('produtos')
            .where({'produtos.nome_produto': codProduto})
            .select('produtos.cod_produto')

            const apresentaProduto = dadosProduto[0]
            console.log(dadosProduto)
            // var produto = dadosProduto[0].cod_produto
            // ls('produto', produto)
            // console.log(produto)

            // var pedido = ls.get('pedido');
            // await knex('pedido_produtos').insert({
            //     cod_produto: codProduto,
            //     cod_pedido: pedido,
            //     quantidade_produto: quantProduto,
            //     rotulagem_produto: rotulagem,
            // })

            var cliente = ls.get('cliente');
            //buscar nome do cliente
            const nomeCliente = await knex('clientes')
            .where({'clientes.cod_cliente': cliente})
            .select('clientes.nome_cliente')

            const apresentarCliente = nomeCliente[0]


            return res.render('cadastro_pedido2.html', {apresentarCliente})
        } catch (error){
            next(error)
        }
    },
    async preencherTabela(req, res, next){
        try{
             //pegar dados do form e preencher tabela
            const{
                quantProduto,
                rotulagem,
            } = req.body

            //numero do pedido
            var pedido = ls.get('pedido')

            //info de cliente
            var cliente = ls.get('cliente')
            const dadosClientes = await knex('clientes')
            .where({'clientes.cod_cliente': cliente})
            //nome, email, telefone e  do cliente
            .select('clientes.nome_cliente', 'clientes.telefone_cliente', 'clientes.email_cliente')
            const dadosCliente = dadosClientes[0]

            //nome do usuario
            var usuario = ls.get('usuario');
            const dadosUsuario = await knex('funcionarios')
            .where({'funcionarios.cod_funcionario': usuario})
            .select('funcionarios.nome_funcionarios')
            const nomeUsuario = dadosUsuario[0]
            console.log(dadosUsuario)

            //Dados dos produtos do pedido
            //usar tabela pedido_produtos
            //cod dos podutos
            //nome dos produtos
            //rotulagem dos produtos
            //quantidade dos produtos

            

            // var nomeFuncionario = dadosUsuario.nome_funcionarios

            // var pedido = ls.get('pedido');
            // const dataPedido = await knex('pedidos')
            // .where({'pedidos.cod_pedido': pedido})
            // .select('pedidos.data_inicio_pedido')

            // const dadosProdutos = await knex('pedido_produtos')
            // .where({'pedido_produtos.cod_pedido': pedido})
            // .select('pedido_produtos.*')

            
            // const dadosProduto = await knex('produtos')
            // .where({'produtos.cod_produto': cliente})
            // .select('produtos.nome_produto')
            
            // const produto = []

            // for (var i = 0; i < dadosProdutos.length; i++) {
            //     for (var j = 0; j < 1; j++) {
            //         produto.push(dadosProdutos[i])
            //     }
            // }

            // //Não está puxando a data
            // console.log(dataPedido.data_inicio_pedido)





           
            return res.render('cadastro_pedido3.html', {pedido, dadosCliente, usuario })
        }catch(error){
            next(error)
        }
    },
    async tabelaPedido(req, res, next, ) {
        try{

            //Preencher

            //Preencher Cod-cliente
            var cliente = ls.get('cliente')
            const nomeCliente = await knex('clientes')
            .where({'clientes.cod_cliente': cliente})
            .select('clientes.nome_cliente','clientes.cod_cliente')

            const apresentarCliente = nomeCliente[0]

            //Preencher Cod-produto
            var produto = ls.get('produto')

            const nomeProduto = await knex('produtos')
            .where({'produtos.cod_produto': produto})
            .select('produtos.cod_produto', 'produtos_nome_produto')

            const apresentaProduto = nomeProduto[0]

            return res.render('cadastro_pedido2.html', {apresentarCliente, apresentaProduto})
        } catch (error){
            next(error)
        }
    },

    
    async search (req, res){

        const{codPedido} = req.body

        const dadosPedido = await knex('pedidos')
        .where({cod_pedido:codPedido})
        .select('pedidos.*');

        // const{
        //     cod_pedido,
        //     quantidade_produto_pedido,
        //     rotulagem_pedido,
        //     data_inicio_pedido,
        //     status_pedido,
        //     cod_funcionario,
        //     cod_cliente,
        //     status
        // } = dadosPedido[0]


        const dadosProdutosPedido = await knex('pedido_produtos')
        .where({cod_pedido:codPedido})
        .select('pedido_produtos.*')

        const{
            cod_produto,
            cod_pedido,
        } = dadosProdutosPedido[0]



        return res.render('consulta_pedido.html', )
    },
    async update(req, res, next) {
        try{
            const {
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente,
                status
            } = req.body

            const {cod_pedido} = req.params

            await knex("pedidos")
            .update({
                quantidade_produto_pedido,
                rotulagem_pedido,
                data_inicio_pedido,
                status_pedido,
                cod_funcionario,
                cod_cliente,
                status
            })
            .where({cod_pedido})

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next){
        try{
            const{cod_pedido} = req.params

            await knex("pedidos")
            .where({cod_pedido})
            .del()

            return res.send()
        } catch (error){
            next(error)
        }
    }
}