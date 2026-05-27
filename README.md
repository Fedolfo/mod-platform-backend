# Movelaria On Demand (MOD) — Backend

Backend API for **Movelaria On Demand (MOD)**, a collaborative furniture e-commerce platform.

This repository provides the server-side foundation for products, accounts and cart management using NestJS, TypeORM and PostgreSQL.

## Project Overview

Movelaria On Demand is a full-stack furniture store project developed collaboratively with a dedicated frontend application.

The backend currently includes:

- NestJS application structure
- REST API under `/api/v1`
- PostgreSQL integration through TypeORM
- Environment-based configuration
- Product and category entities
- Account registration and login
- Cart and cart item management
- Global Zod validation pipe
- CORS configuration
- Swagger documentation in development mode
- Docker and Docker Compose support for local development and production workflows

## Related Repository

Frontend application:

```txt
https://github.com/RobotEby/mod-platform-frontend
```

## Tech Stack

- **Node.js**
- **NestJS 11**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **bcrypt**
- **Zod**
- **nestjs-zod**
- **Swagger / OpenAPI**
- **Docker**
- **Docker Compose**
- **Jest**
- **ESLint**
- **Prettier**

## Requirements

For local development without Docker:

- Node.js 20 or newer recommended
- npm
- PostgreSQL

For Docker development:

- Docker
- Docker Compose

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Fedolfo/mod-platform-backend.git
cd mod-platform-backend
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Update the environment values as needed.

Start the application in development mode:

```bash
npm run start:dev
```

The API will be available at:

```txt
http://localhost:3000
```

Swagger documentation is enabled in development mode at:

```txt
http://localhost:3000/docs
```

## Environment Variables

| Variable               | Required | Default / Example                   | Description                                                         |
| ---------------------- | -------: | ----------------------------------- | ------------------------------------------------------------------- |
| `NODE_ENV`             |      Yes | `development`                       | Application environment                                             |
| `PORT`                 |      Yes | `3000`                              | HTTP server port                                                    |
| `DB_TYPE`              |      Yes | `postgres`                          | Database driver. Supported in config: `postgres`, `sqlite`, `mysql` |
| `DB_HOST`              |      Yes | `localhost`                         | Database host                                                       |
| `DB_PORT`              |      Yes | `5432`                              | Database port                                                       |
| `DB_USERNAME`          |      Yes | `postgres-design-furniture`         | Database username                                                   |
| `DB_PASSWORD`          |      Yes | `postgres123`                       | Database password                                                   |
| `DB_DATABASE`          |      Yes | `design_furniture_dev`              | Database name                                                       |
| `DB_SYNCHRONIZE`       |      Yes | `true`                              | TypeORM schema synchronization                                      |
| `DB_LOGGING`           |      Yes | `true`                              | Enables TypeORM query logging                                       |
| `JWT_SECRET`           |      Yes | empty in `.env.example`             | JWT signing secret                                                  |
| `JWT_EXPIRES_IN`       |       No | `86400`                             | JWT expiration in seconds                                           |
| `CORS_ORIGIN`          |       No | `*`                                 | Allowed CORS origins                                                |
| `CORS_METHODS`         |       No | `GET,POST,PUT,DELETE,PATCH,OPTIONS` | Allowed CORS methods                                                |
| `CORS_ALLOWED_HEADERS` |       No | `Content-Type,Authorization,Accept` | Allowed CORS headers                                                |
| `CORS_CREDENTIALS`     |       No | `true`                              | Enables CORS credentials                                            |

Example `.env`:

```env
NODE_ENV=development
PORT=3000

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres-design-furniture
DB_PASSWORD=postgres123
DB_DATABASE=design_furniture_dev
DB_SYNCHRONIZE=true
DB_LOGGING=true

JWT_SECRET=replace-this-secret
JWT_EXPIRES_IN=86400

CORS_ORIGIN=http://localhost:8080
CORS_METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization,Accept
CORS_CREDENTIALS=true
```

## Running with Docker

Start the development environment:

```bash
npm run docker:dev
```

Or manually:

```bash
docker-compose up -d
```

The development Docker Compose stack includes:

- PostgreSQL 16 Alpine
- NestJS application container
- Hot reload support
- Node.js inspector on port `9222`
- Named volume for PostgreSQL data
- npm cache volume

Development Docker URLs:

| Service                   | URL / Port                   |
| ------------------------- | ---------------------------- |
| API                       | `http://localhost:3000`      |
| PostgreSQL host port      | `5433`                       |
| PostgreSQL container port | `5432`                       |
| Node debugger             | `9222`                       |
| Swagger docs              | `http://localhost:3000/docs` |

Important:

When running the backend outside Docker while using the Docker PostgreSQL container, use:

```env
DB_HOST=localhost
DB_PORT=5433
```

When running the backend inside Docker Compose, use:

```env
DB_HOST=postgres
DB_PORT=5432
```

Stop Docker services:

```bash
npm run docker:dev:down
```

View logs:

```bash
npm run docker:dev:logs
```

Rebuild containers:

```bash
npm run docker:dev:build
```

## Production Docker

Start production stack:

```bash
npm run docker:prod
```

Or manually:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Stop production stack:

```bash
npm run docker:prod:down
```

View production logs:

```bash
npm run docker:prod:logs
```

## Available Scripts

### Application

```bash
npm run build
```

Builds the NestJS application.

```bash
npm run start
```

Starts the application using Nest.

```bash
npm run start:dev
```

Starts the application in watch mode.

```bash
npm run start:debug
```

Starts the application in debug watch mode on `0.0.0.0:9222`.

```bash
npm run start:prod
```

Runs the compiled application from `dist/main`.

### Code Quality

```bash
npm run format
```

Formats source and test files with Prettier.

```bash
npm run lint
```

Runs ESLint and applies automatic fixes.

### Tests

```bash
npm run test
```

Runs unit tests.

```bash
npm run test:watch
```

Runs tests in watch mode.

```bash
npm run test:cov
```

Runs tests with coverage.

```bash
npm run test:debug
```

Runs tests in debug mode.

```bash
npm run test:e2e
```

Runs end-to-end tests.

### Docker

```bash
npm run docker:dev
npm run docker:dev:up
npm run docker:dev:down
npm run docker:dev:logs
npm run docker:dev:build
npm run docker:prod
npm run docker:prod:up
npm run docker:prod:down
npm run docker:prod:logs
npm run docker:prod:build
```

## API Documentation

Swagger is available only when:

```env
NODE_ENV=development
```

Open:

```txt
http://localhost:3000/docs
```

## API Base URL

All business modules currently use the following base path:

```txt
/api/v1
```

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "uptime": 123.45
}
```

## Main Endpoints

### Products

Base path:

```txt
/api/v1/products
```

| Method   | Endpoint               | Description       |
| -------- | ---------------------- | ----------------- |
| `POST`   | `/api/v1/products`     | Create product    |
| `GET`    | `/api/v1/products`     | List products     |
| `GET`    | `/api/v1/products/:id` | Get product by ID |
| `PUT`    | `/api/v1/products/:id` | Update product    |
| `DELETE` | `/api/v1/products/:id` | Delete product    |

### Account

Base path:

```txt
/api/v1/account
```

| Method   | Endpoint                                       | Description                                |
| -------- | ---------------------------------------------- | ------------------------------------------ |
| `POST`   | `/api/v1/account/register`                     | Register account and return login response |
| `POST`   | `/api/v1/account/login`                        | Login account                              |
| `GET`    | `/api/v1/account/profile?email=user@email.com` | Get profile by email                       |
| `GET`    | `/api/v1/account/:id`                          | Get account by ID                          |
| `PUT`    | `/api/v1/account/update/:id`                   | Update account                             |
| `DELETE` | `/api/v1/account/delete/:id`                   | Delete account                             |

### Cart

Base path:

```txt
/api/v1/cart
```

| Method   | Endpoint                                     | Description                                 |
| -------- | -------------------------------------------- | ------------------------------------------- |
| `POST`   | `/api/v1/cart`                               | Create cart                                 |
| `GET`    | `/api/v1/cart`                               | List carts, optionally filtered by `userId` |
| `GET`    | `/api/v1/cart/user/:userId`                  | Get user cart with items                    |
| `GET`    | `/api/v1/cart/:id`                           | Get cart by ID                              |
| `PUT`    | `/api/v1/cart/:id`                           | Update cart                                 |
| `DELETE` | `/api/v1/cart/:id`                           | Delete cart                                 |
| `POST`   | `/api/v1/cart/user/:userId/items`            | Add item to user cart                       |
| `PUT`    | `/api/v1/cart/user/:userId/items/:productId` | Update cart item quantity                   |
| `DELETE` | `/api/v1/cart/user/:userId/items/:productId` | Remove item from cart                       |
| `DELETE` | `/api/v1/cart/user/:userId/items`            | Clear user cart                             |

## Data Model Summary

Registered TypeORM entities:

- `Account`
- `ProductEntity`
- `CategoryEntity`
- `CartEntity`
- `CartItemEntity`

### Account

Stored in the `accounts` table.

Main fields:

- `id`
- `email`
- `password`
- `full_name`
- `phone`
- `address`
- `cpf_cnpj`
- `is_admin`
- `created_at`
- `updated_at`

### Product

Stored in the `products` table.

Main fields:

- `id`
- `category_id`
- `name`
- `description`
- `price`
- `original_price`
- `discount_percent`
- `dimensions`
- `lead_time`
- `main_image_url`
- `gallery_images`
- `status`
- `rating`
- `createdAt`
- `updatedAt`

### Category

Stored in the `categories` table.

Main fields:

- `id`
- `name`
- `image_url`
- `status`
- `products`
- `createdAt`
- `updatedAt`

### Cart

Stored in the `carts` table.

Main fields:

- `id`
- `user_id`
- `status`
- `items`
- `createdAt`
- `updatedAt`

### Cart Item

Stored in the `cart_items` table.

Main fields:

- `id`
- `cart`
- `cart_id`
- `product`
- `product_id`
- `quantity`
- `unitPriceSnapshot`

## Project Structure

```txt
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── config/
│   ├── config.module.ts
│   └── config.service.ts
├── database/
│   ├── database.config.ts
│   ├── database.module.ts
│   └── entities/
└── modules/
    ├── account/
    ├── cart/
    └── products/
```

## Architecture Notes

The project uses a modular NestJS architecture with dependency injection tokens for service interfaces.

Examples:

```txt
PRODUCTS_SERVICE_TOKEN
ACCOUNT_SERVICE_TOKEN
CART_SERVICE_TOKEN
```

This helps separate controllers from concrete service implementations and makes the codebase easier to test and evolve.

## Validation

The application registers `ZodValidationPipe` globally. DTO validation is handled through `nestjs-zod`.

## CORS

CORS settings are loaded from environment variables through the custom configuration service.

For local frontend development, use:

```env
CORS_ORIGIN=http://localhost:8080
```

For multiple origins:

```env
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080
```

## Frontend Compatibility Notes

The related frontend expects the backend API base to be:

```txt
http://localhost:3000/api/v1
```

Current integration points to review:

1. The frontend authentication client calls `/account/register` and `/account/login`, which match the current backend account routes.
2. The frontend calls `/account/profile` without query parameters, while this backend currently expects `GET /account/profile?email=...`.
3. The frontend `AuthContext` currently references `/auth/me`, but this backend currently uses `/api/v1/account`.
4. The frontend wishlist context references `/wishlist`, but this backend currently provides `products`, `account` and `cart` modules.
5. Product catalog integration can be connected through `/api/v1/products`.

## Recommended Improvements

- Add authentication guards for protected account/cart/admin operations
- Align profile route with token-based authentication instead of email query lookup
- Add `/auth/me` or update the frontend to use `/account/profile`
- Add wishlist module or remove/update wishlist frontend integration
- Add category controller endpoints if category management is required by the admin UI
- Add migrations instead of relying on `DB_SYNCHRONIZE=true`
- Add seed scripts for development data
- Add request/response examples to Swagger decorators
- Add CI workflow for lint, test and build
- Add production deployment documentation

## License

This project is currently marked as:

```txt
UNLICENSED
```
