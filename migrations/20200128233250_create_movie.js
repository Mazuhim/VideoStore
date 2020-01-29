
exports.up = (knex) => {
  return knex.schema.createTable('movie', (table) => {
    table.bigIncrements('id').unsigned().notNullable();
    table.string('title', 100);
    table.string('synopsis', 300);
    table.string('coverUrl', 300);
    table.string('trailerUrl', 300);
    table.dateTime('releaseDate');
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('movie');
};
