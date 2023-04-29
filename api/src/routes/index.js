const { Router } = require("express");

const productsRoute = require("./Products/index.js");
const brandRoute = require("./Brands/index.js");

const authMiddleware = require("../auth.js");

const router = Router();

// Use the authMiddleware to protect the '/products' route
router.use("/products", authMiddleware, productsRoute);

// Use the authMiddleware to protect the '/brands' route
router.use("/brands", authMiddleware, brandRoute);

module.exports = router;
