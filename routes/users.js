const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateMe,
  updateMeAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/me", updateMe);
router.patch("/me/avatar", updateMeAvatar);

module.exports = router;
