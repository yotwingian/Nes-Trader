import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then('I should see {string} as the title', (title) => {
 cy.get('#h1-mybids').should('have.text', title)
});


Then('I should see only items with titles containing {string}', (searchTerm) => {
  cy.get('.items-container section').each(($item) => {
    if (cy.get('.items-container section').length === 0) {
      cy.log('No games found!')
    } else {
      cy.wrap($item).within(() => {
        cy.get('#test h5').should('have.text', searchTerm, { matchCase: false })
      });
    }
    });
});



