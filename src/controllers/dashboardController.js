const db = require("../config/db");

exports.getDashboardReport = (req, res) => {
  const sql = `CALL sp_get_stddashboard_report()`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error calling stored procedure:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(results[0]); 
  });
};

exports.getFrontlinerdetailReport =(req, res) => {
    const { callingId } = req.params;
  
    db.query('CALL sp_get_frontlinerdetail_report(?)', [callingId], (err, results) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results[0]);
    });
  };