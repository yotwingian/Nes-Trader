import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import unixConverter from "./unixConverter.js";

When('I type {string} in the search input', (searchTerm) => {
  cy.wait(5000)
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

When('I select #Ending Soon', () => {
  cy.get('select').select('Ending Soon')
});

Then('the date and time of the first item should be the same or earlier than the date and time of the second item', () => {
  
  cy.get(':nth-child(1) > .itemsCard > a > .itemsFlex > :nth-child(3) > span').invoke('text').then(firstString => {
    if (firstString.includes("Game over!")) {
      cy.log("First game has already finished");
    }
    else {

      cy.get(':nth-child(2) > .itemsCard > a > .itemsFlex > :nth-child(3) > span').invoke('text').then(secondString => {
        if (secondString.includes("Game over!")) {
          cy.log("Second game has already finished");
        }
        else
        {
        const firstDate = firstString.slice(11);
        const secondDate = secondString.slice(11);
        const firstUnixTime = unixConverter(firstDate);
        const secondUnixTime = unixConverter(secondDate);
        assert(firstUnixTime <= secondUnixTime, 'the date and time of the first item should be the same or earlier than the date and time of the second item');
      }
      });
  }
  });

});