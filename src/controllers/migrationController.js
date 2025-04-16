const db = require('../config/db');

exports.addMigration = (req, res) => {
  const { devoteeId, priviousGroup, currentGroup } = req.body;

  if (!devoteeId || !priviousGroup || !currentGroup ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO group_migration (devoteeId, priviousGroup, currentGroup)
    VALUES (?, ?,?)
  `;

  db.query(query, [devoteeId, priviousGroup, currentGroup], (err, result) => {
    if (err) {
      console.error('Error inserting migration data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({
      message: 'Migration data successfully inserted',
      migrationId: result.insertId, 
    });
  });
};
