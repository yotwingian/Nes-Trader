Feature: Player

  Scenario: Visit the My page
    Given I am logged in as "mario" with password "mario123"
    When I click on the "#my-page" link
    And I should see "Player Bids" as the title
    Then I should see items in Player Bids if it's not empty
    And I should see items in Player Items if it's not empty

