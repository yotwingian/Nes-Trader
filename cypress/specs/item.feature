Feature: Item

  Scenario: Visit the Item page
    Given I am on the "/item/mario-bros" page
    Then I should see the "HIGH SCORES" title in the "#h6-bids-list" element
  