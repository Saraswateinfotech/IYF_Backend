const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const studentFormRoutes = require("./src/routes/studentFormRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const db = require("./src/config/db");



console.log('hi there! wlc to  IYF_Dashboard');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '2gb' }));
app.use(express.urlencoded({ limit: '2gb', extended: true }));



app.use("/auth", authRoutes);
app.use("/students", studentFormRoutes);
app.use("/dashboard", dashboardRoutes);


app.get('/', (req, res) => {
    res.send('Hello from Node API Server IYF_Dashboard Updated');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
