// Update with your config settings.

module.exports = {
  //conexão com o banco de dados
  development: {
    client: 'mysql',
    connection: {
      database: "contadorproducao",
      user: "root",
      password: ""
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
