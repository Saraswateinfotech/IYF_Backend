const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const JWT_SECRET = process.env.JWT_SECRET;

// Utility function to generate a random 6-digit number
const generateRandomDigits = (length = 6) => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Utility function to generate a unique userId
const generateUserId = async (name) => {
  const namePart = name.substring(0, 3).toUpperCase().padEnd(3, "X");
  let userId;
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = generateRandomDigits();
    userId = `${namePart}${randomDigits}`;
    isUnique = await isUserIdUnique(userId);
  }

  return userId;
};

// Function to check if userId already exists
const isUserIdUnique = (userId) => {
  return new Promise((resolve, reject) => {
    const checkSql =
      "SELECT COUNT(*) as count FROM iyfdashboardAccounts WHERE user_id = ?";
    db.query(checkSql, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count === 0);
    });
  });
};

exports.signUp = async (req, res) => {
  const { name, phone_number, email, password, role } = req.body;

  if (!name || !phone_number || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await generateUserId(name);

    // Check for existing user (Duplicate Entry)
    const checkDuplicateQuery = `SELECT * FROM iyfdashboardAccounts WHERE email = ? OR phone_number = ? OR user_id = ?`;
    db.query(
      checkDuplicateQuery,
      [email, phone_number, userId],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err.sqlMessage });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists!" });
        }

        //  Insert User Data
        const sql = `
              INSERT INTO iyfdashboardAccounts (user_id, name, email, phone_number, password, textpassword, role)
              VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

        db.query(
          sql,
          [userId, name, email, phone_number, hashedPassword, password, role],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Database error", details: err.sqlMessage });
            }

            //  Ensure response is sent
            return res.status(201).json({
              message: "User registered successfully",
              userId: userId,
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { user_id, password } = req.body;

  // Check if all fields are provided
  if (!user_id || !password) {
    return res.status(400).json({ error: "User ID and Password are required" });
  }

  try {
    const sql = `SELECT * FROM iyfdashboardAccounts WHERE user_id = ?`;
    db.query(sql, [user_id], async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err.sqlMessage });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid User ID or Password" });
      }

      const user = results[0]; // First user entry

      //  Compare Passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid User ID or Password" });
      }

      //  Generate JWT Token
      const token = jwt.sign(
        { userId: user.user_id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "48h" } // Token Validity
      );

      // Send Response
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          userId: user.user_id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getDashboard = (req, res) => {
  const sql =
    "SELECT user_id, name, email, phone_number, role,textpassword, created_at FROM iyfdashboardAccounts";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results);
  });
};

exports.deleteDashboard = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "DELETE FROM iyfdashboardAccounts WHERE user_id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  });
};
