const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
// CONNECT with db
connectDb();

// use Route
const bookRoutes = require("./routes/bookRoutes");
app.use("/book", bookRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
