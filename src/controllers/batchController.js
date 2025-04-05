const db = require("../config/db");

// Create a batch
exports.createBatch = (req, res) => {
  const { FacilitatorId } = req.body;
  // Validate inputs
  if (!FacilitatorId) {
    return res.status(400).json({ error: "FacilitatorId are required" });
  }

  // Auto-set today's date (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];

  // FIXED SQL: only 3 columns, so 3 placeholders
  const sql = `
    INSERT INTO studentbatch ( BatchCreatedDate, FacilitatorId)
    VALUES ( ?, ?)
  `;

  db.query(sql, [currentDate, FacilitatorId], (err, result) => {
    if (err) {
      console.error("Error inserting batch:", err);
      return res
        .status(500)
        .json({ error: "Database insert failed", details: err });
    }

    res.status(201).json({
      message: "Batch created",
      BatchId: result.insertId,
    });
  });
};

// Get all batches with facilitator name
exports.getAllBatches = (req, res) => {
  const sql = `
      SELECT 
        b.BatchId,
        b.GroupName,
        b.BatchCreatedDate,
        b.Status,
        b.FacilitatorId,
        a.name AS FacilitatorName
      FROM studentbatch b
      LEFT JOIN iyfdashboardAccounts a ON b.FacilitatorId = a.user_id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching batches:", err);
      return res
        .status(500)
        .json({ error: "Database fetch failed", details: err });
    }

    res.status(200).json(results);
  });
};


// GET /batchesbyfacilitatorId
exports.getBatchesByfacilitatorId = (req, res) => {
  const { facilitatorId } = req.params;

  const query = `
    SELECT BatchId, GroupName, BatchCreatedDate, Status, FacilitatorId
    FROM studentbatch
    WHERE FacilitatorId = ?`;

  db.query(query, [facilitatorId], (err, results) => {
    if (err) {
      console.error('Error fetching batches:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
}

exports.attendanceSession = (req, res) => {
  let attendances = [];

  // Check if the request body contains an array under "attendances"
  if (req.body.attendances && Array.isArray(req.body.attendances)) {
    attendances = req.body.attendances;
  } 
  // Otherwise, check for individual record fields (allowing both lower-case and capitalized keys)
  else if (
    (req.body.Attendsessoin || req.body.AttendanceSession) &&
    (req.body.studentId || req.body.StudentId)
  ) {
    attendances.push({
      AttendanceSession: req.body.Attendsessoin || req.body.AttendanceSession,
      StudentId: req.body.studentId || req.body.StudentId
    });
  } else {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Prepare bulk insert query parts
  const placeholders = [];
  const values = [];

  for (const record of attendances) {
    // Use both naming conventions for session and studentId
    const session = record.Attendsessoin || record.AttendanceSession;
    const studentId = record.studentId || record.StudentId;

    // Validate required fields for each record
    if (!session || !studentId) {
      return res.status(400).json({ error: "Missing required fields in one or more records." });
    }
    
    // Build placeholders and collect values (only AttendanceSession and StudentId)
    placeholders.push("(?, ?)");
    values.push(session, studentId);
  }

  // Construct the bulk insert SQL query (AttendanceDate is omitted since it's auto-generated)
  const insertSql = `
    INSERT INTO studentAttendance (AttendanceSession, StudentId)
    VALUES ${placeholders.join(", ")}
  `;

  // Execute the insert query
  db.query(insertSql, values, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({
        error: "Error inserting attendance record(s)",
        details: err
      });
    }
    res.status(201).json({
      message: "Attendance record(s) saved successfully",
      insertedId: result.insertId
    });
  });
};


