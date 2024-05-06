import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I type {string} in the search input', (searchTerm) => {
  cy.get('input').type(searchTerm);
});

Then('I should see only items with titles containing {string}', (searchTerm) => {
  cy.get('.items-container section').each(($item) => {
    cy.wrap($item).within(() => {
      cy.get('h5').should('contain', searchTerm, { matchCase: false })
    });
  });
});

