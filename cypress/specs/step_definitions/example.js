import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the {string} page', (url) => {
  cy.visit(url)
});
