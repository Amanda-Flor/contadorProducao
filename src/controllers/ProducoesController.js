const knex = require("../database")
const ls = require("local-storage")
var PythonShell = require('python-shell');

module.exports = {
    async index (req, res){

        const maquinas = await knex('maquinas')
        .select('maquinas.*');

        return res.render("producao.html", {maquinas})
    },

    async producaoOP (req, res){

        const{
            codMaquina
        } = req.body


        //VERIFICAR SE A MÁQUINA JÁ ESTÁ PRODUZINDO
        const statusMaquina = await knex('maquinas')
        .where({'maquinas.cod_maquina': codMaquina})
        .select('maquinas.status_maquina')

        const ops = await knex('ordemproducoes')
        .where({'ordemproducoes.cod_maquina': codMaquina})
        .where({'ordemproducoes.status_ordemProducao': 'em producao'})
        .select('ordemproducoes.cod_ordemProducao', 'ordemproducoes.status_ordemProducao');

        const opsAberto = await knex('ordemproducoes')
        .where({'ordemproducoes.cod_maquina': codMaquina})
        .where({'ordemproducoes.status_ordemProducao': 'aberto'})
        .select('ordemproducoes.cod_ordemProducao', 'ordemproducoes.status_ordemProducao');

        
        if(statusMaquina[0].status_maquina == "em produção"){

            const producao = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao': ops[0]})
            .join('maquinas', 'ordemproducoes.cod_maquina', '=', 'maquinas.cod_maquina')
            .join('produtos', 'ordemproducoes.cod_produto', '=', 'produtos.cod_produto')
            .select('ordemproducoes.*', 'maquinas.nome_maquina', 'maquinas.tipo_maquina', 'maquinas.cavidade_maquina','maquinas.cavidade_uso_maquina', 'maquinas.ciclo_maquina','maquinas.ciclo_uso_maquina','maquinas.status_maquina','produtos.nome_produto' );

            return res.render("producao_maquina.html", {producao})
        }else if(statusMaquina[0].status_maquina == "parada" && opsAberto.length != 0){

            const opsMaquina = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao': opsAberto[0].cod_ordemProducao})
            .select('ordemproducoes.cod_ordemProducao')

            return res.render('op_maquina.html', {opsMaquina})
        }else{

            return res.render('maquina_sem_op.html')
        }
    },
    async createOP(req, res, next) {
        try{
            const {
                codOP,
            } = req.body

            const codMaquina = await knex('ordemproducoes')
            .where({'ordemproducoes.cod_ordemProducao': codOP})
            .select('ordemproducoes.cod_maquina')

            const op = Number(codOP)
            const usuario = Number(ls('usuario'))

            var PythonShell = require('python-shell');

            var options = {
                mode: 'text',
                encoding: 'utf8',
                pythonOptions: ['-u'],
                scriptPath: 'src/controllers/',
                args: [op,usuario,codMaquina[0].cod_maquina]
            };
            
            //EXECUTAR SCRIP NO PYTHON
            PythonShell.run('contadorProducao.py', options, function(error, resultado){
                console.log(resultado)
            });
            

            return res.render('producao_maquina.html')
        } catch (error){
            next(error)
        }
    }
    // async update(req, res, next) {
    //     try{
    //         const {
    //             data_inicio_producao,
    //             data_final_producao,
    //             video_producao,
    //             quant_embalagem_producao,
    //             cod_funcionario,
    //             cod_ordemProducao,
    //             cod_maquina,
    //         } = req.body

    //         const {cod_producao} = req.params

    //         await knex("producoes")
    //         .update({
    //             data_inicio_producao,
    //             data_final_producao,
    //             video_producao,
    //             quant_embalagem_producao,
    //             cod_funcionario,
    //             cod_ordemProducao,
    //             cod_maquina,
    //         })
    //         .where({cod_producao})

    //         return res.send()
    //     } catch (error) {
    //         next(error)
    //     }
    // },
    // async delete(req, res, next){
    //     try{
    //         const{cod_producao} = req.params

    //         await knex("producoes")
    //         .where({cod_producao})
    //         .del()

    //         return res.send()
    //     } catch (error){
    //         next(error)
    //     }
    // }
}