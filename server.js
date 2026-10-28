require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const bookRoutes = require("./routes/books");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Everything is ok and our server is running." });
});

async function startServer() {
  try {
    await connectDatabase();
    console.log(`Our database is connected successfully`);
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
}

startServer();
 app.listen(port, () => {
      console.log(`OUr Server is running on port ${port}`);
  });
