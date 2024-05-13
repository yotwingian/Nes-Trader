Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.wait(200)
  cy.get('input#userName').type(email);
  cy.wait(200)
  cy.get('input#password').type(password);
  cy.wait(200)
  cy.get('#loginButton').click();
})