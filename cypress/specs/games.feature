Feature: Games

  Scenario Outline: Searching for items by title
    Given I am on the "/games" page
    When I type "<searchTerm>" in the search input
    Then I should see only items with titles containing "<searchTerm>"

  Examples:
    | searchTerm |
    | Mario |
    | Donkey Kong |

Scenario: Sorting items by Title
  Given I am on the "/games" page
  When I select #Title
  Then the first letter of the first title should be the same or earlier alphabetically than the first letter of the second title

  Scenario: Sorting items by Release Year
    Given I am on the "/games" page
    When I select #Release Year
    Then the year of the first item should be the same or earlier than the year of the second item
