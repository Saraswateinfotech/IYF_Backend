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
    "DYS-1": "DYS-2",
    "DYS-2": "DYS-3",
    "DYS-3": "DYS-4",
    "DYS-4": "DYS-5",
    "DYS-5": "DYS-6",
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

        db.query(
          updateUserQuery,
          [BatchId, FacilitatorId, StudentId],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating user data:", updateErr);
              return res.status(500).json({ message: "Internal server error" });
            }

            return res.status(201).json({
              message:
                "Attendance marked, new user group set to DYS-1, batch/facilitator assigned",
              AttendanceId: result.insertId,
              BatchId,
              FacilitatorId,
            });
          }
        );
      });
    } else {
      // Step 5: For existing users, update group_name as per session map
      const updateUserGroupQuery = `
        UPDATE users
        SET group_name = ?
        WHERE user_id = ?
      `;

      db.query(
        updateUserGroupQuery,
        [updatedSession, StudentId],
        (groupErr) => {
          if (groupErr) {
            console.error("Error updating user group:", groupErr);
            return res
              .status(500)
              .json({ message: "Failed to update user group." });
          }

          return res.status(201).json({
            message: "Attendance marked and user group updated",
            AttendanceId: result.insertId,
            UsedSession: updatedSession,
          });
        }
      );
    }
  });
};

exports.updateStudentGroupWise = (req, res) => {
  const { user_id, newGroupName } = req.body;

  if (!user_id || !newGroupName) {
    return res
      .status(400)
      .json({ message: "userId and newGroupName are required" });
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

    return res.status(200).json({ message: "Group name updated successfully" });
  });
};

// exports.getStudentGroupWise = (req, res) => {
//   const { facilitatorId, groupname } = req.body;

//   if (!facilitatorId || !groupname) {
//     return res.status(400).json({ message: 'facilitatorId and groupname are required' });
//   }

//   const query = `SELECT *
//     FROM users
//     WHERE facilitatorId = ?
//     AND group_name LIKE ? `;

//     // console.log(query)

//   // Append '%' to the groupname to match all groups starting with the provided value.
//   const groupSearch = groupname + '%';

//   // console.log(groupSearch)

//   db.query(query, [facilitatorId, groupSearch], (err, results) => {
//     if (err) {
//       console.error("Error fetching users by frontliner_id:", err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }

//     return res.status(200).json({ users: results });
//   });
// };

// exports.getFrontlinerdetailReport = (req, res) => {
//   const { facilitatorId, group_name } = req.body;

//   if (!facilitatorId || !group_name) {
//     return res
//       .status(400)
//       .json({ message: "facilitatorId and groupname are required" });
//   }

//   db.query(
//     "CALL progressReportGroupWise(?, ?)",
//     [facilitatorId, group_name],
//     (err, results) => {
//       if (err) {
//         console.error("Error calling progressReportGroupWise:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json(results[0]);
//     }
//   );
// };


exports.getFrontlinerdetailReport = (req, res) => {
  const {
    facilitatorId,
    groupPrefix,
    sessionName,
    selectedYear,
    selectedMonth,
  } = req.body;

  // only these three are truly required
  if (!facilitatorId || !groupPrefix || !sessionName) {
    return res
      .status(400)
      .json({ message: "facilitatorId, groupPrefix & sessionName are required" });
  }

  // if year/month are missing (undefined/null/empty), pass null to the SP
  const yearParam  = selectedYear != null && selectedYear !== "" ? selectedYear : null;
  const monthParam = selectedMonth != null && selectedMonth !== "" ? selectedMonth : null;

  const query = `
    WITH
      migration_dates AS (
        SELECT
          m.devoteeId,
          MIN(m.migrationDateTime) AS joined_date
        FROM group_migration AS m
        WHERE m.currentGroup = ?
        GROUP BY m.devoteeId
      ),
      students AS (
        SELECT
          u.user_id,
          u.name,
          u.mobile_number,
          u.chanting_round,
          u.facilitatorId
        FROM users AS u
        WHERE u.facilitatorId = ?
          AND u.group_name LIKE CONCAT(?, '%')
      ),
      dates AS (
        SELECT DISTINCT DATE(AttendanceDate) AS class_date
        FROM studentAttendance
        WHERE AttendanceSession = ?
          AND YEAR(AttendanceDate)  = ?
          AND MONTH(AttendanceDate) = ?
      )
    SELECT
      s.user_id        AS student_id,
      s.name           AS student_name,
      s.mobile_number,
      s.chanting_round,
      s.facilitatorId,
      CAST(
        CASE
          WHEN SUM(CASE WHEN sa.StudentId IS NOT NULL THEN 1 ELSE 0 END) = 0
            AND COUNT(DISTINCT CASE WHEN d.class_date >= DATE(md.joined_date) THEN d.class_date ELSE NULL END) = 0
          THEN '-'
          
          WHEN COUNT(DISTINCT CASE WHEN d.class_date >= DATE(md.joined_date) THEN d.class_date ELSE NULL END) = 0
            AND SUM(CASE WHEN sa.StudentId IS NOT NULL THEN 1 ELSE 0 END) > 0
          THEN CONCAT_WS('/',
            SUM(CASE WHEN sa.StudentId IS NOT NULL THEN 1 ELSE 0 END),
            SUM(CASE WHEN sa.StudentId IS NOT NULL THEN 1 ELSE 0 END)
          )

          ELSE CONCAT_WS('/',
            SUM(CASE WHEN sa.StudentId IS NOT NULL THEN 1 ELSE 0 END),
            COUNT(DISTINCT CASE WHEN d.class_date >= DATE(md.joined_date) THEN d.class_date ELSE NULL END)
          )
        END AS CHAR(10)
      ) AS GroupRatio
    FROM students AS s
    LEFT JOIN migration_dates AS md ON md.devoteeId = s.user_id
    LEFT JOIN dates AS d ON 1 = 1
    LEFT JOIN studentAttendance AS sa
      ON sa.StudentId            = s.user_id
     AND DATE(sa.AttendanceDate) = d.class_date
     AND sa.AttendanceSession    = ?
    GROUP BY
      s.user_id,
      s.name,
      s.mobile_number,
      s.chanting_round,
      s.facilitatorId
    ORDER BY s.name;
  `;

  const params = [
    groupPrefix,   
    facilitatorId,    
    groupPrefix,      
    sessionName,     
    yearParam,
    monthParam,
    sessionName
  ];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error executing getFrontlinerdetailReport:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    res.status(200).json(result);
  });
};


exports.getStudentClassReport = (req, res) => {
  const { user_id } = req.body; // ✅ reading from body now

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required in body" });
  }

  db.query("CALL studentClassReport(?)", [user_id], (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results[0]);
  });
};

exports.getStudentReport = (req, res) => {
  const { groupName, month, year } = req.body;

  const getStudentReportQuery = `
      WITH
      -- 1) All class dates
      class_dates AS (
        SELECT DISTINCT DATE(sa.AttendanceDate) AS class_date
        FROM studentAttendance sa
        WHERE sa.AttendanceSession = ?
          AND MONTH(sa.AttendanceDate) = ?
          AND YEAR(sa.AttendanceDate) = ?
      ),

      -- 2) Students with migration date if any
      user_migrations AS (
        SELECT
          u.user_id,
          u.facilitatorId,
          gm.migrationDateTime
        FROM users u
        LEFT JOIN group_migration gm
          ON gm.devoteeId = u.user_id
        AND gm.currentGroup = ?
        WHERE u.group_name = ?
      ),

      -- 3) Facilitator wise date-wise student count
      facilitator_students_by_date AS (
        SELECT
          cd.class_date,
          um.facilitatorId,
          COUNT(DISTINCT um.user_id) AS total_students
        FROM class_dates cd
        JOIN user_migrations um
          ON (um.migrationDateTime IS NULL OR DATE(um.migrationDateTime) <= cd.class_date)
        GROUP BY cd.class_date, um.facilitatorId
      ),

      -- 4) Attendance count per facilitator per date
      attendance_raw AS (
        SELECT
          DATE(sa.AttendanceDate) AS class_date,
          u.facilitatorId,
          COUNT(DISTINCT sa.StudentId) AS attendance_count
        FROM studentAttendance sa
        JOIN users u ON u.user_id = sa.StudentId
        LEFT JOIN group_migration gm
          ON gm.devoteeId = u.user_id
        AND gm.currentGroup = ?
        WHERE u.group_name = ?
          AND sa.AttendanceSession = ?
          AND MONTH(sa.AttendanceDate) = ?
          AND YEAR(sa.AttendanceDate) = ?
          AND (gm.migrationDateTime IS NULL OR sa.AttendanceDate >= gm.migrationDateTime)
        GROUP BY DATE(sa.AttendanceDate), u.facilitatorId
      ),

      -- 5) Facilitator detail
      facilitator_info AS (
        SELECT DISTINCT
          u.facilitatorId,
          ida.name         AS facilitator_name,
          ida.phone_number
        FROM users u
        JOIN iyfdashboardAccounts ida ON u.facilitatorId = ida.user_id
        WHERE u.group_name = ?
      )

    -- 6) Final Output
    SELECT
      cd.class_date,
      fi.facilitatorId,
      fi.facilitator_name,
      fi.phone_number,
      COALESCE(fsbd.total_students, 0) AS total_students,
      COALESCE(ar.attendance_count, 0) AS attendance_count,
      CONCAT(
        COALESCE(ar.attendance_count, 0),
        '/',
        COALESCE(fsbd.total_students, 0)
      ) AS attendance_ratio
    FROM class_dates cd
    CROSS JOIN facilitator_info fi
    LEFT JOIN facilitator_students_by_date fsbd
      ON fsbd.facilitatorId = fi.facilitatorId AND fsbd.class_date = cd.class_date
    LEFT JOIN attendance_raw ar
      ON ar.facilitatorId = fi.facilitatorId AND ar.class_date = cd.class_date
    ORDER BY cd.class_date, fi.facilitatorId;
  `;

  // parameters: [groupName, month, year, groupName, groupName, groupName, groupName, groupName, month, year, groupName]
  db.query(
    getStudentReportQuery,
    [groupName, month, year, groupName, groupName, groupName, groupName, groupName, month, year, groupName],
    (err, result) => {
      if (err) {
        console.error("Error fetching student report:", err);
        return res
          .status(500)
          .json({ error: "Error fetching student report", details: err });
      }

      // even if result is empty, we still return an empty array instead of 404:
      const groupedData = {};
      result.forEach((row) => {
        if (!groupedData[row.facilitatorId]) {
          groupedData[row.facilitatorId] = {
            facilitatorId: row.facilitatorId,
            facilitator_name: row.facilitator_name,
            phone_number: row.phone_number,
            report: [],
          };
        }
        groupedData[row.facilitatorId].report.push({
          class_date: row.class_date,
          attendance_count: row.attendance_count,
          total_students: row.total_students,
          attendance_ratio: row.attendance_ratio,
        });
      });

      const finalResponse = Object.values(groupedData);

      res.status(200).json({
        message: "Student report fetched successfully",
        data: finalResponse,
      });
    }
  );
};
