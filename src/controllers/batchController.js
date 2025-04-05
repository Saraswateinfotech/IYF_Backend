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
        b.is_start,
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
// exports.getBatchesByfacilitatorId = (req, res) => {
//   const { facilitatorId } = req.params;

//   const query = `
//     SELECT BatchId, GroupName,is_start, BatchCreatedDate, Status, FacilitatorId
//     FROM studentbatch
//     WHERE FacilitatorId = ?`;

//   db.query(query, [facilitatorId], (err, results) => {
//     if (err) {
//       console.error('Error fetching batches:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     res.json(results);
//   });
// }

  exports.getBatchesByfacilitatorId = (req, res) => {
    const { facilitatorId } = req.params;

    const query = `
      SELECT 
        b.BatchId,
        b.GroupName,
        b.is_start,
        b.BatchCreatedDate,
        b.Status,
        b.FacilitatorId,
        a.name AS FacilitatorName
      FROM studentbatch b
      LEFT JOIN iyfdashboardAccounts a ON b.FacilitatorId = a.user_id
      WHERE b.FacilitatorId = ?`;

    db.query(query, [facilitatorId], (err, results) => {
      if (err) {
        console.error('Error fetching batches:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.json(results);
    });
  };

// put updateIsStart 
exports.updateIsStart = async (req, res) => {
  const { batchId, isStart } = req.body;

  if (typeof batchId === 'undefined' || typeof isStart === 'undefined') {
    return res.status(400).json({ message: 'batchId and isStart are required' });
  }

  const query = `UPDATE studentbatch SET is_start = ? WHERE BatchId = ?`;

  db.query(query, [isStart ? 1 : 0, batchId], (err, result) => {
    if (err) {
      console.error('Error updating batch:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Batch is_start updated successfully' });
  });
};