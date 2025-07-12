const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/authRoutes");


const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
const server = http.createServer(app);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);








const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));