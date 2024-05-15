import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"



When('I fill in bid {string} with {string}', (fieldId, value) => {
  cy.intercept('GET', '/api/bids/max/test-game').as('getMaxBid');
  cy.wait('@getMaxBid');
  cy.get(`#${fieldId}`).type(value);
});


 Then('I should see, in the top entry of the HIGH SCORES list, {string} in the Player column and {string} in the Bid column of the element {string}', (username, amount, selector) => {
  cy.wait(3000)
  cy.get(selector).should('contain', username).and('contain', amount)
})
