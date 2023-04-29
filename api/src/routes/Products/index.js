const { Router } = require("express");

const {
  getProducts,
  getProductsByName,
  getProductsById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../../Controllers/Products/Products.js");

const router = Router();

// ---------- GET PRODUCTS // GET PRODUCTS BY NAME ----------
const productsErrorMessage = "Error @ routes/Products/index.js --> ";
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      res.json(await getProductsByName(name));
    } else {
      const products = await getProducts();
      if (products.length) {
        res.json(products);
      } else {
        res.status(404).send("No se han encontrado productos.");
      }
    }
  } catch (e) {
    res.status(400).send(`${productsErrorMessage} ${e.message}`);
  }
});

// ---------- GET PRODUCT BY ID ----------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await getProductsById(id));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- POST PRODUCT ----------

router.post("/", async (req, res) => {
  try {
    res.json(await insertProduct(req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});
module.exports = router;

// MODIFY PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await updateProduct(id, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await deleteProduct(id, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});
