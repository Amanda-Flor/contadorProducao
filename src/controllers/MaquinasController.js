const knex = require("../database")

module.exports = {
    async index (req, res){
        const results = await knex("maquinas")

        return res.json(results)
    }
}