const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'lawda.org',
  user: 'root',
  password: 'yourmom69',
  database: 'museum',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get('/artists', (req, res) => {

  let qr = 'select * from ARTIST';

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'errs');
    }
    if (result.length > 0) {
      res.send({
        message: 'artist data',
        data: result
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});