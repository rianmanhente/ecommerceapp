const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");
const CartItem = require('./CartItem'); 


const Producto = sequelize.define('Producto', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Defina um valor padrão para a quantidade
    },
    image:{
         type: DataTypes.STRING,
         allowNull:false
    },  
});

Producto.associate = function(models) {
    Producto.belongsTo(models.User);
    Producto.belongsTo(models.Cart);
    // Producto.belongsTo(models.CartItem);
};


module.exports = Producto;