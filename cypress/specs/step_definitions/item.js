import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

 Then('I should see, in the top entry of the HIGH SCORES list, {string} in the Player column and {string} in the Bid column of the element {string}', (username, amount, selector) => {
  cy.wait(700)
  cy.get(selector).should('contain', username).and('contain', amount)
})
