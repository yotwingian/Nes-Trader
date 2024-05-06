Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input#userName').type(email);
  cy.get('input#password').type(password);
  cy.get('#loginButton').click();
})