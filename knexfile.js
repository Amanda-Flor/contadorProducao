// Update with your config settings.

module.exports = {
  //conexão com o banco de dados
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: "root",
      password: "",
      database: "contadorproducao"
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
