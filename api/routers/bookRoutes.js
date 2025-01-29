const { Router } = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = Router();

router.post("/add-book", bookControllers.addBook);
// router.get("/search-book/:title", bookControllers.searchBook);
router.post("/update-book", bookControllers.updateBook);

module.exports = router;
