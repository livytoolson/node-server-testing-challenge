
exports.up = function(knex) {
  return knex.schema.createTable('candy', table => {
      table.increments();
      table.string('candy_name', 128).notNullable
      table.string('candy_brand', 128).notNullable
      table.boolean('yummy').default(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('candy')
};
