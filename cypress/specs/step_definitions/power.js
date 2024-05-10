import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
/*
beforeEach(() => {
  // Successful login
  cy.intercept('POST', '/api/users/login', {
    statusCode: 200,
    body: { username: 'mario', password: 'mario123' }
  })

  // Failed login
  cy.intercept('POST', '/api/users/login', {
    statusCode: 401,
    body: 'Invalid email or password'
  })
  // Successful registration
  cy.intercept('POST', '/api/users/register', {
    statusCode: 200,
    body: { message: 'User has been successfully registered.' }
  })

  // Failed registration
  cy.intercept('POST', '/api/users/register', {
    statusCode: 400,
    body: { detail: 'An error occurred while registering the user.' }
  })
})
*/

When('I fill in the {string} with {string}', (fieldId, value) => {
  cy.wait(700)
  cy.get(`#${fieldId}`).type(value);
});

When('I click the {string} button', (buttonId) => {
  cy.get(`#${buttonId}`).click();
});


Then('I should be redirected to the home page', () => {
  cy.url().should('include', '/');
});

// Then('I should see an alert with the text {string}', (alertText) => {
//   cy.on('window:alert', (str) => {
//     expect(str).to.equal(alertText);
//   });
// });

Then('I should see a notification {string}', (notificationText) => {
  cy.wait(700)
  cy.get('.notificationMessage1').should('contain', notificationText);
});

