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

Then('the element {string} should contain text', (title) => {
  cy.get(title).should('not.have.text', "")
});

When('I am logged in as {string} with password {string}', (username, password) => {
  cy.login(username, password);
});