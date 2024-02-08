const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());

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

// fetch all artist details from ARTIST table
app.get('/artist', (req, res) => {

  let qr = `select * from ARTIST`;

  db.query(qr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Artist data retrieved successfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No artist data found',
        data: []
      });
    }
  });
});

// fetch artist detail based on artist id from ARTIST table
app.get('/artist/:id', (req, res) => {

  let artistID = req.params.id;
  let qr = `select * from ARTIST where artist_id = ${artistID}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Artist data retrieved successfully',
        data: result
      });
    }
    else {
      res.status(404).send('Artist not found');
    }
  });
});

// fetch all category details from CATEGORY table
app.get('/category', (req, res) => {

  let qr = `select * from CATEGORY`;

  db.query(qr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Category data retrieved successfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No Category data found',
        data: []
      });
    }
  });
});

// fetch category detail based on artist id from CATEGORY table
app.get('/category/:id', (req, res) => {

  let categoryId = req.params.id;
  let qr = `select * from CATEGORY where category_id = ${categoryId}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Category data retrieved successfully',
        data: result
      });
    }
    else {
      res.status(404).send('Category not found');
    }
  });
});



// Listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});