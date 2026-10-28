const mongoose = require("mongoose");
const Book = require("../models/Book");



async function createBook(req, res) {
  try {
    const { title, author, category } = req.body;
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Title is also required" });
    }

    const book = await Book.create({ title: title.trim(), author, category });
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create this  book." });
  }
}



async function getBooks(req, res) {
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit = Number.parseInt(req.query.limit, 10) || 10;
  if (page < 1 || limit < 1) {
    return res.status(400).json({ message: "Page and limit must be positive numbers." });
  }

  try {
    const [books, total] = await Promise.all([
      Book.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Book.countDocuments(),
    ]);
    return res.json({ books, page, limit, total });
  } catch (error) {
    return res.status(500).json({ message: "Unable to retrieve books." });
  }
}

async function updateAvailability(req, res) {
  const { id } = req.params;
  const { availability } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }
  if (typeof availability !== "boolean") {
    return res.status(400).json({ message: "Availability must be true or false." });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { availability },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found." });
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update book availability." });
  }
}

module.exports = { createBook, getBooks, updateAvailability };
