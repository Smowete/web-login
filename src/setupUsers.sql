
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    name VARCHAR(50),
    student_no VARCHAR(50),
    gender INTEGER,
    age INTEGER,
    admin INTEGER
);