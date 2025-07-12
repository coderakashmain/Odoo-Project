const db = require('../config/db');
require("dotenv").config();
const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware')

router.post("/update", verifyToken, async (req, res) => {
  const { name, email, location, availability, profile, skill_offered, skill_wanted } = req.body;
  const userId = req.user.id;

  // Validate required fields if necessary
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }


  const safeSkillOffered = JSON.stringify(skill_offered || []);
  const safeSkillWanted = JSON.stringify(skill_wanted || []);

  try {
    const sql = `
      UPDATE users 
      SET name = ?, email = ?, location = ?, availability = ?, profile = ?, skill_offered = ?, skill_wanted = ?
      WHERE id = ?
    `;
    await db.query(sql, [
      name,
      email,
      location || null,
      availability || null,
      profile || 'public',
      safeSkillOffered,
      safeSkillWanted,
      userId
    ]);

    res.json({ message: "User details updated successfully." });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "An error occurred while updating user details." });
  }
});


module.exports = router;
