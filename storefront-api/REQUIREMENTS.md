# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products - DONE

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products (Most Expensive Products)
- ~~[OPTIONAL] Products by category (args: product category)~~

#### Users - DONE

- Index [token required]
- Show [token required]
- Create New ~~[token required]~~ (User creates themselves before they have a token)

#### Orders - DONE

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product - DONE
```
TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL default '0.00',
  category_id INTEGER REFERENCES categories(id)
);
```

- id
- name
- price
- [OPTIONAL] category

#### User- DONE
```
TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  password_digest VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL default 'user'
);
```

- id
- firstName
- lastName
- password

#### Orders - DONE
```
TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(255) NOT NULL default 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

TABLE order_products (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
);
```

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
