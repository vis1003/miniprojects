create table ARTIST(
    artist_id int primary key, 
    name varchar(255), 
    nationality varchar(50), 
    birth_year int, 
    death_year int
);

create table CATEGORY(
    category_id int primary key,
    name varchar(50),
    description text
);

create table CURATOR(
    curator_id int primary key,
    name varchar(255),
    email_id varchar(255)
);

create table ARTIFACT(
    artifact_id int primary key,
    name varchar(255),
    description text,
    acquisition_date date,
    artifact_condition varchar(255),
    artist_id int,
    category_id int,
    curator_id int,
    foreign key (artist_id) references ARTIST(artist_id) on delete set null,
    foreign key (category_id) references CATEGORY(category_id) on delete set null,
    foreign key (curator_id) references CURATOR(curator_id) on delete set null
);

create table EXHIBITION(
    exhibition_id int primary key,
    name varchar(255),
    start_date date,
    end_date date,
    location varchar(255)
);

create table ARTIFACT_EXHIBITION(
    artifact_id int,
    exhibition_id int,
    primary key(artifact_id,exhibition_id),
    foreign key (artifact_id) references ARTIFACT(artifact_id) on delete cascade,
    foreign key (exhibition_id) references EXHIBITION(exhibition_id) on delete cascade
);




-- Commands to add in test data because i'm cool like that

-- ARTIST
INSERT INTO ARTIST (artist_id, name, nationality, birth_year, death_year) 
VALUES
(1, 'Leonardo da Vinci', 'Italian', 1452, 1519),
(2, 'Vincent van Gogh', 'Dutch', 1853, 1890),
(3, 'Frida Kahlo', 'Mexican', 1907, 1954),
(4, 'Pablo Picasso', 'Spanish', 1881, 1973),
(5, 'Claude Monet', 'French', 1840, 1926),
(6, 'Ansel Adams', 'American', 1902, 1984),
(7, 'Dorothea Lange', 'American', 1895, 1965),
(8, 'Georgia O''Keeffe', 'American', 1887, 1986),
(9, 'Salvador Dali', 'Spanish', 1904, 1989),
(10, 'Henri Matisse', 'French', 1869, 1954);

-- CATEGORY
INSERT INTO CATEGORY (category_id, name, description) 
VALUES
(1, 'Painting', 'Artwork created with paint on a surface'),
(2, 'Sculpture', 'Three-dimensional artwork created by shaping or combining materials'),
(3, 'Photography', 'Art and practice of creating images using light');

-- CURATOR
INSERT INTO CURATOR (curator_id, name, email_id) 
VALUES
(1, 'Alice Johnson', 'alice@email.com'),
(2, 'Bob Smith', 'bob@email.com'),
(3, 'Eva Martinez', 'eva@email.com'),
(4, 'David White', 'david@email.com'),
(5, 'Sophie Brown', 'sophie@email.com');

-- ARTIFACT
INSERT INTO ARTIFACT (artifact_id, name, description, acquisition_date, artifact_condition, artist_id, category_id, curator_id) 
VALUES
(1, 'Mona Lisa', 'Famous portrait painting', '1503-01-01', 'Excellent', 1, 1, 1),
(2, 'Starry Night', 'Iconic night sky painting', '1889-01-01', 'Good', 2, 1, 2),
(3, 'The Two Fridas', 'Symbolic self-portrait painting', '1939-01-01', 'Fair', 3, 1, 3),
(4, 'Guernica', 'Powerful anti-war painting', '1937-01-01', 'Excellent', 4, 1, 4),
(5, 'Water Lilies', 'Series of impressionist paintings', '1914-01-01', 'Very Good', 5, 1, 5),
(6, 'David', 'Renowned marble sculpture', '1504-01-01', 'Excellent', 1, 2, 1),
(7, 'The Thinker', 'Bronze sculpture representing philosophy', '1881-01-01', 'Good', 2, 2, 2),
(8, 'Migrant Mother', 'Documentary photograph capturing hardship', '1936-01-01', 'Fair', 6, 3, 3),
(9, 'Les Demoiselles d''Avignon', 'Avant-garde painting', '1907-01-01', 'Excellent', 4, 1, 4),
(10, 'The Persistence of Memory', 'Surrealist painting with melting clocks', '1931-01-01', 'Very Good', 5, 1, 5);

-- EXHIBITION
INSERT INTO EXHIBITION (exhibition_id, name, start_date, end_date, location) 
VALUES
(1, 'Impressionist Masterpieces', '2024-03-01', '2024-05-01', 'Art Museum A'),
(2, 'Sculpture Showcase', '2024-06-15', '2024-08-15', 'Sculpture Gallery B'),
(3, 'Photography Through Time', '2024-09-10', '2024-11-10', 'Photography Hall C'),
(4, 'Modern Art Extravaganza', '2025-01-02', '2025-03-02', 'Contemporary Art Space D'),
(5, 'Avant-Garde Wonders', '2025-05-15', '2025-07-15', 'Avant-Garde Gallery E');


-- ARTIFACT_EXHIBITION
INSERT INTO ARTIFACT_EXHIBITION (artifact_id, exhibition_id) 
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5);


SELECT * FROM ARTIST;
SELECT * FROM CATEGORY;
SELECT * FROM CURATOR;
SELECT * FROM ARTIFACT;
SELECT * FROM EXHIBITION;
SELECT * FROM ARTIFACT_EXHIBITION;

-- View

CREATE VIEW Exhibition_Artifacts AS
SELECT E.exhibition_id, E.name AS exhibition_name, A.artifact_id, A.name AS artifact_name, A.description AS artifact_description
FROM EXHIBITION E
JOIN ARTIFACT_EXHIBITION AE ON E.exhibition_id = AE.exhibition_id
JOIN ARTIFACT A ON AE.artifact_id = A.artifact_id;

-- Stored Procedure

DELIMITER //

CREATE PROCEDURE GetArtifactsByExhibition(
  IN exhibition_id INT
)
BEGIN
  SELECT a.name AS artifact_name, a.description, c.name AS category_name
  FROM ARTIFACT a
  INNER JOIN ARTIFACT_EXHIBITION ae ON ae.artifact_id = a.artifact_id
  INNER JOIN CATEGORY c ON c.category_id = a.category_id
  WHERE ae.exhibition_id = exhibition_id;
END //

DELIMITER ;

CALL GetArtifactsByExhibition(1);

DROP PROCEDURE IF EXISTS CreateExhibitionTables;

-- Triggers

-- trigger for artist birth year to be before death year

DELIMITER //

CREATE TRIGGER ensure_valid_artist_years_trigger
BEFORE INSERT ON ARTIST
FOR EACH ROW
BEGIN
    IF NEW.birth_year >= NEW.death_year THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Artist birth year must be before the death year';
    END IF;
END //

CREATE TRIGGER ensure_valid_artist_years_trigger_update
BEFORE UPDATE ON ARTIST
FOR EACH ROW
BEGIN
    IF NEW.birth_year >= NEW.death_year THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Artist birth year must be before the death year';
    END IF;
END //

DELIMITER ;


-- trigger for exhibition start date to be before exhibition end date

DELIMITER //

CREATE TRIGGER ensure_valid_exhibition_dates_trigger
BEFORE INSERT ON EXHIBITION
FOR EACH ROW
BEGIN
    IF NEW.start_date >= NEW.end_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Exhibition start date must be before the end date';
    END IF;
END //

CREATE TRIGGER ensure_valid_exhibition_dates_trigger_update
BEFORE UPDATE ON EXHIBITION
FOR EACH ROW
BEGIN
    IF NEW.start_date >= NEW.end_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Exhibition start date must be before the end date';
    END IF;
END //

DELIMITER ;
