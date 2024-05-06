import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given('I am on the {string} page', (url) => {
  cy.visit(url)
})

When('I click on the {string} link', (pathname) => {
  cy.get(pathname).click()
})

Then('I should see the {string} title in the {string} element', (header, selector) => {
  cy.get(selector).should('have.text', header)
})

Then('the element {string} should containg text', (title) => {
  cy.get(title).should('not.have.text', "")
});