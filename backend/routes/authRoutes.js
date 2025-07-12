const db = require('../config/db');
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");




  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const sql = "SELECT * FROM users WHERE email = ? ";
      const [results] = await db.query(sql, [email,]);

      if (results.length === 0)
        return res.status(401).json({ error: "No account found." });

      let matchedUser = null;

      for (const user of results) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          matchedUser = user;
          break;
        }
      }

      if (!matchedUser)
        return res.status(401).json({ error: "Wrong password." });

      const token = jwt.sign(
        {
          id: matchedUser.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("usertoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, 
      });

      res.json({
        user: {
          id: matchedUser.id,
          email: matchedUser.email,
          name: matchedUser.name,
          location:matchedUser.location,
          availability: matchedUser.availability,
          profile: matchedUser.profile,
          skill_offered: matchedUser.skill_offered,
          skill_wanted: matchedUser.skill_wanted,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });


  router.post("/register", async (req, res) => {
    const { email,name, password} = req.body;
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const [results] = await db.query(sql, [email]);

      if (results.length > 0)
        return res.status(400).json({ error: "Email already exists." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO users (name,email, password)
        VALUES (?, ?,?)
      `;
      await db.query(insertSql, [name,email, hashedPassword]);

      res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const [results] = await db.query(sql, [email]);

      if (results.length === 0)
        return res.status(404).json({ error: "No account found with this email." });

     
      res.json({ message: "Password reset link sent to your email." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });


router.get("/logout", (req, res) => {
  res.clearCookie("usertoken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully." });
});





module.exports = router;