const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./connection');

// untuk bisa nangkep yang dikirim dari webrowser
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (error, result) => {
    // hasil data dari mysql
    console.log(result);
  });
  res.send('Halaman Utamaaaaaaasjqiqwin');
});

app.get('/hello', (req, res) => {
  console.log({ URLParams: req.query.nama });
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  console.log({ requestFrom: req.body });
  res.send('login berhasil!');
});

app.put('/username', (req, res) => {
  console.log({ UpdateForm: req.body });
  res.send('Update Berhasil!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
