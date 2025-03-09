require("dotenv").config();
const express = require("express");
const cors = require("cors");
const githubRoutes = require("./routes/githubRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", githubRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
