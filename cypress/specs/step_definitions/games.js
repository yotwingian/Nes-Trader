import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I type {string} in the search input', (searchTerm) => {
  cy.get('input').type(searchTerm);
});

Then('I should see only items with titles containing {string}', (searchTerm) => {
  cy.get('.items-container section').each(($item) => {
    cy.wrap($item).within(() => {
      cy.get('h5').contains(searchTerm, {matchCase: false})
    });
  });
});

When('I select #Title', () => {
  cy.get('select').select('Title')
});

Then('the first letter of the first title should be the same or earlier alphabetically than the first letter of the second title', () => {
  cy.get(':nth-child(1) > .itemsCard > a > h5').invoke('text').then(firstString => {

    
    cy.get(':nth-child(2) > .itemsCard > a > h5').invoke('text').then(secondString => {

      const firstLetter = firstString.charAt(0).toLowerCase(); 
      const secondLetter = secondString.charAt(0).toLowerCase();

      assert(firstLetter <= secondLetter, 'the first letter of the first title should be the same or earlier alphabetically than the first letter of the second title');

    });
  });
});

When('I select #Release Year', () => {
  cy.get('select').select('Release Year')
});

Then('the year of the first item should be the same or earlier than the year of the second item', () => {
  cy.get(':nth-child(1) > .itemsCard > a > .itemsFlex > :nth-child(1) > .itemstext').invoke('text').then(firstString => {


    cy.get(':nth-child(2) > .itemsCard > a > .itemsFlex > :nth-child(1) > .itemstext').invoke('text').then(secondString => {

      const firstYear = firstString.slice(0, 4);
      const secondYear = secondString.slice(0, 4);
      
      const firstNumber = parseFloat(firstYear);
      const secondNumber = parseFloat(secondYear);

      assert(firstNumber <= secondNumber, 'the year of the first item should be the same or earlier than the year of the second item');

    });
  });
});