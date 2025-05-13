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

  exports.getTop3FrontlinersByMonthYear = (req, res) => {
    const { month, year } = req.params;  // Extract month and year from the request parameters

    db.query('CALL sp_top_3_frontliners_by_month_year(?, ?)', [month, year], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results[0]);  // Return the results of the stored procedure
    });
};



exports.getAllFrontlinerReports = (req, res) => {
    db.query('CALL sp_get_all_frontliner_report()', (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results[0]);  
    });
};

