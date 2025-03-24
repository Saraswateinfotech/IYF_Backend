
const db = require("../config/db");

//  post - post students
exports.saveStudentData = (req, res) => {
  const {
    name, dob, mobile_number, frontliner_name, profession, address,
    class_mode, payment_mode, payment_amount, payment_status,
    referral_user_id = null, chanting_round = 0, email = null, photo = null,
    rating = 0, services = null, city = null, state = null,
    permanent_address = null, remark = null, skill = null, comment = null,
    interest = null, hobby = null, study_field = null,
    father_occupation = null, father_number = null,
    sankalp_camp = 0, gender = null, student_status = null,
    facilitator_id = null, razorpay_payment_id = null
  } = req.body;

  const getValueOrNull = (value) => {
    return value === undefined || value === '' ? null : value;
  };

  const values = [
    getValueOrNull(name), getValueOrNull(dob), getValueOrNull(mobile_number),
    getValueOrNull(frontliner_name), getValueOrNull(profession), getValueOrNull(address),
    getValueOrNull(class_mode), getValueOrNull(payment_mode), getValueOrNull(payment_amount),
    getValueOrNull(payment_status), getValueOrNull(referral_user_id), getValueOrNull(chanting_round),
    getValueOrNull(email), getValueOrNull(photo), getValueOrNull(rating), getValueOrNull(services),
    getValueOrNull(city), getValueOrNull(state), getValueOrNull(permanent_address), getValueOrNull(remark),
    getValueOrNull(skill), getValueOrNull(comment), getValueOrNull(interest), getValueOrNull(hobby),
    getValueOrNull(study_field), getValueOrNull(father_occupation), getValueOrNull(father_number),
    getValueOrNull(sankalp_camp), getValueOrNull(gender), getValueOrNull(student_status),
    getValueOrNull(facilitator_id), getValueOrNull(razorpay_payment_id), new Date()
  ];

  const insertSql = `
    INSERT INTO users (
      name, dob, mobile_number, frontliner_name, profession, address,
      class_mode, payment_mode, payment_amount, payment_status, referral_user_id,
      chanting_round, email, photo, rating, services, city, state, permanent_address,
      remark, skill, comment, interest, hobby, study_field, father_occupation,
      father_number, sankalp_camp, gender, student_status, facilitator_id,
      razorpay_payment_id, registration_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertSql, values, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ error: "Error inserting student data", details: err });
    }
    res.status(201).json({ message: "Student data saved successfully", insertedId: result.insertId });
  });
};

//  GET - Get all students
exports.getAllStudents = (req, res) => {
  const sql = `SELECT * FROM users ORDER BY registration_date DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    res.status(200).json({ students: results });
  });
};

//  PUT - Update student by user_id
exports.updateStudentById = (req, res) => {
  const user_id = req.params.user_id;
  const data = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No data provided to update" });
  }

  const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
  const values = Object.values(data).map(val => val === '' ? null : val);

  const sql = `UPDATE users SET ${fields} WHERE user_id = ?`;

  db.query(sql, [...values, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed", details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
};
