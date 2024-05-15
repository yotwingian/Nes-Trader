import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I fill in the selector {string} with {string}', (selector, value) => {
  cy.get(selector).type(value)
});