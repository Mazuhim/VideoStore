
exports.up = (knex) => {
  return knex.schema.createTable('stock', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.bigInteger('idMovie').unsigned().references('id').inTable('movie');
    table.integer('available');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('stock');
};
