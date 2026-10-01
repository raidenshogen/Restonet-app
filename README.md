# Restonet

Restonet is a full-stack restaurant management and reservation application built with an Angular frontend and a Spring Boot REST API backed by Oracle Database.

## Overview

The application provides customer-facing restaurant features including authentication, account management, reservations, sales/movements, suggestions, and meal/reservation-related operations.

The project is organized as two main applications:
- **Frontend:** Angular 17
- **Backend:** Spring Boot 3.2.4 / Java 23
- **Database:** Oracle Database
- **Authentication:** JWT-based authentication with Spring Security
- **Email:** Spring Mail / Gmail SMTP
- **ORM:** Spring Data JPA / Hibernate
- **UI:** Angular with Bootstrap

## Architecture

~~~mermaid
flowchart LR
    U[Customer / User] --> FE[Angular 17 Frontend]
    FE -->|HTTPS REST / JSON| API[Spring Boot REST API]
    API --> SEC[Spring Security + JWT]
    API --> SVC[Service Layer]
    SVC --> REP[Spring Data JPA Repositories]
    REP --> DB[(Oracle Database)]
    SVC --> MAIL[SMTP Mail Service]
~~~

This is a **frontend/backend application**, not a microservices architecture. The backend exposes REST endpoints consumed by the Angular application.

## Main Features

### Authentication and account management
- User login
- JWT token generation and validation
- Password change
- Password reset flows
- Customer profile and account information
- Email-based operations

### Reservations
- Create reservations
- Retrieve reservations
- Reservation-related counts
- Meal/reservation details

### Sales and movements
- Retrieve sales for the current user
- Create movements
- Ticket-related counts

### Suggestions
- Retrieve suggestions for a customer
- Create suggestions
- Suggestion counts

### Restaurant data
The backend also contains domain entities and controllers for articles, sections, services, customer categories, payment modes, meals, reservations and related details.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17.2 |
| Language | TypeScript 5.3 |
| UI | Bootstrap 5.3 |
| Backend | Spring Boot 3.2.4 |
| Language | Java 23 |
| Security | Spring Security + JJWT 0.11.5 |
| Persistence | Spring Data JPA / Hibernate |
| Database | Oracle Database |
| Email | Spring Boot Mail |
| Build | Maven / Angular CLI |
| Testing | JUnit / Spring Boot Test |

## Project Structure

~~~text
Restonet-app/
├── RestonetBackend_version2/
│   └── RestonetBackend_version2/
│       ├── src/main/java/
│       │   └── ma/inetum/restonetbackend/
│       │       ├── controllers/
│       │       ├── entities/
│       │       ├── repositories/
│       │       ├── services/
│       │       ├── security/
│       │       ├── filters/
│       │       ├── utils/
│       │       └── dto/
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
│
├── reco-administrateurFront_version2/
│   └── reco-administrateurFront_version2/
│       ├── src/app/
│       │   ├── Authentification/
│       │   ├── client/
│       │   └── services/
│       └── package.json
│
└── docs/
    ├── ARCHITECTURE.md
    └── API.md
~~~

## Security

Authentication is implemented with JWT and Spring Security. The frontend stores the received JWT and sends it with protected API requests using the `Authorization: Bearer <token>` header.

Database, mail and SSL credentials are configured through environment variables rather than hardcoded values.

> Never commit real credentials, private keys, keystores or JWT signing secrets to the repository.

## Configuration

The backend expects environment variables for sensitive configuration:

~~~text
DB_USERNAME
DB_PASSWORD
MAIL_USERNAME
MAIL_PASSWORD
SSL_KEYSTORE_PASSWORD
~~~

The actual values must be supplied by the runtime environment and must not be committed to Git.

## Running the Backend

From the backend directory:

~~~bash
mvn spring-boot:run
~~~

Or build the application:

~~~bash
mvn clean package
~~~

The backend requires:
- Java 23
- Maven
- An accessible Oracle Database
- Required environment variables
- SSL keystore configuration when HTTPS is enabled

## Running the Frontend

From the Angular project directory:

~~~bash
npm install
npm run build
~~~

The repository currently defines an Angular development command using HTTPS on port **9090**.

## API Documentation

See [docs/API.md](docs/API.md) for the documented REST endpoints.

## Architecture Documentation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system architecture, responsibilities and request flow.

## Project Status

This documentation describes the implementation visible in the repository. Features or architectural improvements that are not currently implemented are intentionally not presented as existing functionality.