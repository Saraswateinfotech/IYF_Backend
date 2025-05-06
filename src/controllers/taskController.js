
const db = require("../config/db");

// Get all tasks for a specific user
exports.getTasksByUserId = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = `
    SELECT * FROM tasks WHERE user_id = ? ORDER BY create_date DESC
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ tasks: results });
  });
};


// Create a new task with proper end_time and create_date in IST
exports.createTask = (req, res) => {
  const { user_id, task_text, end_time } = req.body;

  if (!user_id || !task_text) {
    return res.status(400).json({ message: "User ID and task text are required" });
  }

  // Convert end_time from 'DD/MM/YYYY' to 'YYYY-MM-DD 00:00:00'
  let formattedEndTime = null;
  if (end_time) {
    const parts = end_time.split('/');
    if (parts.length === 3) {
      formattedEndTime = `${parts[2]}-${parts[1]}-${parts[0]} 00:00:00`; // e.g., 2025-05-10 00:00:00
    } else {
      formattedEndTime = end_time; // assume already correct format
    }
  }

  // Get current date-time in IST
  const istDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const createDate = new Date(istDate); // convert back to Date object for MySQL

  const query = `
    INSERT INTO tasks (user_id, task_text, end_time, create_date, status)
    VALUES (?, ?, ?, ?, 'pending')
  `;

  db.query(query, [user_id, task_text, formattedEndTime, createDate], (err, results) => {
    if (err) {
      console.error("Error creating task:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(201).json({ 
      message: "Task created successfully",
      task_id: results.insertId 
    });
  });
};

// Update a task
exports.updateTask = (req, res) => {
  const { task_id } = req.params;
  const { task_text, end_time, status } = req.body;

  if (!task_id) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  const query = `
    UPDATE tasks 
    SET 
      task_text = ?,
      end_time = ?,
      status = ?
    WHERE task_id = ?
  `;

  db.query(query, 
    [
      task_text || null,
      end_time || null,
      status || 'pending',
      task_id
    ], 
    (err, results) => {
      if (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task updated successfully" });
    }
  );
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { task_id } = req.params;

  if (!task_id) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  const query = `
    DELETE FROM tasks WHERE task_id = ?
  `;

  db.query(query, [task_id], (err, results) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  });
};

// Toggle task status (pending/completed)
exports.toggleTaskStatus = (req, res) => {
  const { task_id } = req.params;

  if (!task_id) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  const getStatusQuery = `
    SELECT status FROM tasks WHERE task_id = ?
  `;

  db.query(getStatusQuery, [task_id], (err, results) => {
    if (err) {
      console.error("Error fetching task status:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const currentStatus = results[0].status;
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

    const updateQuery = `
      UPDATE tasks SET status = ? WHERE task_id = ?
    `;

    db.query(updateQuery, [newStatus, task_id], (err, updateResults) => {
      if (err) {
        console.error("Error updating task status:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ 
        message: "Task status updated successfully",
        new_status: newStatus 
      });
    });
  });
};

