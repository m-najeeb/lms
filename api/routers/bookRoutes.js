const { Router } = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = Router();

router.post("/add-book", bookControllers.addBook);
router.post("/search-book", bookControllers.searchBook);
router.post("/update-book", bookControllers.updateBook);
router.post("/delete-book", bookControllers.deleteBook);

module.exports = router;
