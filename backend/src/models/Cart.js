const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Cart = sequelize.define('Cart', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.hasMany(models.Producto)
    // Cart.hasMany(models.CartItem)

};


module.exports = Cart;