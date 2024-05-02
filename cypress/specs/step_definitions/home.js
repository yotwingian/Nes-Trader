import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('I am on the {string} page', (url) => {
  cy.visit(url)
})

When('When I click on the {string} link', (pathname) => {
  cy.get(`[href="${pathname}"]`).click()
})

Then('I should see the {string} header', (header) => {
  cy.get('.main-h1').should('have.text', header)
  cy.get('.main-h1-2').should('have.text', header)
  cy.get('.main-h1-3').should('have.text', header)
})


