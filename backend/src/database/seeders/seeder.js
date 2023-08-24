require('../../config/dotenv')();
require('../../config/sequelize');

const seedProducto = require('./ProductoSeeder');

(async () => {
  try {
    await seedProducto();

  } catch(err) { console.log(err) }
})();


