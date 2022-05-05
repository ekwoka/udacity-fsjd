CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL default '0.00',
  category_id INTEGER REFERENCES categories(id)
);
