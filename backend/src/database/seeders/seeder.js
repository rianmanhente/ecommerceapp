require('../../config/dotenv')();
require('../../config/sequelize');

const seedProducto = require('./ProductoSeeder');
const seedCart = require('./CartSeeder');
// const seedCartItem = require('./CartItemSeeder');


(async () => {
  try {
    await seedCart();
    await seedProducto();
    // await seedCartItem();



  } catch(err) { console.log(err) }
})();


