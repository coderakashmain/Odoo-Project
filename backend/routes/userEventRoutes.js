const db = require('../config/db');
require("dotenv").config();
const express = require('express');
const router = express.Router();
const {verifyToken,parseSkillField} = require('../middleware/authMiddleware')

router.get("/fetchuser", async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {

    const sql = `
     SELECT id, name, profile_pic, skill_offered, skill_wanted, rating
        FROM users
        WHERE profile = 'public'
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [results] = await db.query(sql, [limit, offset]);


   const users = results.map(user => ({
      ...user,
      skill_offered: parseSkillField(user.skill_offered),
      skill_wanted: parseSkillField(user.skill_wanted),
      canSendRequest: true
    }));


 
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM users WHERE profile = 'public'`
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalUsers: total,
      users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Something went wrong while fetching users." });
  }
});

router.post("/sendrequest", verifyToken, async (req, res) => {
  const { userId } = req.body;
  const senderId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  if (userId === senderId) {
    return res.status(400).json({ error: "You cannot send a request to yourself." });
  }

  try {

    const [[receiver]] = await db.query("SELECT id FROM users WHERE id = ?", [userId]);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found." });
    }


    const sql = `
      INSERT INTO user_requests (sender_id, receiver_id, status)
      VALUES (?, ?, 'pending')
      ON DUPLICATE KEY UPDATE status = 'pending'
    `;
    await db.query(sql, [senderId, userId]);

    res.json({ message: "Request sent successfully." });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ error: "An error occurred while sending the request." });
  }
});



router.get("/requests/received", verifyToken, async (req, res) => {
  const receiverId = req.user.id;

  try {
    const sql = `
      SELECT ur.id as request_id, ur.status, ur.created_at,
             u.id as sender_id, u.name, u.profile_pic, u.skill_offered, u.skill_wanted
      FROM user_requests ur
      JOIN users u ON ur.sender_id = u.id
      WHERE ur.receiver_id = ?
      ORDER BY ur.created_at DESC
    `;

    const [results] = await db.query(sql, [receiverId]);

    const requests = results.map(r => ({
      request_id: r.request_id,
      status: r.status,
      created_at: r.created_at,
      sender: {
        id: r.sender_id,
        name: r.name,
        profile_pic: r.profile_pic,
        skill_offered: parseSkillField(r.skill_offered),
        skill_wanted: parseSkillField(r.skill_wanted)
      }
    }));

    res.json({ requests });
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ error: "Failed to fetch requests." });
  }
});


router.post("/requests/respond", verifyToken, async (req, res) => {
  const { requestId, action } = req.body; 
  const userId = req.user.id;

  if (!["accepted", "rejected"].includes(action)) {
    return res.status(400).json({ error: "Invalid action." });
  }

  try {
   
    const [[reqCheck]] = await db.query(
      `SELECT * FROM user_requests WHERE id = ? AND receiver_id = ?`,
      [requestId, userId]
    );

    if (!reqCheck) {
      return res.status(404).json({ error: "Request not found." });
    }

  
    await db.query(
      `UPDATE user_requests SET status = ? WHERE id = ?`,
      [action, requestId]
    );

    res.json({ message: `Request ${action}.` });
  } catch (error) {
    console.error("Error responding to request:", error);
    res.status(500).json({ error: "Failed to respond to request." });
  }
});



module.exports = router;