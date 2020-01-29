
exports.up = (knex) => {
  return knex.schema.createTable('character', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.string('name', 100);
    table.string('description', 300);
    table.bigInteger('idActor').unsigned().references('id').inTable('actor');
    table.bigInteger('idMovie').unsigned().references('id').inTable('movie');
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('character');
};
