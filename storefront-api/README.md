# Storefront Backend Project

This project represents a starting API to handle the basics of an ecommerce store, from handling customer details, product info, and open orders/carts.

- Express
- Typescript
- PostgreSQL
- Jasmine

## Commands

### Installation

```
pnpm i
```

### .env

A `.env` file is required with the following values:

```yaml
POSTGRES_HOST='localhost'
POSTGRES_USER='full_stack_user'
POSTGRES_DB='full_stack_dev'
POSTGRES_PASSWORD='password123'
POSTGRES_PORT='5432'
POSTGRES_TEST_DB='full_stack_test'
ENV='dev'
BCRYPT_PASSWORD='omgbeckylookatherbutt'
SALT_ROUNDS='10'
```

### DB Setup

Ensure you have docker running and then you can run the following command:

> Substitute PNPM with NPM or YARN as your heart desires

```bash
pnpm run setup
```

This will build the docker containers, create the database, and generate cryptographic keys. Afterwards it will run the test suite to build and test the code to ensure everything is working as expected.

Database will run on port `5432`

If you want to set it up manually, with SQL, you can run the following commands:

```sql
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
CREATE DATABASE full_stack_test;
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
```

Then run the following command:

```bash
pnpm run db:migrate
```

Ensure the database is running on port `5432` or update the `.env` appropriately.

### Crypto Keys

This project uses a RS256 Private/Public Key pair for signing and verifying JWT tokens. These keys are not included with in this repository. They are automatically generated during the setup process, however, if you want to separately create them or refresh them, you can do so by running the following command:

```bash
pnpm createkeys
```

When prompted, do not provide a passphrase.

> Note: this requires `ssh-keygen` and `openssl` to be installed on your system

### Running the Server

Due to conflicts using `db-migrate` in a modules environment, running the server requires building and then running the output files.

```
pnpm build && pnpm serve
```

This will spin the serve up on `localhost:3000`

### Testing

```
pnpm test
```

## Routes

### /products

Naturally, the products routes handle product data

| route                | description                  | auth required? |
| -------------------- | ---------------------------- | -------------- |
| GET /products        | returns all products         | N              |
| GET /products/:id    | returns single product by id | N              |
| POST /products       | adds new product             | Y              |
| PUT /products/:id    | updates product at id        | Y              |
| DELETE /products/:id | deletes product by id        | Y              |
