Feature: Login and Register

  Scenario: Successful Registration
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I fill in the "inputUsername" with "testuser"
    And I fill in the "inputEmail4" with "test@testing.com"
    And I fill in the "inputPassword4" with "test1234"
    And I fill in the "inputName" with "Testie Tester"
    And I fill in the "inputAddress" with "Test Drive 123"
    And I fill in the "inputCity" with "Testtown"
    And I fill in the "inputZip" with "12345"
    And I fill in the "country" with "Testonia"
    And I click the "registerButton" button
    Then I should see a notification "User has been successfully registered."

  Scenario: Failed Registration
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I fill in the "inputUsername" with "testuser"
    And I fill in the "inputEmail4" with "test@testing.com"
    And I fill in the "inputPassword4" with "test1234"
    And I fill in the "inputName" with "Testie Tester"
    And I fill in the "inputAddress" with "Test Drive 123"
    And I fill in the "inputCity" with "Testtown"
    And I fill in the "inputZip" with "12345"
    And I fill in the "country" with "Testonia"
    And I click the "registerButton" button
    Then I should see a notification "A user with this username or email already exists"

  Scenario: Successful Login
    Given I am on the "/Login" page
    When I fill in the "userName" with "testuser"
    And I fill in the "password" with "test1234"
    And I click the "loginButton" button
    Then I should be redirected to the home page

  Scenario: Failed Login
    Given I am on the "/Login" page
    When I fill in the "userName" with "wrongUser"
    And I fill in the "password" with "wrongPassword"
    And I click the "loginButton" button
    Then I should see a notification "Wrong username or password!"

  Scenario: Testing link Select Player in Registerform page
    Given I am on the "/login" page
    When I click on the "#gotoRegister" link
    And I click on the "#gotoRegister" link
    Then I should see "Select Player" as the title

  Scenario: Testing Resetbutton
    Given I am logged in as "testuser" with password "test1234"
    When i click on the "logout" link
    Then I should not see mypage link anymore
