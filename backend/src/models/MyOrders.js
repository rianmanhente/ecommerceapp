const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const MyOrders = sequelize.define('MyOrders', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // totalPrice: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'User', // Substitua pelo nome correto da tabela de usuários
    //       key: 'id',
    //     },
    //     allowNull: false,
    //   },
});

MyOrders.associate = function(models) {
    MyOrders.belongsTo(models.User);
};


module.exports = MyOrders;