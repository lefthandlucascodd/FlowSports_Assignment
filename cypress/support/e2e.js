// Import commands.js using ES2015 syntax:
import './commands'

// Import Testing Library commands
import '@testing-library/cypress/add-commands'

// Import XPath support
import 'cypress-xpath'

// Hide XHR requests from command log
const app = window.top;
if (app) {
  app.console.log = () => {};
}
