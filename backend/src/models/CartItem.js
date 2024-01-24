const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class CartItem extends Model {}

CartItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'CartItem',
  }
);

CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart);
    // Restante das associações, se houver
};

module.exports = CartItem;
