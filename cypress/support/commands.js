// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document').its('readyState').should('eq', 'complete')
})

// Custom command to check if element is visible and not disabled
Cypress.Commands.add('isVisibleAndEnabled', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .and('not.be.disabled')
  return subject
})

// Custom command to wait for network requests to complete
Cypress.Commands.add('waitForNetworkIdle', () => {
  cy.intercept('**/*').as('networkRequests')
  cy.wait('@networkRequests', { timeout: 10000 })
})

// Custom command to check if element contains text
Cypress.Commands.add('shouldContainText', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).should('contain', text)
  return subject
})

// Custom command to check if URL contains query parameter
Cypress.Commands.add('urlShouldContain', (param, value) => {
  cy.url().should('include', `${param}=${value}`)
})

// Custom command to clear all filters
Cypress.Commands.add('clearAllFilters', () => {
  cy.get('[data-testid="clear-filters"]').click()
  cy.get('[data-testid="team-filter"]').should('have.value', '')
  cy.get('[data-testid="weight-class-filter"]').should('have.value', '')
  cy.get('[data-testid="round-filter"]').should('have.value', '')
}) 