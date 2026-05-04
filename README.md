
# Automation Testing API - PAMS

![CI](https://github.com/sundayilori6-ops/Automation_Testing_API_Pams/actions/workflows/ci.yml/badge.svg)

## Overview
Automated API test suite for the Zedu Chat API, built with **Jest** and **Axios**.
Tests cover authentication, user management, and other API endpoints.

- npm

## Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/sundayilori6-ops/Automation_Testing_API_Pams.git
cd Automation_Testing_API_Pams
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Then open `.env` and fill in your values:
```dotenv
BASE_URL=https://api.zedu.chat/api/v1
EMAIL=your_email_here
PASSWORD=your_password_here
```
## Project Structure

Automation_Testing_API_Pams/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI pipeline
├── tests/
│   ├── auth.test.js                  # Authentication endpoint tests
│   ├── users.test.js                 # User management tests
│   └── other-endpoints.test.js       # Password reset endpoint tests
├── utils/
│   ├── auth.js                       # Auth helper utilities
│   └── emailGenerator.js             # Email generation utility
├── .env.example                      # Environment variable template
├── jest.config.js                    # Jest configuration
├── package.json
└── README.md

### 4. Run the tests
```bash
npm test
```

### Run with verbose output
```bash
npm run test:verbose
```

### Run with coverage
```bash
npm run test:coverage
```

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration.

### Pipeline behaviour
- Triggers automatically on every `push` and `pull_request` to `main`
- Sets up Node.js 18 on a clean Ubuntu environment
- Installs dependencies with `npm ci`
- Runs the full Jest test suite
- Generates a **JUnit XML** test report uploaded as a build artifact
- **Pipeline fails if any test fails** — no silent skipping

### Pipeline file
Located at `.github/workflows/ci.yml`

### View pipeline runs
Go to the **Actions** tab on GitHub to see all pipeline runs and logs.

## Test Coverage

### Authentication Tests (`auth.test.js`)
- ✅ Register with valid credentials
- ✅ Register with empty fields
- ✅ Register with invalid email format
- ✅ Register with existing email
- ✅ Register with empty password
- ✅ Login with valid credentials
- ✅ Login with invalid password

### User / Protected Endpoints (`users.test.js`)
- ✅ Access protected endpoint with valid token
- ✅ Access protected endpoint without token
- ✅ Access protected endpoint with malformed token
- ✅ Access protected endpoint with expired token
- ✅ Valid token returns user data

### Password Reset (`other-endpoints.test.js`)
- ✅ Request password reset with registered email
- ✅ Request password reset with unregistered email
- ✅ Verify password reset with invalid token
- ✅ Reset password should not expose token

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASE_URL` | API base URL | Yes |
| `EMAIL` | Test account email | Yes |
| `PASSWORD` | Test account password | Yes |

> In CI, these are stored as **GitHub Actions Secrets** and injected automatically into the pipeline. Never commit your `.env` file.

## Utilities

### `getToken()` — `utils/auth.js`
Authenticates using credentials from `.env` and returns an access token.
Handles multiple token response formats (`token`, `data.token`, `accessToken`, `data.accessToken`).

### `generateRandomEmail()` — `utils/emailGenerator.js`
Generates random email addresses for registration tests.
Returns: `pams{randomNumber}@gmail.com`

## Test Reports

JUnit XML reports are generated on every CI run and uploaded as a downloadable artifact named `jest-junit-report`.

## Troubleshooting

**Tests fail with "Base URL is undefined"**
Ensure your `.env` file is properly configured with all required variables.

**Token-related errors**
- Verify your API credentials in `.env` are correct
- Confirm the API is accessible and running
- Check the token response format matches one of the expected formats in `utils/auth.js`

**Connection timeouts**
- Check if the API endpoint is reachable
- Increase `testTimeout` in `jest.config.js` if needed

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | ^1.6.0 | HTTP client for API requests |
| `dotenv` | ^16.3.1 | Environment variable management |
| `jest` | ^29.7.0 | Testing framework |
| `@jest/globals` | ^30.3.0 | Jest global utilities |
| `jest-junit` | ^16.0.0 | JUnit XML report generation |

## License
ISC

## Author
Pams