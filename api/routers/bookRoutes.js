const { Router } = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = Router();

router.post("/add-book", bookControllers.addBook);

module.exports = router;
