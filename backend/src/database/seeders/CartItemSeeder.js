const CartItem = require("../../models/CartItem");

const seedCartItem = async function () {
  try {
    await CartItem.sync({ force: true });

    // Suponha que você tenha IDs válidos de um produto (ProductId) e de um carrinho (CartId)
    const productId = 1; // Substitua pelo ID válido do produto
    const cartId = 1; // Substitua pelo ID válido do carrinho

    const cartItem = await CartItem.create({
      quantity: 1, // Defina a quantidade conforme necessário
      ProductoId: productId,
      CartId: cartId,
    });

    console.log("CartItem created:", cartItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedCartItem;
