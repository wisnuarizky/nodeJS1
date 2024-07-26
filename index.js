const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

// untuk bisa nangkep yang dikirim dari webrowser
app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "API ready to go!", "SUCCESSS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";

  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "ini message", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "ini message", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;

  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "Berhasil Menambahkan Data", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}',
                                    kelas = '${kelas}',
                                    alamat = '${alamat}'
                                    WHERE nim = ${nim}`;

  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "Error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "ini message", res);
    } else {
      response(500, "Mohon Maaf Tidak Menemukan Data!!!", "Gada Data Cok", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isDelete: result.affectedRows,
      };
      response(200, data, "ini delete data", res);
    } else {
      response(500, "Mohon Maaf Tidak Menemukan Data!!!", "Gada Data Cok", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
