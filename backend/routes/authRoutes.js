const db = require('../config/db');
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {verifyToken} = require('../middleware/authMiddleware')
const { transporter } = require("../middleware/mailProvider");



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


  const resetUrl = `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}`;

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: " Password Reset Request",
      html: `
        <html> 
        <body> 
          <div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
              <h2 style="color: #333;"> Password Reset</h2>
              <p style="color: #555;">It looks like you requested a password reset. Click the button below to proceed:</p>
              <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
              <p style="color: #999;">If you didn’t request this, you can ignore this email.</p>
              <p style="color: #555;">Best regards</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

     
      await transporter.sendMail(mailOptions);
     
      res.json({ message: "Password reset link sent to your email." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  //reset password

  router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;


    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const [results] = await db.query(sql, [email]);
      if (results.length === 0)
        return res.status(404).json({ error: "No account found with this email."
      });


      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateSql = "UPDATE users SET password = ? WHERE email = ?";
      await db.query(updateSql, [hashedPassword, email]);
      res.json({ message: "Password reset successfully." });
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


//auth check 

router.get("/check", verifyToken, async (req, res) => {
  if (!req.user) {
    console.log("User not found in middleware.");
    return res.status(401).json({ authenticated: false, message: "No token found" });
  }

  const userid = req.user.id;

  try {
    const query = `
      SELECT id, name, email, location, availability, profile, skill_offered, skill_wanted
      FROM users
      WHERE id = ?
    `;
    
    const [userResults] = await db.query(query, [userid]);

    if (userResults.length === 0) {
      return res.status(404).json({ authenticated: false, message: "User not found" });
    }

    const user = userResults[0];

    return res.json({
      authenticated: true,
      user
    });

  } catch (err) {
    console.error("Database Error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});






module.exports = router;