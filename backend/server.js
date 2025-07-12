const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/authRoutes");
const userEditRoutes = require("./routes/userEditRoutes");
const userEventRoutes = require("./routes/userEventRoutes");


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
app.use("/api/useredit", userEditRoutes);
app.use("/api/userevent", userEventRoutes);








const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));