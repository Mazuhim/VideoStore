
exports.up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.string('name', 100);
    table.string('email', 40);
    table.string('password', 20);
    table.string('cpf', 14);
    table.string('phone', 20);
    table.date('birthday');
    table.boolean('active').defaultTo(true);
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('user');
};
