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

create table ARTIFACT(
    artifact_id int primary key,
    name varchar(255),
    description text,
    acquisition_date date,
    condition varchar(255),
    artist_id int,
    category_id int,
    foreign key (artist_id) references ARTIST(artist_id) on delete set null,
    foreign key (category_id) references CATEGORY(category_id) on delete set null
);

create table CURATOR(
    curator_id int primary key,
    name varchar(255),
    email_id varchar(255),
    artifact_id int,
    foreign key (artifact_id) references ARTIFACT(artifact_id) on delete set null
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
    curator_id int,
    primary key(artifact_id,exhibition_id),
    foreign key (artifact_id) references ARTIFACT(artifact_id) on delete set null,
    foreign key (curator_id) references CURATOR(curator_id) on delete set null,
    foreign key (exhibition_id) references EXHIBITION(exhibition_id) on delete cascade
);
