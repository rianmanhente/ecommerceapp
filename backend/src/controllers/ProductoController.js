const { Op } = require("sequelize");
const Producto = require("../models/Producto");
const User = require("../models/User");
const Cart = require("../models/Cart");

const index = async(req, res) =>{
  try{

      const {category} = req.query;

      const products = await Producto.findAll();

      if(category) {
          const filteredProductsCategory = products.filter((product => product.category.includes(category)))
          return res.status(200).json({ products: filteredProductsCategory});
      } else {
          return res.status(200).json({products});
      }

  } catch(err){
      return res.status(500).json({err});
  }
};

const getWithUser = async (req, res) => {
  try {

    const {userName} = req.params;
    const user = await User.findOne({ where: { name: userName}})
    
    const products = await Producto.findAll({ where: {UserId: 1}});
    if(products.userId == 1) {
      res.status(200).json({products})
    }
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Producto.findByPk(id);
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ err });
  }
};


//qual diferanca entre req params para req query

const create = async (req, res) => {
  try {
    console.log(req.file);
    
    const imagePath = req.file?.filename
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: imagePath,
      
    }
    const products = await Producto.create(newProduct);
    return res
      .status(201)
      .json({ message: "Product successfuly registered", products: products });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createWithUser = async (req, res) => {
  try {
    console.log(req.file);
    const {userName} = req.params;
    const user = await User.findOne({ where: { name : userName}})

    if(!user) {
      return res.status(404).json({ message: "User not found"})
    } 

    const imagePath = req.file?.filename
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: imagePath,
      UserId: user.id
      
    }
    const products = await Producto.create(newProduct);
    await user.addProducto(products);
    return res
      .status(201)
      .json({ message: "Product successfuly registered", products: products });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Producto.update(req.body, { where: { id: id } });
    if (updated) {
      const products = await Producto.findByPk(id);
      return res.status(200).send(products);
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("Product not found");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Producto.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(200).json("Product succesfuly deleted.");
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("Produtc not found.");
  }
};

const purchase = async (req, res) => {
  const { productoId, userId } = req.params;
  try {
    const products = await Producto.findByPk(productoId);
    const user = await User.findByPk(userId);
    await products.setUser(user);
    return res.status(200).json({ msg: "Completed purchase." });
  } catch (err) {
    return res.status(500).json({ err });
  }
};


const cancelPurchase = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Producto.findByPk(id);
    await products.setUser(null);
    return res.status(200).json({ msg: "Cancelled purchase." });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  update,
  destroy,
  create,
  index,
  show,
  purchase,
  cancelPurchase,
  createWithUser,
  getWithUser,
};
