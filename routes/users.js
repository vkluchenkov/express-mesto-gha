const router = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getUser);

module.exports = router;
