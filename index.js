const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

// untuk bisa nangkep yang dikirim dari webrowser
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, result) => {
    // hasil data dari mysql
    response(200, result, "get all data  from table mahasiswa", res);
  });
});

app.get("/find", (req, res) => {
  const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
    response(200, result, "get mahasiswa", res);
  });
});

app.post("/login", (req, res) => {
  console.log({ requestFrom: req.body });
  res.send("login berhasil!");
});

app.put("/username", (req, res) => {
  console.log({ UpdateForm: req.body });
  res.send("Update Berhasil!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
