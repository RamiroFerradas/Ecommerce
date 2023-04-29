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
const brandsErrorMessage = "Error @ routes/Brands/index.js --> ";
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const brands = await getBrandsByName(name);
      if (brands.length) {
        res.json(brands);
      } else {
        res.status(404).send("No se han encontrado marcas.");
      }
    } else {
      const brands = await getBrands();
      if (brands.length) {
        res.json(brands);
      } else {
        res.status(404).send("No se han encontrado marcas.");
      }
    }
  } catch (e) {
    res.status(400).send(`${brandsErrorMessage} ${e.message}`);
  }
});

// ---------- GET BRAND BY ID OR NAME ----------
router.get("/:idOrName", async (req, res) => {
  try {
    const { idOrName } = req.params;
    const brand = await getBrandByIdOrName(idOrName);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).send("No se encontró ninguna marca con ese ID o nombre.");
    }
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- POST BRAND ----------
router.post("/", authMiddleware, async (req, res) => {
  try {
    res.json(await insertBrand(req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- UPDATE BRAND ----------
router.put("/:idOrName", authMiddleware, async (req, res) => {
  try {
    const { idOrName } = req.params;
    res.json(await updateBrand(idOrName, req.body));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

// ---------- DELETE BRAND ----------
router.delete("/:idOrName", authMiddleware, async (req, res) => {
  try {
    const { idOrName } = req.params;
    res.json(await deleteBrand(idOrName));
  } catch (e) {
    res.status(404).send(ERROR, e);
  }
});

module.exports = router;
