# Gestion Cantine Backend

<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective"/></a>

## Description

This project is a backend application for managing a canteen system. It is built using the NestJS framework and provides various functionalities such as user management, dish management, and rating system for dishes. The application uses MySQL as the database and includes JWT-based authentication and role-based access control.

## Features

- **User Management**: Create, update, delete, and manage users with different roles (admin, student).
- **Dish Management**: Create, update, delete, and manage dishes, including daily menu selection.
- **Rating System**: Users can rate dishes and provide feedback. The system calculates average ratings and displays top feedbacks.
- **Authentication**: JWT-based authentication with login functionality.
- **Role-Based Access Control**: Different access levels for admin and student roles.
- **Swagger Documentation**: API documentation available at `/api`.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **MySQL**: A relational database management system.
- **JWT**: JSON Web Tokens for secure authentication.
- **Swagger**: API documentation and testing.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/gestion-cantine-backend.git
   cd gestion-cantine-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database:
   - Create a MySQL database named `GestionCantine`.
   - Import the `gestioncantine.sql` file to set up the database schema and initial data.

4. Configure environment variables:
   - Create a `.env` file in the root directory and add the following variables:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=root
     DB_PASSWORD=
     DB_DATABASE=GestionCantine
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRATION=1d
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     ```

### Running the Application

1. Start the application:
   ```sh
   npm run start
   ```
2.Access the API documentation at http://localhost:3000/api. ( Swagger )


   
