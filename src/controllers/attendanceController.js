const db = require("../config/db");



exports.markAttendance = (req, res) => {
  let { AttendanceSession, StudentId } = req.body;

  if (!AttendanceSession || !StudentId) {
    return res
      .status(400)
      .json({ message: "AttendanceSession and StudentId are required" });
  }

  // Step 1: Define shifting logic
  const groupShiftMap = {
    'DYS-1': 'DYS-2',
    'DYS-2': 'DYS-3',
    'DYS-3': 'DYS-4',
    'DYS-4': 'DYS-5',
    'DYS-5': 'DYS-6',
  };

  let updatedSession;

  // Step 2: Decide updatedSession
  if (AttendanceSession === "new") {
    updatedSession = "DYS-1";
  } else {
    updatedSession = groupShiftMap[AttendanceSession] || AttendanceSession;
  }

  // Step 3: Insert into studentAttendance
  const attendanceQuery = `
    INSERT INTO studentAttendance (AttendanceDate, AttendanceSession, StudentId)
    VALUES (NOW(), ?, ?)
  `;

  db.query(attendanceQuery, [updatedSession, StudentId], (err, result) => {
    if (err) {
      console.error("Error inserting attendance:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Step 4: If it's a new user, assign DYS-1, batch, and facilitator
    if (AttendanceSession === "new") {
      const getBatchQuery = `
        SELECT BatchId, FacilitatorId
        FROM studentbatch
        WHERE is_start = 0
        LIMIT 1
      `;

      db.query(getBatchQuery, (batchErr, batchResults) => {
        if (batchErr) {
          console.error("Error fetching batch:", batchErr);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (batchResults.length === 0) {
          return res.status(404).json({ message: "No available batch found" });
        }

        const { BatchId, FacilitatorId } = batchResults[0];

        const updateUserQuery = `
          UPDATE users
          SET group_name = 'DYS-1',
              batch_id = ?,
              facilitatorId = ?
          WHERE user_id = ?
        `;

        db.query(updateUserQuery, [BatchId, FacilitatorId, StudentId], (updateErr) => {
          if (updateErr) {
            console.error("Error updating user data:", updateErr);
            return res.status(500).json({ message: "Internal server error" });
          }

          return res.status(201).json({
            message: "Attendance marked, new user group set to DYS-1, batch/facilitator assigned",
            AttendanceId: result.insertId,
            BatchId,
            FacilitatorId,
          });
        });
      });

    } else {
      // Step 5: For existing users, update group_name as per session map
      const updateUserGroupQuery = `
        UPDATE users
        SET group_name = ?
        WHERE user_id = ?
      `;

      db.query(updateUserGroupQuery, [updatedSession, StudentId], (groupErr) => {
        if (groupErr) {
          console.error("Error updating user group:", groupErr);
          return res.status(500).json({ message: "Failed to update user group." });
        }

        return res.status(201).json({
          message: "Attendance marked and user group updated",
          AttendanceId: result.insertId,
          UsedSession: updatedSession,
        });
      });
    }
  });
};

exports.updateStudentGroupWise = (req, res) => {
  const { user_id, newGroupName } = req.body;

  if (!user_id || !newGroupName) {
    return res.status(400).json({ message: 'userId and newGroupName are required' });
  }

  const query = `
    UPDATE users
    SET group_name = ?
    WHERE user_id = ?
  `;

  db.query(query, [newGroupName, user_id], (err, results) => {
    if (err) {
      console.error("Error updating group name:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Group name updated successfully" });
  });
};

exports.getStudentGroupWise = (req, res) => {
  const { facilitatorId, groupname } = req.body;

  if (!facilitatorId || !groupname) {
    return res.status(400).json({ message: 'facilitatorId and groupname are required' });
  }

  const query = `SELECT *
    FROM users
    WHERE facilitatorId = ?
    AND group_name LIKE ? `;

    // console.log(query)

  // Append '%' to the groupname to match all groups starting with the provided value.
  const groupSearch = groupname + '%';

  // console.log(groupSearch)
  
  db.query(query, [facilitatorId, groupSearch], (err, results) => {
    if (err) {
      console.error("Error fetching users by frontliner_id:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ users: results });
  });
};