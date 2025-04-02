const db = require("../config/db");



// Create a batch
exports.createBatch = (req, res) => {
  const { GroupName, FacilitatorId } = req.body;
console.log('====================================')
console.log(req.body)
console.log('====================================')
  // Validate inputs
  if (!GroupName || !FacilitatorId) {
    return res.status(400).json({ error: 'GroupName and FacilitatorId are required' });
  }

  // Auto-set today's date (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split('T')[0];

  // ✅ FIXED SQL: only 3 columns, so 3 placeholders
  const sql = `
    INSERT INTO studentbatch (GroupName, BatchCreatedDate, FacilitatorId)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [GroupName, currentDate, FacilitatorId], (err, result) => {
    if (err) {
      console.error('Error inserting batch:', err);
      return res.status(500).json({ error: 'Database insert failed', details: err });
    }

    res.status(201).json({
      message: 'Batch created',
      BatchId: result.insertId,
    });
  });
};

