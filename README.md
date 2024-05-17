# Application Overview

## Description

This application handles user registration, login, and JWT token validation. It is built using Express and follows clean architecture principles to ensure maintainability and scalability. TypeORM is used for database interactions, providing a robust and flexible ORM solution.

## Features

User Registration: Allows users to create an account by providing necessary details.

User Login: Authenticates users and provides a JWT token for session management.

JWT Token Validation: Validates the JWT token to secure endpoints and ensure only authenticated users can access certain resources.

#### Technology Stack

-   Backend Framework: Express
-   Architecture: Clean Architecture
-   Database ORM: TypeORM
-   Authentication: JSON Web Tokens (JWT)

## Quick Start

### Using Docker Compose

Rename `.env.DEV` to `.env`

Run the following command `docker compose up`

### Using NPM

Install dependencies: `npm install`

Rename `.env.DEV` to `.env`

Configure the environment variables in the .env file. Below are the required variables and their default development values:

| KEY                       | DESCRIPTION            | DEFAULT DEV VALUE |
| ------------------------- | ---------------------- | ----------------- |
| APP_PORT                  | Express app port       | 3001              |
| TYPEORM_POSTGRES_HOST     | Postgres database host | db                |
| TYPEORM_POSTGRES_PORT     | Postgres port          | 5432              |
| TYPEORM_POSTGRES_USERNAME | Database username      | postgres          |
| TYPEORM_POSTGRES_PASSWORD | Database password      | postgres          |
| TYPEORM_POSTGRES_DATABASE | Database name          | postgres          |

Start the application: `npm run dev`
