CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  password_digest VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL default 'user'
);
