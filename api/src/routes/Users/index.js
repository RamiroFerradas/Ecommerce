const { Router } = require("express");
const router = Router();

const authMiddleware = require("../../auth.js");
const {
  insertUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} = require("../../Controllers/Users/index.js");

const ERROR = "Error @ routes/Users/index.js --> ";

// ---------- POST USER ----------

router.post("/", authMiddleware, async (req, res) => {
  try {
    res.json(await insertUser(req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);
    return e.message;
  }
});

// ---------- GET ALL USERS ----------
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);

    return e.message;
  }
});

// ---------- GET USER BY ID ----------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
      res.json(user);
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);

    return e.message;
  }
});

// ---------- UPDATE USER ----------
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await updateUser(id, req.body));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);

    return e.message;
  }
});

// ---------- DELETE USER ----------
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await deleteUser(id));
  } catch (e) {
    console.error(`${ERROR} ${e.message}`);

    return e.message;
  }
});

module.exports = router;
