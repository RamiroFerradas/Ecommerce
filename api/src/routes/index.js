const { Router } = require("express");

const productsRoute = require("./Products/index.js");
const brandRoute = require("./Brands/index.js");

const router = Router();
// -----------------------------------------

router.use("/products", productsRoute);
router.use("/brands", brandRoute);

module.exports = router;
