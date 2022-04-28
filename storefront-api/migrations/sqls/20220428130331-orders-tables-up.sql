CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id) NOT NULL,
  status varchar(16) NOT NULL DEFAULT 'open',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  order_id int REFERENCES orders(id) NOT NULL,
  item_id int REFERENCES items(id) NOT NULL,
  quantity int NOT NULL DEFAULT 1
);
