const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    hash: {
        type: DataTypes.STRING,
    },
    salt: {
        type: DataTypes.STRING,
    }

});

User.associate = function(models) {
    User.hasMany(models.Producto);
    // User.hasMany(models.MyOrders, { foreignKey: 'userId' }); // 'userId' é a chave estrangeira em MyOrders que se relaciona com User
};

module.exports = User;