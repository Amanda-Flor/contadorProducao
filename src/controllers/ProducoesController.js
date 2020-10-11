const knex = require("../database")
const ls = require("local-storage")
var PythonShell = require('python-shell');

module.exports = {
    async index (req, res){

        const maquinas = await knex('maquinas')
        .select('maquinas.*');
        return res.render("producao.html", {maquinas})
    },
    async pesquisaOP (req, res, next){
        try {
            const{
                codMaquina
            } = req.body

            ls('maq', String(codMaquina))
            //1 - VERIFICAR STATUS DA MÁQUINA
            const statusMaquina = await knex('maquinas')
            .where({'maquinas.cod_maquina': codMaquina})
            .select('maquinas.status_maquina', 'maquinas.cod_maquina')

            if(statusMaquina[0].status_maquina == 'em produção'){

                const ops = await knex('ordemproducoes')
                .where({'ordemproducoes.cod_maquina': statusMaquina[0].cod_maquina})
                .where({'ordemproducoes.status_ordemProducao': 'em produção'})
                .select('ordemproducoes.cod_ordemProducao');

                const infoOP = await knex('ordemproducoes')
                .where({'ordemproducoes.cod_ordemProducao': ops[0].cod_ordemProducao})
                .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
                .join('pedidoProdutos', 'ordemproducoes.cod_pedidoProdutos', '=', 'pedidoProdutos.cod_pedidoProdutos')
                .join('produtos', 'pedidoProdutos.cod_produto', '=', 'produtos.cod_produto')
                .join('pedidos', 'pedidoProdutos.cod_pedido', '=', 'pedidos.cod_pedido')
                .join('clientes', 'clientes.cod_cliente', '=', 'produtos.cod_cliente')
                .join('producoes', 'producoes.cod_ordemProducao', '=', 'ordemproducoes.cod_ordemProducao')
                .select(
                    'producoes.cod_producao',
                    'producoes.quantidade_producao',
                    'producoes.status_producao',
                    'producoes.data_inicio_producao',
                    'maquinas.nome_maquina',
                    'maquinas.cavidade_uso_maquina',
                    'maquinas.ciclo_uso_maquina',
                    'ordemproducoes.cod_ordemProducao',
                    'ordemproducoes.quantidade_dias_OrdemProdução',
                    'produtos.nome_produto',
                    'pedidos.cod_pedido',
                    'clientes.nome_cliente',
                    'pedidoProdutos.quantidade_produto'
                );
                const infoProducao = infoOP[0]
                ls('op', String(infoProducao.cod_ordemProducao))

                return res.render("producao_continuar.html", {infoProducao})
            }else{
                //consulta de op de maquinas paradas
                const opsAberto = await knex('ordemproducoes')
                .where({'ordemproducoes.cod_maquina': codMaquina})
                .where({'ordemproducoes.status_ordemProducao': 'aberto'})
                .select('ordemproducoes.cod_ordemProducao');

                if(opsAberto.length == []){
                    return res.render('maquina_sem_op.html')
                }else{
                    return res.render('op_maquina.html', {opsAberto})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    async createProducao(req, res, next) {
        try{
            const {
                codOP,
            } = req.body

            ls('op', String(codOP))
            //BUSCA cod_maquina
            const codMaquina = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao': codOP})
            .join('pedidoProdutos', 'ordemproducoes.cod_pedidoProdutos', '=', 'pedidoProdutos.cod_pedidoProdutos')
            .select('ordemproducoes.cod_maquina')
            //BUSCA cod_ordemProducao
            const op = Number(codOP)
            //BUSCA cod_funcionario
            const usuario = Number(ls('usuario'))
            //BUSCA data_inicio_producao
            var data = new Date();

            //CRIAR A PRODUÇÃO ANTES DE ENTRAR NO PYTHON
            await knex('producoes').insert({
                data_inicio_producao: data,
                data_final_producao: '0000-00-00',
                video_producao:'producao10.mp4',
                status_producao: 'em produção',
                cod_funcionario: usuario,
                cod_maquina: codMaquina[0].cod_maquina,
                cod_ordemProducao: op,
                quantidade_producao: 0,
            })

            //ALTERANDO STATUS DA ORDEM DE PRODUÇÃO
            await knex("ordemproducoes")
            .where({'cod_ordemProducao': op})
            .update({'status_ordemProducao': 'em produção'})

            //ALTERANDO STATUS DA MÁQUINA
            await knex("maquinas")
            .where({'cod_maquina': codMaquina[0].cod_maquina})
            .update({'status_maquina': 'em produção'})

            //preparar parametro da producao
            const infoOP = await knex('ordemproducoes')
                .where({'ordemproducoes.cod_ordemProducao': op})
                .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
                .join('pedidoProdutos', 'ordemproducoes.cod_pedidoProdutos', '=', 'pedidoProdutos.cod_pedidoProdutos')
                .join('produtos', 'pedidoProdutos.cod_produto', '=', 'produtos.cod_produto')
                .join('pedidos', 'pedidoProdutos.cod_pedido', '=', 'pedidos.cod_pedido')
                .join('clientes', 'clientes.cod_cliente', '=', 'produtos.cod_cliente')
                .join('producoes', 'producoes.cod_ordemProducao', '=', 'ordemproducoes.cod_ordemProducao')
                .select(
                    'producoes.cod_producao',
                    'producoes.quantidade_producao',
                    'producoes.status_producao',
                    'producoes.data_inicio_producao',
                    'maquinas.nome_maquina',
                    'maquinas.cavidade_uso_maquina',
                    'maquinas.ciclo_uso_maquina',
                    'ordemproducoes.cod_ordemProducao',
                    'ordemproducoes.quantidade_dias_OrdemProdução',
                    'produtos.nome_produto',
                    'pedidos.cod_pedido',
                    'clientes.nome_cliente',
                    'pedidoProdutos.quantidade_produto'
                );
                const infoProducao = infoOP[0]
            
            return res.render('producao_iniciar.html', {infoProducao})
                
        } catch (error){
            next(error)
        }
    },
    async continuarProducao(req, res, next){
        try {            
            const op = Number(ls('op'))
            
            const infoOP = await knex('ordemproducoes')
                .where({'ordemproducoes.cod_ordemProducao': op})
                .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
                .join('pedidoProdutos', 'ordemproducoes.cod_pedidoProdutos', '=', 'pedidoProdutos.cod_pedidoProdutos')
                .join('produtos', 'pedidoProdutos.cod_produto', '=', 'produtos.cod_produto')
                .join('pedidos', 'pedidoProdutos.cod_pedido', '=', 'pedidos.cod_pedido')
                .join('clientes', 'clientes.cod_cliente', '=', 'produtos.cod_cliente')
                .join('producoes', 'producoes.cod_ordemProducao', '=', 'ordemproducoes.cod_ordemProducao')
                .select(
                    'producoes.cod_producao',
                    'producoes.quantidade_producao',
                    'producoes.status_producao',
                    'producoes.data_inicio_producao',
                    'maquinas.nome_maquina',
                    'maquinas.cavidade_uso_maquina',
                    'maquinas.ciclo_uso_maquina',
                    'ordemproducoes.cod_ordemProducao',
                    'ordemproducoes.quantidade_dias_OrdemProdução',
                    'produtos.nome_produto',
                    'pedidos.cod_pedido',
                    'clientes.nome_cliente',
                    'pedidoProdutos.quantidade_produto'
                );

                const infoProducao = infoOP[0]
                var quantidadeProducao = infoProducao.quantidade_producao
                var quantidadeProduto = infoProducao.quantidade_produto

            if(quantidadeProducao >= quantidadeProduto){
                return res.render('producao_finalizar.html', {infoProducao})
            }else{
                //inicializar programa em python
                var PythonShell = require('python-shell')
                    var options = {
                        mode: 'text',
                        encoding: 'utf8',
                        pythonOptions: ['-u'],
                        scriptPath: 'src/controllers/',
                        args: [infoProducao.cod_producao, infoProducao.quantidade_producao]
                    };
                    //EXECUTAR SCRIP NO PYTHON
                    PythonShell.run('contadorProducao.py', options, function(error, resultado){
                        //console.log(resultado)
                    });

                return res.render('producao_verificar.html', {infoProducao})
            }
        } catch (error) {
            next(error)
        }
    },
    async finalizarProducao(req, res, next){
        try {
            
            const op = Number(ls('op'))
            var data = new Date();
            console.log(op)

            const producao = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao': op})
            .join('producoes', 'ordemproducoes.cod_ordemProducao', '=', 'producoes.cod_ordemProducao')
            .select('producoes.cod_producao')
            
            //ALTERANDO STATUS DA PRODUÇÃO E DATA FINAL
            await knex("producoes")
            .where({'cod_producao': producao[0].cod_producao})
            .update({'status_producao': 'finalizada'})
            .update({'data_final_producao': data})

            //ALTERANDO STATUS DA ORDEM DE PRODUÇÃO
            await knex("ordemproducoes")
            .where({'cod_ordemProducao': op})
            .update({'status_ordemProducao': 'finalizada'})

            //ALTERANDO STATUS DA MÁQUINA
            const maq = Number(ls('maq'))
            await knex("maquinas")
            .where({'cod_maquina': maq})
            .update({'status_maquina': 'parada'})


            const maquinas = await knex('maquinas')
            .select('maquinas.*');
            return res.render("producao.html", {maquinas}) 

        } catch (error) {
            next(error)
        }
    }
}
    