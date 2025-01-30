const { Router } = require("express");
const UserController = require("../controllers/userControllers");
const userControllers = require("../controllers/userControllers");

const router = Router();

router.post("/sign-up", UserController.signUp);
router.post("/edit", userControllers.editName);

module.exports = router;
