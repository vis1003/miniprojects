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

// fetch artist detail based on artist_id from ARTIST table
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

// fetch category detail based on category_id from CATEGORY table
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

// fetch all curator details from CURATOR table
app.get('/curator', (req, res) => {

  let qr = `select * from CURATOR`;

  db.query(qr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Curator data retrieved successfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No Curator data found',
        data: []
      });
    }
  });
});

// fetch curator detail based on curator_id from CURATOR table
app.get('/curator/:id', (req, res) => {

  let curatorId = req.params.id;
  let qr = `select * from CURATOR where curator_id = ${curatorId}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Curator data retrieved successfully',
        data: result
      });
    }
    else {
      res.status(404).send('Curator not found');
    }
  });
});

// fetch all artifact details from ARTIFACT table
app.get('/artifact', (req, res) => {

  let qr = `SELECT A.artifact_id, A.name AS artifact_name, A.description AS artifact_description, DATE_FORMAT(A.acquisition_date, '%Y-%m-%d') AS acquisition_date, A.artifact_condition, AR.name AS artist_name, C.name AS category_name, CR.name AS curator_name FROM ARTIFACT A INNER JOIN ARTIST AR ON A.artist_id = AR.artist_id INNER JOIN CATEGORY C ON A.category_id = C.category_id INNER JOIN CURATOR CR ON A.curator_id = CR.curator_id`;

  db.query(qr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Artifact data retrieved successfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No Artifact data found',
        data: []
      });
    }
  });
});

// fetch artifact detail based on artifact_id from ARTIFACT table
app.get('/artifact/:id', (req, res) => {

  let artifactId = req.params.id;
  let qr = `SELECT A.artifact_id, A.name AS artifact_name, A.description AS artifact_description, DATE_FORMAT(A.acquisition_date, '%Y-%m-%d') AS acquisition_date, A.artifact_condition, AR.name AS artist_name, C.name AS category_name, CR.name AS curator_name FROM ARTIFACT A INNER JOIN ARTIST AR ON A.artist_id = AR.artist_id INNER JOIN CATEGORY C ON A.category_id = C.category_id INNER JOIN CURATOR CR ON A.curator_id = CR.curator_id where artifact_id = ${artifactId}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Artifact data retrieved successfully',
        data: result
      });
    }
    else {
      res.status(404).send('Artifact not found');
    }
  });
});


// fetch all exhibition details from EXHIBITION table
app.get('/exhibition', (req, res) => {

  let qr = `SELECT exhibition_id, name, DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, location FROM EXHIBITION`;

  db.query(qr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Exhibition data retrieved successfully',
        data: result
      });
    }
    else {
      res.send({
        message: 'No Exhibition data found',
        data: []
      });
    }
  });
});

// fetch exhibition detail based on exhibition_id from EXHIBITION table
app.get('/exhibition/:id', (req, res) => {

  let exhibtionId = req.params.id;
  let qr = `SELECT exhibition_id, name, DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, location FROM EXHIBITION where exhibition_id = ${exhibtionId}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    if (result.length > 0) {
      res.send({
        message: 'Exhibition data retrieved successfully',
        data: result
      });
    }
    else {
      res.status(404).send('Exhibition not found');
    }
  });
});



// Listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});