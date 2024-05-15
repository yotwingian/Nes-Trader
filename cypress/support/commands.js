Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login', { headers: { "Accept-Encoding": "gzip, deflate" } })
  cy.wait(200)
  cy.get('input#userName').type(email);
  cy.wait(200)
  cy.get('input#password').type(password);
  cy.wait(200)
  cy.get('#loginButton').click();
})