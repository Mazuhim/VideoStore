
exports.up = (knex) => {
  return knex.schema.createTable('userMovie', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.bigInteger('idUser').unsigned().references('id').inTable('user');
    table.bigInteger('idMovie').unsigned().references('id').inTable('movie');
    table.integer('watched').defaultTo(0);
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('userMovie');
};
