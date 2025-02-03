const { Router } = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = Router();

router.get("/", bookControllers.getBooks);
router.post("/add-book", bookControllers.addBook);
router.post("/search-book", bookControllers.searchBook);
router.post("/update-book", bookControllers.updateBook);
router.post("/delete-book", bookControllers.deleteBook);
router.post("/borrow-book", bookControllers.borrowBook);
router.get(
  "/borrowed-book-details",
  bookControllers.borrowedBookWithUserDetails
);

module.exports = router;
