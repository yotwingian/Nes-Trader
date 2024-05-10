Feature: New Game

  Scenario: Add a new game
    Given I am logged in as "testuser" with password "test1234"
    When I click on the "#new-item" link
    And I fill in the selector "form > :nth-child(2) > input" with "Mario Super Bros - Limited Edition"  
    And I fill in the selector "form > :nth-child(4) > input" with "1974"  
    And I fill in the selector "form > :nth-child(6) > input" with "Action"  
    And I fill in the selector "textarea" with "Mario Super Bros - Limited Edition från 1974 för NES-konsolen är en tidig utgåva av det klassiska plattformsspelet där Mario räddar prinsessan från skurkaktiga motståndare i en fantasifylld pixelvärld."
    And I fill in the selector "form > :nth-child(10) > input" with "/img/Test.png"  
    And I fill in the selector "form > :nth-child(12) > input" with "2024-05-06T08:30"
    And I fill in the selector "form > :nth-child(14) > input" with "2024-05-18T08:30"
    And I fill in the selector "form > :nth-child(16) > input" with "1"
    And I fill in the selector ":nth-child(17) > div > input" with "2"
    And I click the "newGameButton" button
    Then I should see a notification "Your auction has been posted successfully."
