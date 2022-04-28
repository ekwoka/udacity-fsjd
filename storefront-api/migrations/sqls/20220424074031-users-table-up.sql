CREATE TABLE users (
  id serial PRIMARY KEY,
  email varchar(255) NOT NULL,
  username varchar(36) NOT NULL UNIQUE,
  password_digest varchar(255) NOT NULL
);
