const { Op } = require("sequelize");
const User = require("../models/User");
const Cart = require("../models/Cart")
const MyOrder = require("../models/MyOrders")
const Auth = require("../config/Auth");
const Producto = require("../models/Producto");

const index = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  try {

    const imagePath = req.file?.filename
    const { password } = req.body;
    const HashSalt = Auth.generatePassword(password);
    const salt = HashSalt.salt;
    const hash = HashSalt.hash;
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      image: imagePath,
      hash: hash,
      salt: salt,
    };
    const user = await User.create(newUser);
    return res
      .status(201)
      .json({ msg: "User successfully registered", user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, { where: { id: id } });
    if (updated) {
      const user = await User.findByPk(id);
      return res.status(200).send(user);
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("User not found");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(200).json("User successfully deleted.");
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("User not found.");
  }
};

// const finishPurchase = async (req, res) => {
//   const {cartUserId, userId} = req.params
//   try {
//     const cart = await Cart.findByPk(cartUserId)
//     const user = await User.findByPk(userId)
//     const products = cart.getProductos()

//     const myOrders = []

//     // let sum = 0;
//     // const productsSumValue = products.map((product) => {
//     //   sum += product.price
//     // })

//     // const myOrders = []
//     // Crie um pedido vazio associado ao usuário
//     await MyOrders.create({
//       name: `Pedido do ${user.name}`, // Defina o valor inicial como 0
//       userId: userId,
//       totalPrice:  100,
      
//       // Associe o pedido ao usuário usando a chave estrangeira
//     });

//     myOrders.push(MyOrders)

//     await user.setOrders([myOrders]);
//     // await cart.removeProductos(products)
//     return res.status(200).json({ msg: "Completed purchase." });
//   } catch (err) {
//     return res.status(500).json({ err });
//   }
// }

const finishPurchase = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const cart = await Cart.findByPk(userId)

    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    const products = await cart.getProductos();    
    // const totalPrice = cart.Productos.reduce((total, product) => total + product.price, 0);

    // Crie um pedido associado ao usuário
    const myOrder = await MyOrder.create({
      name: `Pedido do ${user.name}`,
      // userId: userId,
      // totalPrice: totalPrice,
    });

    // Associe os produtos do carrinho ao pedido
    // await myOrder.addProductos(products);

    // Limpe o carrinho (remova os produtos)
    // await cart.removeProductos(products);

    return res.status(200).json({ message: 'Compra finalizada com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao finalizar a compra',});
  }
};


module.exports = {
  update,
  destroy,
  create,
  index,
  show,
  finishPurchase
};
