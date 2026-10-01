# Restonet REST API

This document summarizes the REST endpoints identified in the backend controllers.

 > Authentication details and exact request/response DTO schemas should be verified against the corresponding controller and DTO classes before treating this document as a formal API contract.

## Authentication

Base path: `/auth`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Authenticate a customer and obtain a JWT |
| POST | `/auth/change-password` | Change the authenticated user's password |

## Customer Management

Base path: `/clients`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/clients/infosCompte` | Retrieve customer account information |
| PUT/POST | `/clients/changeEmail` | Change customer email |
| PUT/POST | `/clients/changeImage` | Change customer image |
| POST | `/clients/uploadImage` | Upload a customer image |
| GET/POST | `/clients/provision` | Customer provisioning operation |

The exact HTTP method and payload should be checked against the controller before using this table as an external API specification.

## Reservations

Base path: `/api/reservations`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/reservations` | Create a reservation |
| GET | `/api/reservations/reservé` | Retrieve reservation data |
| GET | `/api/reservations/facture-count/{clientId}` | Retrieve invoice-related count for a client |
## Sales and Movements

Base path: `/ventes`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/ventes/user` | Retrieve sales for the current user |
| POST | `/ventes/mouvements` | Create a movement |
| GET | `/ventes/ticket-count/{clientId}` | Retrieve ticket count for a client |
## Suggestions

Base path: `/suggestion`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/suggestion/user-suggestions` | Retrieve suggestions for a user |
| POST | `/suggestion/create` | Create a suggestion |
| GET | `/suggestion/suggestion-count/{clientId}` | Retrieve suggestion count |
## Password Reset

Base path: `/ResetPassword`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/ResetPassword/reset-password-by-id` | Reset password using an identifier |
| POST | `/ResetPassword/reset-password-by-email` | Reset password using an email |
## Additional Domain Endpoints

The backend also contains controllers for:
- Sections
- Meals
- Meal/reservation relationships
- Reservation details
- Customer categories
- Other restaurant domain data

These endpoints should be documented from their controller classes before adding exact paths to this API reference.

## Authentication Header

Protected requests use the standard Bearer token format:

~~~http
Authorization: Bearer <JWT>
~~~

The frontend obtains the token during login and includes it when calling protected backend operations.

## API Design Notes

The API follows a REST-oriented controller structure using Spring MVC annotations such as:
- `@RestController`
- `@RequestMapping`
- `@GetMapping`
- `@PostMapping`

Responses are returned as JSON through Spring's HTTP response handling.

## Security Note

Never place real passwords, JWT signing secrets, API keys, mail credentials or private keys in API examples or documentation.