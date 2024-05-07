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
  cy.get(`input#${fieldId}`).type(value);
});

When('I click the {string} button', (buttonId) => {
  cy.get(`#${buttonId}`).click();
});

When('i click on the {string} link', (linkId) => {
  cy.get(`#${linkId}`).click();
});

Then('I should be redirected to the home page', () => {
  cy.url().should('include', '/'); 
});

Then('I should see an alert with the text {string}', (alertText) => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(alertText);
  });
});

Then('I should see a notification {string}', (notificationText) => {
  cy.get('#notificationMessage').should('contain', notificationText);
});

Then('I should see {string} as the title', (title) => {
  cy.get('#h1-login').should('have.text', title)
});

Then('I should not see mypage link anymore', () => {
  cy.get('#my-page').should('not.exist');
});



