Feature: Games

  Scenario Outline: Searching for items by title
    Given I am on the "/games" page
    When I type "<searchTerm>" in the search input
    Then I should see only items with titles containing "<searchTerm>"

  Examples:
    | searchTerm |
    | Mario |
    | Donkey Kong |