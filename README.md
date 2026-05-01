# Automation API Testing

A comprehensive API testing suite using Jest and Axios for automated testing of authentication and user endpoints.

## Project Overview

This project provides automated tests for:
- **Authentication Tests** - User registration and login validation
- **Protected Endpoints** - Authorization and token validation
- **Password Reset** - Password reset request and verification flows

## Prerequisites

- Node.js (v14 or higher)
<<<<<<< HEAD
- npm 
=======
- npm or yarn
>>>>>>> 339e6f5c31a6f982a827a94e0956632c3e5df854
- Access to a target API with auth endpoints

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Automation\ API\ testing
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://your-api-url.com
EMAIL=test@example.com
PASSWORD=your-test-password
```

## Project Structure

```
├── tests/
│   ├── auth.test.js              # Authentication tests (register, login)
│   ├── users.test.js             # Protected endpoint tests
│   └── other-endpoints.test.js   # Password reset endpoint tests
├── utils/
│   ├── auth.js                   # Authentication helper functions
│   └── emailGenerator.js         # Email generation utility
├── jest.config.js                # Jest configuration
├── package.json                  # Project dependencies
└── .env                          # Environment variables (not tracked in git)
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests with verbose output:
```bash
npm run test:verbose
```

### Run tests with coverage:
```bash
npm run test:coverage
```

## Test Coverage

The test suite includes:

### Authentication Tests (`auth.test.js`)
- ✅ Register with valid credentials
- ✅ Register with empty fields
- ✅ Register with invalid email format
- ✅ Register with existing email
- ✅ Register with empty password
- ✅ Login with valid credentials
- ✅ Login with invalid password

### User/Protected Endpoints (`users.test.js`)
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

## Dependencies

- **axios**: ^1.6.0 - HTTP client for API requests
- **dotenv**: ^16.3.1 - Environment variable management
- **jest**: ^29.7.0 - Testing framework
- **@jest/globals**: ^30.3.0 - Jest global utilities

## Utilities

### `getToken()` - [utils/auth.js](utils/auth.js)
Authenticates using provided credentials and returns an access token.

**Features:**
- Handles multiple token response formats (token, data.token, accessToken, data.accessToken)
- Proper error handling for failed login attempts

### `generateRandomEmail()` - [utils/emailGenerator.js](utils/emailGenerator.js)
Generates random email addresses for testing registration.

**Returns:** `pams{randomNumber}@gmail.com`

## Configuration

### Jest Config (`jest.config.js`)
- **Test Environment**: Node.js
- **Test Timeout**: 30 seconds
- **Max Workers**: 50% of available cores
- **Verbose**: Enabled for detailed output

## Troubleshooting

### Tests fail with "Base URL is undefined"
Ensure your `.env` file is properly configured with all required variables.

### Token-related errors
Verify that:
- Your API credentials in `.env` are correct
- The API is accessible and running
- The token response format matches one of the expected formats in `utils/auth.js`

### Connection timeouts
- Check if the API endpoint is reachable
- Increase `testTimeout` in `jest.config.js` if needed
- Verify network connectivity

## Notes

- The `.env` file should never be committed to version control (included in `.gitignore`)
- Tests use random email generation for registration tests
- All tests support error handling for various HTTP status codes

## License

ISC

## Author

Pams
