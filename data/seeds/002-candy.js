
exports.seed = function(knex) {
      return knex('candy').insert([
        {candy_name: 'Scotchmallow', brand_name: 'Sees Candies', yummy: true},
        {candy_name: 'Strawberry Medallions', brand_name: 'Sees Candies', yummy: true},
        {candy_name: 'Good & Plenties', brand_name: 'Hershey'}
      ]);
};
