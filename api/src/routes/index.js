const { Router } = require("express");

const productsRoute = require("./Products/index.js");
const brandsRoute = require("./Brands/index.js");
const usersRoute = require("./Users/index.js");

const router = Router();

router.use("/products", productsRoute);

router.use("/brands", brandsRoute);

router.use("/users", usersRoute);

module.exports = router;
