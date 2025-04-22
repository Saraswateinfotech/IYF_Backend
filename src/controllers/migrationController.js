const db = require('../config/db');

exports.addMigration = (req, res) => {
  const { devoteeId, priviousGroup, currentGroup } = req.body;

  // Validation for required fields
  if (!devoteeId || !priviousGroup || !currentGroup) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert into group_migration table
  const query = `
    INSERT INTO group_migration (devoteeId, priviousGroup, currentGroup)
    VALUES (?, ?, ?)
  `;

  // Update users table to change the group_name
  const updateGroupUsertable = `
    UPDATE users
    SET group_name = ?
    WHERE user_id = ?
  `;

  // First query: Insert migration data
  db.query(query, [devoteeId, priviousGroup, currentGroup], (err, result) => {
    debugger
    if (err) {
      console.error('Error inserting migration data:', err);
      return res.status(500).json({ error: 'Database error while inserting migration data' });
    }

    // Second query: Update the group_name for the user
    db.query(updateGroupUsertable, [currentGroup, devoteeId], (err, results) => {
      console.log(currentGroup + "id" + devoteeId)
      if (err) {
        console.error("Error updating group name:", err);
        return res.status(500).json({ message: "Database error while updating user group" });
      }

      // If both queries are successful, send the response
      return res.status(201).json({
        message: 'Migration data successfully inserted and group updated',
        migrationId: result.insertId,
      });
    });
  });
};