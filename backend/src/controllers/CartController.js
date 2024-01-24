const {Op} = require('sequelize')
const Cart = require('../models/Cart');
const User = require('../models/User');
const Producto = require('../models/Producto');
const CartItem = require("../models/Cart")


const index = async(req, res) =>{
    try{
        const cart = await Cart.findAll();
        return res.status(200).json({cart});
    } catch(err){
        console.log(err.message)
        return res.status(500).json({err});
    }
};

const show = async(req,res) => {
    const {id} = req.params;
    try {
        const cart = await Cart.findByPk(id);
        return res.status(200).json({cart});
    }catch(err){
        return res.status(500).json({err});
    }
};

const create = async(req,res) => {
    try{
          const cart = await Cart.create(req.body);
          console.log(req.body);
          return res.status(201).json({msg: "Cart successfully registered!", cart: cart});
      }catch(err){
          res.status(500).json({error: err});
      }
};

const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Cart.update(req.body, {where: {id: id}});
        if(updated) {
            const cart = await Cart.findByPk(id);
            return res.status(200).send(cart);
        } 
        throw new Error();
    }catch(err){
        return res.status(500).json("Cart not found");
    }
};

const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Cart.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Cart successfully deleted.");
        }
        throw new Error ();
    }catch(err){
        return res.status(500).json("Cart not found.");
    }
};


const associateToUser = async(req, res) => {
    const {userId, cartId} = req.params;
    try {
        const user = await User.findByPk(userId)
        const cart  = await Cart.findByPk(cartId)

        if(!user || !cart) {
            return res.status(404).json({error: "User or cart not found"})
        }

        const userName = user.name

        const updatedCart = await cart.update({
            name:  `${userName}${cart.name}`
        })

        await  updatedCart.setUser(user)
        return res.status(200).json({ msg: "Cart associated"})
    }catch(err) {
        return res.status(500).json({err});
    }
}


const addProductToCart = async (req, res) => {
    const { cartUserId, productId } = req.params;
    try {
        const cart = await Cart.findByPk(cartUserId);
        const product = await Producto.findByPk(productId);

        if (!cart || !product) {
            return res.status(404).json({ msg: "User or Product not found" });
        }

        product.quantity += 1;
        await product.save();

        const cartAssociatedProducts = await cart.addProductos(product)
    
        return res.status(200).json({ success: true, message: "Product associated with cart" + `${cartAssociatedProducts}` });
    
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


const removeQuantityOffProductCart = async (req, res) => {
    const { cartUserId, productId } = req.params;
    try {
        const cart = await Cart.findByPk(cartUserId);
        const product = await Producto.findByPk(productId);

        if (!cart || !product) {
            return res.status(404).json({ msg: "User or Product not found" });
        }

        product.quantity -= 1;
        await product.save();

        const cartAssociatedProducts = await cart.addProductos(product)
    
        return res.status(200).json({ success: true, message: "Product dissociated with cart" + `${cartAssociatedProducts}` });
    
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};


const deleteProductInTheCart = async (req, res) => {
    const { cartUserId, productId } = req.params;
    try {
        const cart = await Cart.findByPk(cartUserId);
        const product = await Producto.findByPk(productId);

        if (!cart || !product) {
            return res.status(404).json({ msg: "User or Product not found" });
        }

        product.quantity -= 1
        await product.save();

        const cartDeleteProduct = await cart.removeProductos(product)
    
        return res.status(200).json({ success: true, message: "Product deleted" + `${cartDeleteProduct}` });
    
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

const deleteAllProductsOffCart = async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await Cart.findByPk(cartId)

        if(!cart) {
            return res.status(404).json({error: "Cart not found"})
        }   

        const allProducts = await cart.getProductos()
        const cartDeleteAll =  await cart.removeProductos(allProducts); 

        return res.status(200).json({ message: "All products removed from the cart" + `${cartDeleteAll}` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
        
}

const getProductsForCart = async(req, res) => {
    const { cartId } = req.params;
    try {
        const cart  = await Cart.findByPk(cartId)

        if(!cart) {
            return res.status(404).json({error: "Cart not found"})
        }

        const products = await cart.getProductos();    
        return res.status(200).json(products);
    }catch(err) {
        return res.status(500).json({err});
    }
}



module.exports = {
    create,
    update,
    index,
    show,
    destroy,
    addProductToCart,
    associateToUser,
    getProductsForCart,
    removeQuantityOffProductCart,
    deleteProductInTheCart,
    deleteAllProductsOffCart
}