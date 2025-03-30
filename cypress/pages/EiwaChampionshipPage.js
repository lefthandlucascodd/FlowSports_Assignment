const DEFAULT_TIMEOUT = 10000
const PAGE_LOAD_TIMEOUT = 60000

class EiwaChampionshipPage {
    // Selectors
    selectors = {
        // Page elements
        pageTitle: '.header-title',
        eventDate: '.event-date',
        eventBanner: '.event-banner',
        
        // Navigation
        navMenu: 'nav',
        resultsTab: '.results-tab',
        newsTab: '.news-tab',
        
        // Filters
        teamFilter: '.team-filter',
        weightClassFilter: '.weight-class-filter',
        roundFilter: '.round-filter',
        clearFiltersButton: '.clear-filters',
        
        // Search
        searchInput: '.search-input',
        noResultsMessage: '.no-results-message',
        
        // Results
        resultsTable: '.wrestler-list',
        wrestlerName: '.wrestler-name',
        
        // Video
        videoSection: '.video-section',
        videoPlayer: '.video-player',
        videoDetails: '.video-details'
    }

    // Constructor
    constructor() {
        this.url = 'https://www.flowrestling.org/events/12932757-2025-eiwa-championship'
    }

    // Navigation methods
    load_page() {
        // Visit the page
        cy.visit(this.url, {
            timeout: PAGE_LOAD_TIMEOUT,
            failOnStatusCode: false
        })
        
        // Wait for the page to be ready
        cy.document().should('have.property', 'readyState', 'complete')
        
        // Log the page title for debugging
        cy.title().then(title => {
            cy.log('Page title:', title)
        })
        
        // Log the URL for debugging
        cy.url().then(url => {
            cy.log('Current URL:', url)
        })
        
        // Log the page content for debugging
        cy.get('body').then($body => {
            cy.log('Page content:', $body.html().substring(0, 500))
        })
    }

    // Page verification methods
    verifyPageTitle() {
        cy.title({ timeout: DEFAULT_TIMEOUT }).should('include', '2025 EIWA Championship')
    }

    verifyEventBanner() {
        cy.get(this.selectors.eventBanner, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }

    verifyEventDate() {
        cy.get(this.selectors.eventDate, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }

    // Navigation methods
    clickResultsTab() {
        cy.get(this.selectors.resultsTab, { timeout: DEFAULT_TIMEOUT }).click()
        cy.url().should('include', '/results')
    }

    clickNewsTab() {
        cy.get(this.selectors.newsTab, { timeout: DEFAULT_TIMEOUT }).click()
        cy.url().should('include', '/news')
    }

    // Filter methods
    selectTeam(teamName) {
        cy.get(this.selectors.teamFilter, { timeout: DEFAULT_TIMEOUT }).select(teamName)
        cy.url().should('include', 'team=')
    }

    selectWeightClass(weight) {
        cy.get(this.selectors.weightClassFilter, { timeout: DEFAULT_TIMEOUT }).select(weight)
        cy.url().should('include', `weight=${weight}`)
    }

    selectRound(round) {
        cy.get(this.selectors.roundFilter, { timeout: DEFAULT_TIMEOUT }).select(round)
        cy.url().should('include', `round=${round}`)
    }

    clearAllFilters() {
        cy.get(this.selectors.clearFiltersButton, { timeout: DEFAULT_TIMEOUT }).click()
        cy.url().should('not.include', 'team=')
        cy.url().should('not.include', 'weight=')
        cy.url().should('not.include', 'round=')
    }

    // Search methods
    searchWrestler(name) {
        cy.get(this.selectors.searchInput, { timeout: DEFAULT_TIMEOUT }).type(name)
        cy.get(this.selectors.resultsTable, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }

    verifyNoResults() {
        cy.get(this.selectors.noResultsMessage, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }

    // Video methods
    verifyVideoSection() {
        cy.get(this.selectors.videoSection, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }

    playFirstVideo() {
        cy.get(this.selectors.videoPlayer, { timeout: DEFAULT_TIMEOUT }).first().click()
    }

    verifyVideoDetails() {
        cy.get(this.selectors.videoDetails, { timeout: DEFAULT_TIMEOUT }).should('be.visible')
    }
}

export default EiwaChampionshipPage 