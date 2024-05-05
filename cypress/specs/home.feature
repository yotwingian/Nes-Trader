Feature: Home

    Scenario Outline: Visit the Home page
        Given I am on the "/" page
        Then I should see the "<title>" title in the "<selector>" element
    
    Examples:
        | title | selector |
        | Games Over Soon | #h1-ending-items |
        | New Games | #h1-latest-items |
        | Select Game | #h1-items |

    Scenario Outline: Visit a page
        Given I am on the "/" page
        When I click on the "<pathname>" link
        Then I should see the "<title>" title in the "<selector>" element
    
    Examples:
        | pathname | title | selector |
        | #games | Select Game | #h1-items |
        | #login | Select Player | #h1-login |
        | #about | About | #h1-about |
        | #contact | Contact | #h1-contact |
        | #how-to| How to | #h1-how-to |
        | #home| Games Over Soon | #h1-ending-items |
        | #login | Select Player | #gotoRegister |

    
