const { Router } = require("express");
const router = Router();
const CartController = require("../controllers/CartController")
const ProductoController = require("../controllers/ProductoController");
const UserController = require("../controllers/UserController");
const multer = require("multer");
const path = require("node:path");

//authentication uses
const AuthController = require("../controllers/AuthController");
const passport = require("passport");
router.use("/private", passport.authenticate('jwt', {session: false}));

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '../../', 'uploads'))
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
            
        }
    })
})

const uploadUserPhoto = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '../../', 'userPhoto'))
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
            
        }
    })
})

//authentication routes
router.post("/login", AuthController.login);
router.get("/private/getDetails", AuthController.getDetails);

router.post("/user",  uploadUserPhoto.single("image"),  UserController.create);
router.get("/user/:id", UserController.show); 
router.get("/user", UserController.index); 
router.put("/user/:id", UserController.update); 
router.delete("/user/:id", UserController.destroy);
router.put("/finishPurchase/:userId", UserController.finishPurchase);


router.post("/product", upload.single("image"), ProductoController.create);
router.post("/product/user/:userName", upload.single("image"), ProductoController.createWithUser)
router.get("/product/user/:userName", ProductoController.getWithUser)
router.get("/product/:id", ProductoController.show); 
router.get("/product", ProductoController.index); 
router.put("/product/:id", ProductoController.update);
router.delete("/product/:id", ProductoController.destroy);
router.put("/product/purchase/:productoId/User/:userId", ProductoController.purchase);
router.put("/product/cancelPurchase/:id", ProductoController.cancelPurchase);

router.post("/cart", CartController.create);  
router.get("/cart/:id", CartController.show); 
router.get("/cart", CartController.index); 
router.put("/cart/:id", CartController.update);
router.delete("/cart/:id", CartController.destroy);
router.put("/cart/:cartId/associate/:userId", CartController.associateToUser)
router.put("/cart/:cartUserId/product/:productId", CartController.addProductToCart)
router.put("/cart/:cartUserId/removeOne/:productId", CartController.removeQuantityOffProductCart)
router.delete("/cart/:cartUserId/removeItemOffThatCart/:productId", CartController.deleteProductInTheCart)
router.get("/cart/:cartId/associatedProducts", CartController.getProductsForCart)
router.delete('/cart/:cartId/deleteAllProducts', CartController.deleteAllProductsOffCart);


module.exports = router;
