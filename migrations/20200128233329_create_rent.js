
exports.up = (knex) => {
  return knex.schema.createTable('rent', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.bigInteger('idUser').unsigned().references('id').inTable('user');
    table.bigInteger('idMovie').unsigned().references('id').inTable('movie');
    table.double('amout');
    table.dateTime('returnOn');
    table.dateTime('closedAt');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('rent');
};
