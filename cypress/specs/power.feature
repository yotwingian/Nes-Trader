Feature: Login and Register

  Scenario: Successful Login
    Given I am on the "/Login" page
    When I fill in the "userName" with "mario"
    And I fill in the "password" with "mario123"
    And I click the "loginButton" button
    Then I should be redirected to the home page

  Scenario: Failed Login
    Given I am on the "/Login" page
    When I fill in the "userName" with "wrongUser"
    And I fill in the "password" with "wrongPassword"
    And I click the "loginButton" button
    Then I should see an alert with the text "Wrong username or password!"


  Scenario: Successful Registration
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I fill in the "inputUsername" with "newUser"
    And I fill in the "inputEmail4" with "newUser@example.com"
    And I fill in the "inputPassword4" with "newPassword"
    And I fill in the "inputName" with "New User"
    And I fill in the "inputAddress" with "123 New St"
    And I fill in the "inputCity" with "New City"
    And I fill in the "inputZip" with "12345"
    And I fill in the "country" with "New Country"
    And I click the "registerButton" button
    Then I should see a notification "User has been successfully registered."

  Scenario: Failed Registration
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I fill in the "inputUsername" with "mario"
    And I fill in the "inputEmail4" with "mario@example.com"
    And I fill in the "inputPassword4" with "existingPassword"
    And I fill in the "inputName" with "Existing User"
    And I fill in the "inputAddress" with "123 Existing St"
    And I fill in the "inputCity" with "Existing City"
    And I fill in the "inputZip" with "54321"
    And I fill in the "country" with "Existing Country"
    And I click the "registerButton" button
    Then I should see a notification "A user with this username or email already exists"

  Scenario: Testing link Select Player in Registerform page
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I click on the "#gotoRegister" link
    Then I should see "Select Player" as the title

 
  Scenario: Testing Resetbutton
    Given I am logged in as "mario" with password "mario123"
    When i click on the "logout" link
    Then I should not see mypage link anymore













    