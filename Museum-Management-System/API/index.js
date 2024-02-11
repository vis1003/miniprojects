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

// ----------------------ARTISTS --------------------------
// fetch all artist details from ARTIST table
app.get('/artist/fetch', (req, res) => {

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
app.get('/artist/fetch/:id', (req, res) => {

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

// add new artist into the ARTIST table
app.post('/artist/add', (req, res) => {
  console.log(req.body, "Artist data add");
  let artist_id = req.body.artist_id;
  let artist_name = req.body.artist_name;
  let artist_nationality = req.body.artist_nationality;
  let artist_birth_year = req.body.artist_birth_year;
  let artist_death_year = req.body.artist_death_year;

  let qr = `insert into ARTIST values(${artist_id}, "${artist_name}", "${artist_nationality}", ${artist_birth_year}, ${artist_death_year})`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artist data inserted successfully',
    });
  });
});

// update artist data in the ARTIST table
app.put('/artist/update/:id', (req, res) => {
  console.log(req.body, "Artist data update");
  let artist_id = req.params.id;
  let artist_name = req.body.artist_name;
  let artist_nationality = req.body.artist_nationality;
  let artist_birth_year = req.body.artist_birth_year;
  let artist_death_year = req.body.artist_death_year;

  let qr = `update ARTIST set name = '${artist_name}', nationality = '${artist_nationality}', birth_year = ${artist_birth_year}, death_year = ${artist_death_year} where artist_id = ${artist_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artist data successfully updated',
    });
  });
});

// delete artist data in the ARTIST table
app.delete('/artist/delete/:id', (req, res) => {
  let artist_id = req.params.id;

  let qr = `delete from ARTIST where artist_id = '${artist_id}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artist data successfully deleted',
    });
  });
});

// --------------------------------------------------------------

// ----------------------CATEGORIES------------------------------
// fetch all category details from CATEGORY table
app.get('/category/fetch', (req, res) => {

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
app.get('/category/fetch/:id', (req, res) => {

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

// add new category into the CATEGORY table
app.post('/category/add', (req, res) => {
  console.log(req.body, "Category data add");
  let category_id = req.body.category_id;
  let category_name = req.body.category_name;
  let category_description = req.body.category_description;

  let qr = `insert into CATEGORY values(${category_id}, "${category_name}", "${category_description}")`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Category data inserted successfully',
    });
  });
});

// update category data in the CATEGORY table
app.put('/category/update/:id', (req, res) => {
  console.log(req.body, "Category data update");
  let category_id = req.params.id;
  let category_name = req.body.category_name;
  let category_description = req.body.category_description;

  let qr = `update CATEGORY set name = '${category_name}', description = '${category_description}' where category_id = ${category_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Category data successfully updated',
    });
  });
});

// delete category data in the CATEGORY table
app.delete('/category/delete/:id', (req, res) => {
  let category_id = req.params.id;

  let qr = `delete from CATEGORY where category_id = '${category_id}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Category data successfully deleted',
    });
  });
});

// --------------------------------------------------------------

// ----------------------CURATORS------------------------------
// fetch all curator details from CURATOR table
app.get('/curator/fetch', (req, res) => {

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
app.get('/curator/fetch/:id', (req, res) => {

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

// add new curator into the CURATOR table
app.post('/curator/add', (req, res) => {
  console.log(req.body, "Curator data add");
  let curator_id = req.body.curator_id;
  let curator_name = req.body.curator_name;
  let curator_email = req.body.curator_email;

  let qr = `insert into CURATOR values(${curator_id}, "${curator_name}", "${curator_email}")`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Curator data inserted successfully',
    });
  });
});

// update curator data in the CURATOR table
app.put('/curator/update/:id', (req, res) => {
  console.log(req.body, "Curator data update");
  let curator_id = req.params.id;
  let curator_name = req.body.curator_name;
  let curator_email = req.body.curator_email;

  let qr = `update CURATOR set name = '${curator_name}', email_id = '${curator_email}' where curator_id = ${curator_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Curator data successfully updated',
    });
  });
});

// delete curator data in the CURATOR table
app.delete('/curator/delete/:id', (req, res) => {
  let curator_id = req.params.id;

  let qr = `delete from CURATOR where curator_id = '${curator_id}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Curator data successfully deleted',
    });
  });
});

// --------------------------------------------------------------

// ----------------------ARTIFACTS------------------------------
// fetch all artifact details from ARTIFACT table
app.get('/artifact/fetch', (req, res) => {

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
app.get('/artifact/fetch/:id', (req, res) => {

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

// add new artifact into the ARTIFACT table
app.post('/artifact/add', (req, res) => {
  console.log(req.body, "Artifact data add");
  let artifact_id = req.body.artifact_id;
  let artifact_name = req.body.artifact_name;
  let artifact_description = req.body.artifact_description;
  let artifact_acquisition_date = req.body.artifact_acquisition_date;
  let artifact_condition = req.body.artifact_condition;
  let artist_id = req.body.artist_id;
  let category_id = req.body.category_id;
  let curator_id = req.body.curator_id;

  let qr = `insert into ARTIFACT values(${artifact_id}, "${artifact_name}", "${artifact_description}", "${artifact_acquisition_date}", "${artifact_condition}", ${artist_id}, ${category_id}, ${curator_id})`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artifact data inserted successfully',
    });
  });
});

// update artifact data in the ARTIFACT table
app.put('/artifact/update/:id', (req, res) => {
  console.log(req.body, "Artifact data update");
  let artifact_id = req.params.id;
  let artifact_name = req.body.artifact_name;
  let artifact_description = req.body.artifact_description;
  let artifact_acquisition_date = req.body.artifact_acquisition_date;
  let artifact_condition = req.body.artifact_condition;
  let artist_id = req.body.artist_id;
  let category_id = req.body.category_id;
  let curator_id = req.body.curator_id;

  let qr = `update ARTIFACT set name = '${artifact_name}', description = '${artifact_description}', description = '${artifact_acquisition_date}', description = '${artifact_condition}', artist_id = ${artist_id}, category_id = ${category_id}, curator_id = ${curator_id} where artifact_id = ${artifact_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artifact data successfully updated',
    });
  });
});

// delete artifact data in the ARTIFACT table
app.delete('/artifact/delete/:id', (req, res) => {
  let artifact_id = req.params.id;

  let qr = `delete from ARTIFACT where artifact_id = '${artifact_id}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send({
      message: 'Artifact data successfully deleted',
    });
  });
});

// --------------------------------------------------------------

// ----------------------EXHIBITION------------------------------
// fetch all exhibition details from EXHIBITION table
app.get('/exhibition/fetch', (req, res) => {

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
app.get('/exhibition/fetch/:id', (req, res) => {

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