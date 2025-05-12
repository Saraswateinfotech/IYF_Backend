const db = require("../config/db");

//  post - post students
// exports.saveStudentData = (req, res) => {
//   debugger
//   const {
//     name, dob, mobile_number, frontliner_id, calling_id, profession, address,
//     class_mode, payment_mode, payment_amount, payment_status,
//     referral_user_id = null, chanting_round = 0, email = null, photo = null,
//     rating = 0, services = null, city = null, state = null,
//     permanent_address = null, remark = null, skill = null, comment = null,
//     interest = null, hobby = null, study_field = null,
//     father_occupation = null, father_number = null,
//     sankalp_camp = 0, gender = null, student_status = null,
//     facilitator_id = null, razorpay_payment_id = null
//   } = req.body;

//   const getValueOrNull = (value) => {
//     return value === undefined || value === '' ? null : value;
//   };

//   const values = [
//     getValueOrNull(name), getValueOrNull(dob), getValueOrNull(mobile_number),
//     getValueOrNull(frontliner_id), getValueOrNull(calling_id), getValueOrNull(profession), getValueOrNull(address),
//     getValueOrNull(class_mode), getValueOrNull(payment_mode), getValueOrNull(payment_amount),
//     getValueOrNull(payment_status), getValueOrNull(referral_user_id), getValueOrNull(chanting_round),
//     getValueOrNull(email), getValueOrNull(photo), getValueOrNull(rating), getValueOrNull(services),
//     getValueOrNull(city), getValueOrNull(state), getValueOrNull(permanent_address), getValueOrNull(remark),
//     getValueOrNull(skill), getValueOrNull(comment), getValueOrNull(interest), getValueOrNull(hobby),
//     getValueOrNull(study_field), getValueOrNull(father_occupation), getValueOrNull(father_number),
//     getValueOrNull(sankalp_camp), getValueOrNull(gender), getValueOrNull(student_status),
//     getValueOrNull(facilitator_id), getValueOrNull(razorpay_payment_id), new Date()
//   ];

//   const insertSql = `
//     INSERT INTO users (
//       name, dob, mobile_number, frontliner_id, calling_id, profession, address,
//       class_mode, payment_mode, payment_amount, payment_status, referral_user_id,
//       chanting_round, email, photo, rating, services, city, state, permanent_address,
//       remark, skill, comment, interest, hobby, study_field, father_occupation,
//       father_number, sankalp_camp, gender, student_status, facilitator_id,
//       razorpay_payment_id, registration_date
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(insertSql, values, (err, result) => {
//     debugger
//     if (err) {
//       console.error("Insert Error:", err);
//       return res.status(500).json({ error: "Error inserting student data", details: err });
//     }
//     res.status(201).json({ message: "Student data saved successfully", insertedId: result.insertId });
//   });
// };

// //  post - post students
// exports.saveStudentData = (req, res) => {
//   debugger;

//   const {
//     name,
//     dob,
//     mobile_number,
//     frontliner_id,
//     calling_id,
//     profession,
//     address,
//     class_mode,
//     payment_mode,
//     payment_amount,
//     payment_status,
//     referral_user_id = null,
//     chanting_round = 0,
//     email = null,
//     photo = null,
//     rating = 0,
//     services = null,
//     city = null,
//     state = null,
//     permanent_address = null,
//     remark = null,
//     skill = null,
//     comment = null,
//     interest = null,
//     hobby = null,
//     study_field = null,
//     father_occupation = null,
//     father_number = null,
//     sankalp_camp = 0,
//     gender = null,
//     student_status = null,
//     facilitator_id = null,
//     razorpay_payment_id = null,
//   } = req.body;

//   // ✅ Fixed group name (not coming from body)
//   const fixedGroupName = "new";

//   const getValueOrNull = (value) => {
//     return value === undefined || value === "" ? null : value;
//   };

//   const values = [
//     getValueOrNull(name),
//     getValueOrNull(dob),
//     getValueOrNull(mobile_number),
//     getValueOrNull(frontliner_id),
//     getValueOrNull(calling_id),
//     getValueOrNull(profession),
//     getValueOrNull(address),
//     getValueOrNull(class_mode),
//     getValueOrNull(payment_mode),
//     getValueOrNull(payment_amount),
//     getValueOrNull(payment_status),
//     getValueOrNull(referral_user_id),
//     getValueOrNull(chanting_round),
//     getValueOrNull(email),
//     getValueOrNull(photo),
//     getValueOrNull(rating),
//     getValueOrNull(services),
//     getValueOrNull(city),
//     getValueOrNull(state),
//     getValueOrNull(permanent_address),
//     getValueOrNull(remark),
//     getValueOrNull(skill),
//     getValueOrNull(comment),
//     getValueOrNull(interest),
//     getValueOrNull(hobby),
//     getValueOrNull(study_field),
//     getValueOrNull(father_occupation),
//     getValueOrNull(father_number),
//     getValueOrNull(sankalp_camp),
//     getValueOrNull(gender),
//     getValueOrNull(student_status),
//     getValueOrNull(facilitator_id),
//     getValueOrNull(razorpay_payment_id),
//     getValueOrNull(fixedGroupName),
//     new Date(),
//   ];

//   const insertSql = `
//     INSERT INTO users (
//       name, dob, mobile_number, frontliner_id, calling_id, profession, address,
//       class_mode, payment_mode, payment_amount, payment_status, referral_user_id,
//       chanting_round, email, photo, rating, services, city, state, permanent_address,
//       remark, skill, comment, interest, hobby, study_field, father_occupation,
//       father_number, sankalp_camp, gender, student_status, facilitator_id,
//       razorpay_payment_id, group_name, registration_date
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(insertSql, values, (err, result) => {
//     debugger;
//     if (err) {
//       console.error("Insert Error:", err);
//       return res
//         .status(500)
//         .json({ error: "Error inserting student data", details: err });
//     }
//     res.status(201).json({
//       message: "Student data saved successfully",
//       insertedId: result.insertId,
//     });
//   });
// };

// post - post students
exports.saveStudentData = (req, res) => {
  debugger;

  const {
    name,
    dob,
    mobile_number,
    frontliner_id,
    calling_id,
    profession,
    address,
    class_mode,
    payment_mode,
    payment_amount,
    payment_status,
    referral_user_id = null,
    chanting_round = 0,
    email = null,
    photo = null,
    rating = 0,
    services = null,
    city = null,
    state = null,
    permanent_address = null,
    remark = null,
    skill = null,
    comment = null,
    interest = null,
    hobby = null,
    study_field = null,
    father_occupation = null,
    father_number = null,
    sankalp_camp = 0,
    gender = null,
    student_status = null,
    facilitator_id = null,
    razorpay_payment_id = null,
  } = req.body;

  // ✅ Fixed group name (not coming from body)
  const fixedGroupName = "new";

  const getValueOrNull = (value) => {
    return value === undefined || value === "" ? null : value;
  };

  const values = [
    getValueOrNull(name),
    getValueOrNull(dob),
    getValueOrNull(mobile_number),
    getValueOrNull(frontliner_id),
    getValueOrNull(calling_id),
    getValueOrNull(profession),
    getValueOrNull(address),
    getValueOrNull(class_mode),
    getValueOrNull(payment_mode),
    getValueOrNull(payment_amount),
    getValueOrNull(payment_status),
    getValueOrNull(referral_user_id),
    getValueOrNull(chanting_round),
    getValueOrNull(email),
    getValueOrNull(photo),
    getValueOrNull(rating),
    getValueOrNull(services),
    getValueOrNull(city),
    getValueOrNull(state),
    getValueOrNull(permanent_address),
    getValueOrNull(remark),
    getValueOrNull(skill),
    getValueOrNull(comment),
    getValueOrNull(interest),
    getValueOrNull(hobby),
    getValueOrNull(study_field),
    getValueOrNull(father_occupation),
    getValueOrNull(father_number),
    getValueOrNull(sankalp_camp),
    getValueOrNull(gender),
    getValueOrNull(student_status),
    getValueOrNull(facilitator_id),
    getValueOrNull(razorpay_payment_id),
    getValueOrNull(fixedGroupName),
    new Date(),
  ];

  const insertSql = `
    INSERT INTO users (
      name, dob, mobile_number, frontliner_id, calling_id, profession, address,
      class_mode, payment_mode, payment_amount, payment_status, referral_user_id,
      chanting_round, email, photo, rating, services, city, state, permanent_address,
      remark, skill, comment, interest, hobby, study_field, father_occupation,
      father_number, sankalp_camp, gender, student_status, facilitator_id,
      razorpay_payment_id, group_name, registration_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertSql, values, (err, result) => {
    debugger;
    if (err) {
      console.error("Insert Error:", err);

      if (err.code === "ER_DUP_ENTRY") {
        if (err.sqlMessage.includes('mobile_number')) {
          return res.status(400).json({
            error: "Duplicate mobile number",
            message: "Duplicate mobile number"
          });
        } else if (err.sqlMessage.includes('email')) {
          return res.status(400).json({
            error: "Duplicate email",
            message: "Duplicate email"
          });
        }
      }

      return res.status(500).json({
        error: "Error inserting student data",
        details: err
      });
    }

    res.status(201).json({
      message: "Student data saved successfully",
      insertedId: result.insertId
    });
  });
};

//  GET - Get all facilitator or frontliner
exports.allFacilitatorOrFrontliner = (req, res) => {
  const query = `
    SELECT * FROM iyfdashboardAccounts
    WHERE role IN ('frontliner', 'facilitator')
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users by role:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Remove sensitive fields (password, textpassword) from the results
    const sanitizedResults = results.map((user) => {
      const { password, textpassword, ...sanitizedUser } = user; // Destructure and exclude sensitive fields
      return sanitizedUser; // Return the user without sensitive fields
    });

    res.json(sanitizedResults); // Send sanitized results
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

  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(data).map((val) => (val === "" ? null : val));

  const sql = `UPDATE users SET ${fields} WHERE user_id = ?`;

  db.query(sql, [...values, user_id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Update failed", details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
};

//  GET - Get all students getUsersByFrontlinerId
exports.getUsersByFrontlinerId = (req, res) => {
  const frontlinerId = req.body.frontlinerId;

  if (!frontlinerId) {
    return res.status(400).json({ message: "Frontliner ID is required" });
  }

  const query = "SELECT * FROM users WHERE frontliner_id = ?";

  db.query(query, [frontlinerId], (err, results) => {
    if (err) {
      console.error("Error fetching users by frontliner ID:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ users: results });
  });
};

exports.updateCallingId = (req, res) => {
  const { user_ids, calling_id } = req.body;

  if (!user_ids || !calling_id) {
    return res
      .status(400)
      .json({ message: "user_ids and calling_id are required" });
  }

  const placeholders = user_ids.map(() => "?").join(",");
  const sql = `UPDATE users SET calling_id = ? WHERE user_id IN (${placeholders})`;

  db.query(sql, [calling_id, ...user_ids], (err, result) => {
    if (err) {
      console.error("Error updating calling_id:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({
      message: "calling_id updated successfully",
      affectedRows: result.affectedRows,
    });
  });
};

exports.getUserByCallingId = (req, res) => {
  const { calling_id } = req.params;

  // SQL Query
  const getUserQuery = `
    SELECT * 
    FROM users
    WHERE calling_id = ? 
    AND frontliner_id != calling_id
  `;

  // Execute the query to fetch the data based on calling_id
  db.query(getUserQuery, [calling_id], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res
        .status(500)
        .json({ error: "Error fetching user data", details: err });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found or frontliner_id matches calling_id" });
    }

    res
      .status(200)
      .json({ message: "User data fetched successfully", data: result });
  });
};

exports.updateStudentStatus = (req, res) => {
  const { user_id, student_status } = req.body;

  if (!user_id || !student_status) {
    return res
      .status(400)
      .json({ message: "user_id and student_status are required" });
  }

  // const allowedStatuses = ["will_come", "not_interested", "busy", "might_come"];
  // if (!allowedStatuses.includes(student_status)) {
  //   return res.status(400).json({ message: "Invalid student_status value" });
  // }

  const currentDate = new Date(); // Get current date-time

  const sql =
    "UPDATE users SET student_status = ?, student_status_date = ? WHERE user_id = ?";

  db.query(sql, [student_status, currentDate, user_id], (err, result) => {
    if (err) {
      console.error("Error updating student_status:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Student status and date updated successfully" });
  });
};

exports.updatePaymentStatusByUserId = (req, res) => {
  const { user_id, payment_status } = req.body;

  if (!user_id || !payment_status) {
    return res
      .status(400)
      .json({ error: "user_id and payment_status are required" });
  }

  const query = "UPDATE users SET payment_status = ? WHERE user_id = ?";

  db.query(query, [payment_status, user_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Payment status updated successfully" });
  });
};

exports.getUserByFrontlinerAndCallingId = (req, res) => {
  const { frontliner_id, calling_id } = req.params; // frontliner_id और calling_id को URL से प्राप्त करें

  // SQL Query
  const getUserQuery = `
    SELECT * 
    FROM users
    WHERE frontliner_id = ? 
    AND calling_id = ?
  `;

  // Execute the query to fetch the data based on both frontliner_id and calling_id
  db.query(getUserQuery, [frontliner_id, calling_id], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res
        .status(500)
        .json({ error: "Error fetching user data", details: err });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No data found with matching frontliner_id and calling_id",
      });
    }

    res
      .status(200)
      .json({ message: "User data fetched successfully", data: result });
  });
};

exports.frontlinerStudentByIdOfcallingId = (req, res) => {
  const { frontliner_id } = req.params;

  const getUserQuery = `
    SELECT * 
    FROM users
    WHERE calling_id = ?
  `;

  db.query(getUserQuery, [frontliner_id], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res
        .status(500)
        .json({ error: "Error fetching user data", details: err });
    }

    if (result.length === 0) {
      return res.status(200).json({
        message: "No users found for the given frontliner_id in calling_id",
      });
    }

    res
      .status(200)
      .json({ message: "User data fetched successfully", data: result });
  });
};

exports.getUsersByBatchId = (req, res) => {
  const { batch_id } = req.params;

  if (!batch_id) {
    return res.status(400).json({ message: "Batch ID is required" });
  }

  const query = `
    SELECT * FROM users WHERE batch_id = ?
  `;

  db.query(query, [batch_id], (err, results) => {
    if (err) {
      console.error("Error fetching users by batch_id:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ users: results });
  });
};

exports.getGroupUserCount = (req, res) => {
  const { facilitatorId } = req.body;

  if (!facilitatorId) {
    return res.status(400).json({ message: "Facilitator ID is required" });
  }

  const query = `
    SELECT 
      CASE 
        WHEN group_name LIKE 'DYS%' THEN 'DYS'
        ELSE group_name
      END AS group_name,
      COUNT(*) AS total_users
    FROM users
    WHERE facilitatorId = ?
    GROUP BY 
      CASE 
        WHEN group_name LIKE 'DYS%' THEN 'DYS'
        ELSE group_name
      END;
  `;

  db.query(query, [facilitatorId], (err, results) => {
    if (err) {
      console.error("Error fetching group user count:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json(results);
  });
};

// getUserById not need this time

exports.getUserById = (req, res) => {
  const { user_id } = req.params; // Retrieve user_id from the URL parameter

  // Check if user_id is provided
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // SQL query to fetch user by user_id
  const query = `
    SELECT * FROM users WHERE user_id = ?
  `;

  // Query the database with the user_id
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching user by user_id:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // If no user is found
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details in response
    return res.status(200).json({ user: results[0] });
  });
};
