# FloWrestling Test Suite

This repository contains automated tests for the FloWrestling website, specifically focusing on the EIWA Championship event page functionality.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FloSports_Assignment
```

2. Install dependencies:
```bash
npm install
```

This will install Cypress and all other required dependencies.

## Running Tests

Run the tests in headless mode using:

```bash
npx cypress run
```

This command is suitable for:
- Continuous Integration
- Command line execution
- Automated testing

## Test Structure

The test suite includes the following test categories:

- Basic Site Accessibility
- Page Content Verification
- Event Information
- Navigation & Tab Validation
- Event Filters Testing
- Search Functionality
- Video Streaming

## Configuration

The test configuration is located in `cypress.config.js`. Key settings include:
- Page load timeout: 60 seconds
- Default command timeout: 10 seconds
- Viewport size: 1280x720
- Retry attempts: 2 for run mode, 1 for open mode

## Troubleshooting

If you encounter issues:

1. Ensure all dependencies are installed correctly
2. Check your internet connection
3. Verify the website is accessible
4. Try clearing the Cypress cache:
```bash
npx cypress cache clear
```

## Contributing

1. Create a new branch for your feature
2. Write your tests
3. Run the test suite
4. Submit a pull request
