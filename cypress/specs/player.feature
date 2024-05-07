Feature: Player

  Scenario: Visit the My page
    Given I am logged in as "mario" with password "mario123"
    When I click on the "#my-page" link
    And I should see "Player Bids" as the title
    Then I should see only items with titles containing "Excitebike"


