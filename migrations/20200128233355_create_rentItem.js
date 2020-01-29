
exports.up = (knex) => {
  return knex.schema.createTable('rentItem', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.bigInteger('idRent').unsigned().references('id').inTable('rent');
    table.bigInteger('idMovie').unsigned().references('id').inTable('movie');
    table.double('amout');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('rentItem');
};
