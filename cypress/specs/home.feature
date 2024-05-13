Feature: Home

    Scenario Outline: Visit the Home page
        Given I am on the "/" page
        Then I should see the "<title>" title in the "<selector>" element

        Examples:
            | title           | selector         |
            | Games Over Soon | #h1-ending-items |
            | New Games       | #h1-latest-items |
            | Select Game     | #h1-items        |

    Scenario Outline: Visit a page
        Given I am on the "/" page
        When I click on the "<pathname>" link
        Then I should see the "<title>" title in the "<selector>" element

        Examples:
            | pathname   | title           | selector         |
            | #games     | Select Game     | #h1-items        |
            | #btn-login | Select Player   | #h1-login        |
            | #about     | About           | #h1-about        |
            | #contact   | Contact         | #h1-contact      |
            | #how-to    | How to          | #h1-how-to       |
            | #home      | Games Over Soon | #h1-ending-items |

    Scenario Outline: Click on item
        Given I am on the "/" page
        When I click on the "<pathname>" link
        Then the element "<selector>" should contain text

        Examples:
            | pathname                                                         | selector |
            | :nth-child(1) > :nth-child(1) > .items-container > :nth-child(1) | #h1-item |
            | :nth-child(2) > .items-container > :nth-child(1)                 | #h1-item |
            | main > :nth-child(1) > :nth-child(5) > :nth-child(1)             | #h1-item |

    Scenario Outline: Log in and visit page
        Given I am logged in as "testuser" with password "test1234"
        When I click on the "<pathname>" link
        Then I should see the "<title>" title in the "<selector>" element

        Examples:
            | pathname  | title       | selector |
            | #new-item | New Game    | #h1-newgame  |
            | #my-page  | Player Page | #h1-mypage  |
