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

//authentication routes
router.post("/login", AuthController.login);
router.get("/private/getDetails", AuthController.getDetails);

router.post("/user", UserController.create);
router.get("/user/:id", UserController.show); 
router.get("/user", UserController.index); 
router.put("/user/:id", UserController.update); 
router.delete("/user/:id", UserController.destroy);

router.post("/product", upload.single("image"), ProductoController.create);
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

module.exports = router;
