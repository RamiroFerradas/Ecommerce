const { Router } = require("express");

const {
  getProducts,
  getProductsByName,
  getProductsById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../../Controllers/Products/index.js");

const authMiddleware = require("../../auth.js");

const router = Router();

// ---------- GET PRODUCTS // GET PRODUCTS BY NAME ----------
const ERROR = "Error @ routes/Products/index.js --> ";

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      res.json(await getProductsByName(name));
    } else {
      const products = await getProducts();
      res.json(products);
    }
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- GET PRODUCT BY ID ----------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductsById(id);
    res.json(product);
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- POST PRODUCT ----------

router.post("/", authMiddleware, async (req, res) => {
  try {
    res.json(await insertProduct(req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// MODIFY PRODUCT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await updateProduct(id, req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// DELETE PRODUCT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await deleteProduct(id, req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

module.exports = router;
