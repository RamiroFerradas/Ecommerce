const { Router } = require("express");
const {
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  insertBrand,
} = require("../../Controllers/Brands");
const authMiddleware = require("../../auth");

const router = Router();

// ---------- GET BRANDS // GET BRANDS BY NAME ----------
const ERROR = "Error @ routes/Brands/index.js --> ";
router.get("/", async (req, res) => {
  console.log("aaaa");
  try {
    const { name } = req.query;
    if (name) {
      const brands = await getBrandsByName(name);
      res.json(brands);
    } else {
      const brands = await getBrands();
      res.json(brands);
    }
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- GET BRAND BY ID----------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandById(id);

    res.json(brand);
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- POST BRAND ----------
router.post("/", authMiddleware, async (req, res) => {
  try {
    res.json(await insertBrand(req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- UPDATE BRAND ----------
router.put("/:idOrName", authMiddleware, async (req, res) => {
  try {
    const { idOrName } = req.params;
    res.json(await updateBrand(idOrName, req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- DELETE BRAND ----------
router.delete("/:idOrName", authMiddleware, async (req, res) => {
  try {
    const { idOrName } = req.params;
    res.json(await deleteBrand(idOrName));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

module.exports = router;
