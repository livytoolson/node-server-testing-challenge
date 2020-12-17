
exports.seed = function(knex) {
      return knex('candy').insert([
        {candy_name: 'Scotchmallow', candy_brand: 'Sees Candies', yummy: true},
        {candy_name: 'Strawberry Medallions', candy_brand: 'Sees Candies', yummy: true},
        {candy_name: 'Good & Plenties', candy_brand: 'Hershey'}
      ]);
};
