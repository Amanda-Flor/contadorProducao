
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('maquinas').del()
    .then(function () {
      // Inserts seed entries
      return knex('maquinas').insert([
        {nome_maquina: 'Sopradora 01', tipo_maquina: "sopradora", cavidade_maquina: 10, cavidade_uso_maquina: 10, ciclo_maquina: 15, ciclo_uso_maquina: 16},
        {nome_maquina: 'Sopradora 02', tipo_maquina: "sopradora", cavidade_maquina: 6, cavidade_uso_maquina: 6, ciclo_maquina: 10, ciclo_uso_maquina: 12},
        {nome_maquina: 'Rotuladeira 01', tipo_maquina: "rotuladeira", cavidade_maquina: 0, cavidade_uso_maquina: 0, ciclo_maquina: 5, ciclo_uso_maquina: 5},
      ]);
    });
};
