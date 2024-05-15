Feature: Player

  Scenario: Visit the My page
    Given I am logged in as "testuser" with password "test1234"
    When I click on the "#my-page" link
    Then I should see items in Player Bids if it's not empty
    And I should see items in Player Items if it's not empty

  Scenario Outline: Click on item
    Given I am logged in as "testuser" with password "test1234"
    When I click on the "#my-page" link
    And I click on the "<pathname>" link
    Then the element "<selector>" should contain text

    Examples:
      | pathname                               | selector |
      | #my-bids > section > :nth-child(1) > a | #h1-item |
      | #my-items > :nth-child(1)              | #h1-item |
