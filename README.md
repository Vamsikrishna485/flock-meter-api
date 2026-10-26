# Urja Meter Ops – API Wrapper Service

A Node.js and Express API wrapper for the legacy Urja Meter Ops portal.

**GitHub Repository:** [Vamsikrishna485/flock-meter-api](https://github.com/Vamsikrishna485/flock-meter-api)

---

## Project Overview

The Urja Meter Ops portal is used by utility operations staff to access smart meter information and energy consumption readings.

The portal does not provide a documented public API for external consumers. This project aims to provide a clean REST API layer that retrieves meter information from the existing portal and returns structured JSON responses.

The service follows a Backend-for-Frontend (BFF) approach, separating the consumer-facing API from the legacy portal.

### Project Objectives

- Implement programmatic authentication with the portal.
- Manage portal session cookies.
- Retrieve meter energy consumption data.
- Retrieve meter geographical information.
- Expose clean REST endpoints.
- Document API behavior and assumptions.

## Technologies Used

- Node.js
- Express.js
- Axios
- JavaScript
- dotenv
- HTTP / REST APIs
- JSON

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check whether the API service is running |
| GET | `/api/meters/:id/energy` | Retrieve meter energy consumption data |
| GET | `/api/meters/:id/geo` | Retrieve meter geographical information |

### Example Request

```http
GET http://localhost:3000/api/meters/J100000/energy
```

### Example Success Response

```json
{
  "success": true,
  "meterId": "J100000",
  "data": {
    "data": [
      {
        "timestamp": "23/06/2026 23:30",
        "kwh": "48438.74",
        "kvah": "52313.84",
        "voltR": "226"
      }
    ]
  }
}
```

*Note: This is an illustrative response based on a portal reading observed during development. Actual response fields and readings depend on the portal.*

### Example Error Response

```json
{
  "success": false,
  "message": "Unable to fetch meter energy data"
}
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vamsikrishna485/flock-meter-api.git
```

### 2. Navigate to the Project

```bash
cd flock-meter-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
PORTAL_URL=https://urja-ops.flockenergy.tech
PORTAL_EMAIL=your_portal_username
PORTAL_PASSWORD=your_portal_password
```

Replace the portal username and password with the credentials provided for the assignment.

**Security:** Never commit `.env` or portal session cookies to GitHub.

### 5. Start the Server

```bash
node server.js
```

The API service should run at:

```text
http://localhost:3000
```

## Sample API Requests

### Check API Status

```bash
curl http://localhost:3000/
```

### Retrieve Meter Energy Data

```bash
curl http://localhost:3000/api/meters/J100000/energy
```

### Retrieve Meter Geographical Data

```bash
curl http://localhost:3000/api/meters/J100000/geo
```

## Project Structure

```text
flock-meter-api/
│
├── server.js
├── portal.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
├── PROTOCOL.md
└── openapi.json
```

## Authentication and Session Management

The service is designed to authenticate with the existing portal using the assignment-provided operator credentials.

The portal uses session-based authentication.

The intended authentication workflow is:

1. Submit login credentials to the portal.
2. Receive the portal authentication response.
3. Capture and maintain the session cookie.
4. Use the authenticated session to request meter information.
5. Return the retrieved data through the wrapper API.

Portal authentication and session behavior are documented in `PROTOCOL.md`.

## Assumptions

- Meter identifiers are supplied by API consumers.
- The portal provides meter energy and geographical information through its existing endpoints.
- Portal authentication is required to access protected meter information.
- The wrapper operates in read-only mode.
- Portal response structures may change independently of the wrapper API.
- Portal credentials are configured through environment variables.

## Design Decisions

### Node.js and Express

Express was selected to implement lightweight REST endpoints with straightforward request handling.

### Axios

Axios is used to make HTTP requests to the portal and retrieve its responses.

### API Wrapper

The wrapper provides a separate API interface instead of requiring consumers to interact directly with the portal.

### Environment Configuration

Environment variables are used to separate credentials and configuration from application source code.

### JSON Responses

The API returns JSON responses to make the retrieved information easier for downstream applications to consume.

## Trade-offs

- The wrapper depends on the existing portal's authentication and endpoint behavior.
- Portal changes may require updates to the integration.
- Session expiration and authentication failures need appropriate handling.
- The current implementation focuses on the essential meter energy and geographical endpoints.
- Automated testing and advanced caching are not included in the initial implementation.

## Intentionally Skipped

The following features are outside the initial implementation scope:

- Automated unit and integration tests.
- Meter network hierarchy reconstruction.
- Advanced filtering and pagination.
- Background session renewal.
- Rate limiting.
- Persistent caching.
- Bulk meter retrieval.

## Future Improvements

With additional development time, the following improvements could be implemented:

1. Add automated tests using Jest and Supertest.
2. Implement session expiration detection and automatic reauthentication.
3. Add caching to reduce repeated portal requests.
4. Add meter network hierarchy endpoints.
5. Add filtering and pagination.
6. Improve error handling and validation.
7. Add structured logging.
8. Add bulk meter data retrieval.

## API Documentation

- [PROTOCOL.md](./PROTOCOL.md) – Portal authentication, endpoints, data behavior, and integration details.
- [openapi.json](./openapi.json) – OpenAPI 3.x specification for the wrapper API.

## Reflection

### 1. What assumptions did you make?

I assumed that the existing portal could be accessed through its internal HTTP endpoints and that the portal's authentication mechanism could be reused to retrieve meter information programmatically.

I also assumed that meter identifiers supplied by consumers would correspond to valid identifiers in the portal.

### 2. What would you improve with more time?

I would improve authentication reliability, add automated tests, implement caching, and provide additional endpoints for meter hierarchy information.

I would also improve error handling so that authentication failures, invalid meter identifiers, and portal service errors are returned with appropriate API status codes.

### 3. What was the most challenging part?

The most challenging part was understanding the portal's authentication mechanism and how its session cookies are used when accessing protected meter endpoints.

### 4. What did you learn?

I learned how to inspect HTTP requests, understand existing portal endpoints, structure an Express API, and design a wrapper service that separates an external API interface from a legacy application.

---

## Author

**Vamsi Krishna**

GitHub: [Vamsikrishna485](https://github.com/Vamsikrishna485)

Repository: [flock-meter-api](https://github.com/Vamsikrishna485/flock-meter-api)
