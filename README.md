# RestoNet

**A full-stack web application for corporate meal reservations and cafeteria operations.**

RestoNet modernizes a legacy PHP4 application into a web solution built with **Angular 17**, **Java 23 / Spring Boot**, and **Oracle Database**. It supports employee meal reservations and gives users access to account information, consumption history, sales movements, and suggestions.

> Project developed during a final-year internship at Nexpublica. This repository contains the application source code; the accompanying project report provides additional context and interface illustrations.

## At a glance

| | |
|---|---|
| **Domain** | Corporate catering / employee meal management |
| **Frontend** | Angular 17 · TypeScript · Bootstrap |
| **Backend** | Java 23 · Spring Boot 3.2.4 |
| **API** | Spring MVC · REST · JSON |
| **Persistence** | Spring Data JPA · Hibernate |
| **Database** | Oracle Database |
| **Authentication** | Spring Security · JWT |
| **Email** | Spring Boot Mail / SMTP |

## Why RestoNet?

The project addresses the modernization of a legacy restaurant-management application. The goal was to make day-to-day meal operations more accessible through a web interface while separating the user interface from backend business logic.

The solution focuses on:
- Simplifying employee meal reservations.
- Providing access to account and consumption information.
- Supporting financial traceability through balances and sales/movement history.
- Structuring backend code into maintainable application layers.
- Protecting access through token-based authentication.

## Main features

### Employee experience
- **Authentication:** sign in with a personal identifier and password.
- **Account information:** consult account details and balance-related information.
- **Meal reservations:** select a restaurant/section, consult availability and manage reservations.
- **Meal details:** view information associated with a selected meal and reservation.
- **Consumption history:** consult sales and movement history.
- **Suggestions:** submit feedback or suggestions related to the application.
- **Password recovery:** request account recovery using an identifier or email.

### Application capabilities
- REST endpoints consumed by the Angular application.
- Persistence through JPA entities and Spring Data repositories.
- JWT-based authentication and protected requests.
- Email functionality through SMTP.
- A modular frontend with dedicated components and services.

## Application preview

The project report contains screenshots of the sign-in, password recovery, account information, reservation calendar, meal details, reservation history, movements, and suggestion workflows.

To display the screenshots in this README, add the image files from the accompanying `docs/screenshots/` archive to this repository. The gallery can then use relative image paths such as `docs/screenshots/login.jpg`.

## Architecture

RestoNet uses a **separated frontend/backend architecture**. The Angular application communicates with a Spring Boot REST API, which applies business logic and accesses Oracle through Spring Data JPA.

~~~mermaid
flowchart LR
    U[Employee / User] --> FE[Angular 17]
    FE -->|REST / JSON over HTTPS| API[Spring Boot REST API]
    API --> AUTH[Spring Security + JWT]
    API --> SVC[Business Services]
    SVC --> REPO[Spring Data JPA]
    REPO --> DB[(Oracle Database)]
    SVC --> EMAIL[SMTP Email]
~~~

The backend is organized into controllers, services, repositories, entities, DTOs and security-related components. This is a layered application; it is not documented as a microservices system.

See [Architecture documentation](docs/ARCHITECTURE.md) for more detail.

## Repository structure

~~~text
Restonet-app/
├── RestonetBackend_version2/
│   └── RestonetBackend_version2/
│       ├── src/main/java/ma/inetum/restonetbackend/
│       │   ├── controllers/
│       │   ├── dto/
│       │   ├── entities/
│       │   ├── repositories/
│       │   ├── services/
│       │   ├── security/
│       │   ├── filters/
│       │   └── utils/
│       ├── src/main/resources/
│       └── pom.xml
├── reco-administrateurFront_version2/
│   └── reco-administrateurFront_version2/
│       ├── src/app/
│       ├── src/assets/
│       └── package.json
└── docs/
    ├── API.md
    └── ARCHITECTURE.md
~~~

## Getting started

### Prerequisites

- Java 23
- Maven (or the included Maven wrapper)
- Node.js and npm
- Oracle Database access
- Runtime configuration for database, mail and SSL, where applicable

### Backend

From `RestonetBackend_version2/RestonetBackend_version2`:

~~~bash
./mvnw spring-boot:run
~~~

On Windows:

~~~powershell
.`mvnw.cmd` spring-boot:run
~~~

To build the backend:

~~~bash
./mvnw clean package
~~~

The backend needs a reachable Oracle database and the required runtime configuration before it can start successfully.

### Frontend

From `reco-administrateurFront_version2/reco-administrateurFront_version2`:

~~~bash
npm install
npm run build
~~~

The project also defines a development script configured for HTTPS on port 9090. Check the scripts in `package.json` for the exact command before starting the development server.

## Configuration and security

Sensitive values must be provided by the runtime environment, not committed to Git. The backend configuration uses these variable names:

~~~text
DB_USERNAME
DB_PASSWORD
MAIL_USERNAME
MAIL_PASSWORD
SSL_KEYSTORE_PASSWORD
~~~

Set the variables in the environment where the backend runs. Never add real credentials, JWT signing secrets, private keys, keystores, or personal data to the repository.

## Documentation

- [REST API reference](docs/API.md)
- [System architecture](docs/ARCHITECTURE.md)

## Scope and notes

This repository documents the implementation and project scope reflected in the source code and internship report. External integrations and future enhancements are not presented as completed features. Performance objectives described in the report should not be interpreted as measured production results unless supported by reproducible benchmarks.

## Author

**Zineb Nafil** · Full-Stack Java Developer

[GitHub profile](https://github.com/raidenshogen)
