const express = require("express");
const router = express.Router();
const {createBook,getBooks,updateAvailability,} = require("../controllers/bookController");

router.post("/", createBook);
router.get("/", getBooks);
router.patch("/:id", updateAvailability);



module.exports = router;
