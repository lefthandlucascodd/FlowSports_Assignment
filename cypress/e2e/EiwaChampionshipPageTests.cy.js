// Disable uncaught exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

import EiwaChampionshipPage from '../pages/EiwaChampionshipPage'

const DEFAULT_TIMEOUT = 10000
const PAGE_LOAD_TIMEOUT = 60000

describe('Flow Wrestling Tests', () => {
  const eiwaPage = new EiwaChampionshipPage()

  describe('Basic Site Accessibility', () => {

    it('should verify EIWA Championship page is reachable', () => {
      cy.request({
        url: eiwaPage.url,
        failOnStatusCode: false,
        timeout: PAGE_LOAD_TIMEOUT
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 301, 302])
      })
    })
  })

  describe('Page Content Verification', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should verify page title and main elements', () => {
      eiwaPage.verifyPageTitle()
      eiwaPage.verifyEventBanner()
      eiwaPage.verifyEventDate()
    })

    it('should verify navigation elements', () => {
      eiwaPage.clickResultsTab()
      eiwaPage.clickNewsTab()
    })
  })

  describe('Event Information', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should display event details', () => {
      // Check for basic event information
      cy.contains('EIWA', { timeout: DEFAULT_TIMEOUT }).should('be.visible')
      cy.contains('Championship', { timeout: DEFAULT_TIMEOUT }).should('be.visible')
      cy.contains('2025', { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    })
  })

  describe('Navigation & Tab Validation', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should verify key navigation links and tab switching', () => {
      // Wait for navigation to be ready
      cy.get('nav').should('be.visible')
      
      // Check Results tab
      cy.contains('Results').click()
      cy.url().should('include', '/results')
      
      // Check News tab
      cy.contains('News').click()
      cy.url().should('include', '/news')
      
      // Verify content updates
      cy.get('main').should('be.visible')
    })
  })

  describe('Event Filters Testing', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should filter by team', () => {
      eiwaPage.selectTeam('Penn State')
    })

    it('should filter by weight class', () => {
      eiwaPage.selectWeightClass('125')
    })

    it('should filter by round', () => {
      eiwaPage.selectRound('Quarterfinals')
    })

    it('should reset all filters', () => {
      eiwaPage.selectTeam('Penn State')
      eiwaPage.selectWeightClass('125')
      eiwaPage.clearAllFilters()
    })
  })

  describe('Search Functionality', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should search for a wrestler', () => {
      eiwaPage.searchWrestler('John Smith')
    })

    it('should handle no results found', () => {
      eiwaPage.searchWrestler('Random Wrestler')
      eiwaPage.verifyNoResults()
    })
  })

  describe('Video Streaming', () => {
    beforeEach(() => {
      eiwaPage.load_page()
    })

    it('should load and play videos correctly', () => {
      eiwaPage.verifyVideoSection()
      eiwaPage.playFirstVideo()
      eiwaPage.verifyVideoDetails()
    })
  })
}) 