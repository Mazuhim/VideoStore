
exports.up = (knex) => {
  return knex.schema.createTable('actor', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.string('name', 100);
    table.string('description', 300);
    table.date('birthday');
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('actor');
};
