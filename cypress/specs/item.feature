Feature: Item

  Scenario: Visit the Item page
    Given I am on the "/item/test" page
    Then I should see the "HIGH SCORES" title in the "#h6-bids-list" element

  Scenario: Click on the POWER button
    Given I am on the "/item/test" page
    When I click on the "#btn-login-to-bid" link
    Then I should see the "Select Player" title in the "#h1-login" element

  Scenario Outline: Place a bid
    Given I am logged in as "testuser" with password "test1234"
    When I click on the "<pathname>" link
    And I fill in the "input-amount" with "<value>"
    And I click the "btn-select-bid" button
    Then I should see a notification "<message>"

    Examples:
      | pathname                                                   | value | message                                                                      |
      | :nth-child(2) > .items-container > section > :nth-child(1) | -1    | The new bid must be equal to or greater than the start price. Start price: 1 |
      | :nth-child(2) > .items-container > section > :nth-child(1) | 0     | The new bid must be equal to or greater than the start price. Start price: 1 |
      | :nth-child(2) > .items-container > section > :nth-child(1) | 1     | Your bid was successful. Your bid: 1                                         |
      | :nth-child(2) > .items-container > section > :nth-child(1) | -1    | The new bid must be greater than the existing bid. Current bid: 1            |
      | :nth-child(2) > .items-container > section > :nth-child(1) | 0     | The new bid must be greater than the existing bid. Current bid: 1            |
      | :nth-child(2) > .items-container > section > :nth-child(1) | 1     | The new bid must be greater than the existing bid. Current bid: 1            |
      | :nth-child(2) > .items-container > section > :nth-child(1) | 2     | Your bid was successful. Your bid: 2                                         |

  Scenario: See a placed bid
    Given I am logged in as "testuser" with password "test1234"
    When I click on the ":nth-child(2) > .items-container > section > :nth-child(1)" link
    Then I should see, in the top entry of the HIGH SCORES list, "testuser" in the Player column and "2" in the Bid column of the element "#root > main > div > div.bids-list-container > ul > li:nth-child(3)"
