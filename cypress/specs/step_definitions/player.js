import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then("I should see items in Player Bids if it's not empty", () => {
  cy.get('#my-bids').then(($bids) => {
    if ($bids.find('section').length > 0) {
      cy.log('Items found!');
      cy.get('#my-bids section').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('h5').should('not.have.text', "");
        });
      });
    } else {
      cy.get('#my-bids').should('be.empty')
      cy.log('No games found!');
    }
  });
});

Then("I should see items in Player Items if it's not empty", () => {
  cy.get('#my-items').then(($items) => {
    if ($items.find('section').length > 0) {
      cy.log('Items found!');
      cy.get('#my-items section').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('h5').should('not.have.text', "");
        });
      });
    } else {
      cy.get('#my-items').should('be.empty')
      cy.log('No games found!');
    }
  });
});
