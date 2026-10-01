# Restonet Architecture

## 1. System Context

Restonet is composed of a browser-based Angular application and a Spring Boot backend.

~~~mermaid
flowchart LR
    USER[Customer] --> FRONT[Angular 17 Frontend]
    FRONT --> BACK[Spring Boot REST API]
    BACK --> ORACLE[(Oracle Database)]
    BACK --> SMTP[SMTP Email Service]
~~~

The frontend is responsible for the user interface and HTTP communication. The backend contains authentication, business logic, persistence and email-related operations.

## 2. Application Architecture

The backend follows a layered architecture.

~~~mermaid
flowchart TB
    C[REST Controllers]
    S[Services]
    R[Spring Data JPA Repositories]
    D[(Oracle Database)]

    C --> S
    S --> R
    R --> D

    C --> SEC[Spring Security / JWT]
    S --> MAIL[Spring Mail]
~~~

### Controller layer

Controllers expose HTTP endpoints and translate HTTP requests into application operations.

Examples include:
- `AuthRestController`
- `ClientRestController`
- `ReservationRestController`
- `VentesRestController`
- `SuggestionRestController`
- `PasswordRestController`

Additional controllers handle restaurant sections, meals, reservation details and customer categories.

### Service layer

Services contain reusable application logic and coordinate repositories and other backend components.

### Repository layer

Spring Data JPA repositories provide persistence operations for the domain entities.

### Entity layer

JPA entities represent the application's persistent domain model. The repository contains entities for customers, articles, sections, services, sales, suggestions, reservations and related restaurant data.

## 3. Authentication Flow

The application uses JWT-based authentication.

~~~mermaid
sequenceDiagram
    participant U as User
    participant F as Angular Frontend
    participant A as Auth API
    participant S as Security Layer
    participant DB as Oracle

    U->>F: Enter credentials
    F->>A: POST /auth/login
    A->>DB: Validate customer
    DB-->>A: Customer data
    A-->>F: JWT token
    F->>F: Store token
    F->>S: Request + Bearer token
    S->>S: Validate JWT
    S-->>F: Authorized response
~~~

The frontend sends the token in the `Authorization` header for protected operations.

## 4. Frontend Request Flow

~~~mermaid
sequenceDiagram
    participant UI as Angular Component
    participant SV as Angular Service
    participant API as Spring Boot API
    participant DB as Oracle

    UI->>SV: User action
    SV->>API: HTTP request
    API->>DB: Persistence operation
    DB-->>API: Result
    API-->>SV: JSON response
    SV-->>UI: Observable result
    UI-->>UI: Update view
~~~
## 5. Data Access

The backend uses:
- Spring Data JPA
- Hibernate
- Oracle JDBC driver

The configured datasource points to an Oracle database. Hibernate is configured with schema update behavior in the current project configuration.

## 6. Email

The backend uses Spring Boot Mail with SMTP configuration for email-related features such as password/account workflows.

Credentials are expected through environment variables.

## 7. Frontend Structure

The Angular project contains application areas for authentication, customer pages and reusable services.

Representative frontend services include services for:
- Reservations
- Sales/movements
- Suggestions
- Reservation meals/details

Authentication tokens are used when calling protected backend endpoints.

## 8. Transport Security

The backend is configured to support SSL using a JKS keystore.

The keystore password is supplied through an environment variable.

The frontend development script also configures HTTPS and uses local certificate/key files.

## 9. Architectural Characteristics

### Current architecture
- Single Spring Boot backend
- Single Angular frontend
- Oracle relational database
- REST/JSON communication
- JWT authentication
- Layered backend structure
- JPA/Hibernate persistence

### Not currently documented as implemented

The repository documentation does not claim the following unless they are added to the codebase:
- Microservices
- Eureka service discovery
- Spring Cloud Gateway
- Spring Cloud Config Server
- Kafka/event-driven architecture
- Container orchestration

These can be future architectural improvements, but they are not part of the current documented implementation.