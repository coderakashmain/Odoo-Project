
const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next) =>  {
  const token = req.cookies.usertoken; 

  

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;


    next();
  } catch (err) {
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
};
const parseSkillField = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {

      return value.split(',').map(v => v.trim()).filter(Boolean);
    }
  }

  return []; 
};


module.exports = {verifyToken,parseSkillField}
