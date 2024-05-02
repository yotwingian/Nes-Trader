Feature: Home

    Scenario Outline: Visit the Home page
        Given I am on the "/" page
        Then I should see the "<header>" header
    
    Examples:
        | header |
        | Games Over Soon |
        | New Games |
        | Select Game |

    Scenario Outline: Visit a page
        Given I am on the "/" page
        When I click on the "<pathname>" link
        Then I should see the "<header>" header
    
    Examples:
        | pathname | header |
        | / | Games Over Soon |
        | /games | Select Game |