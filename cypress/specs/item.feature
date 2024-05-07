Feature: Item

  Scenario: Visit the Item page
    Given I am on the "/item/mario-bros" page
    Then I should see the "HIGH SCORES" title in the "#h6-bids-list" element
  
  Scenario: Click on the POWER button
    Given I am on the "/item/mario-bros" page
    When I click on the "#btn-login-to-bid" link
    Then I should see the "Select Player" title in the "#h1-login" element
