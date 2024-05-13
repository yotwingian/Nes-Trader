const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

const baseUrl = require('./baseUrl.js');

module.exports = defineConfig(
  {
    e2e:
    {
      experimentalInteractiveRunEvents: true,
      specPattern: '**/*.feature',
      baseUrl,
      video: false,
      supportFile: "support/commands.js",
      screenshotOnRunFailure: false,
      setupNodeEvents(on, config) {
        // implement node event listeners here

        // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
        addCucumberPreprocessorPlugin(on, config);

        on(
          "file:preprocessor",
          webpack(
            {
              webpackOptions:
              {
                resolve: {
                  extensions: [".js"],
                },
                module: {
                  rules:
                    [
                      {
                        test: /\.feature$/,
                        use:
                          [
                            {
                              loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                              options: config,
                            },
                          ],
                      },
                    ],
                },
              },
            }
          )
        );

        on(
          'task',
          {
            log(message) {
              console.log(message)
              return null
            },
          }
        );

        on('before:run', async () => {
          try {
            // Delete user bids
            const responseBids = await fetch(`${config.baseUrl}/api/bids/delete/testuser`, {
              method: 'DELETE',
            });
            const textBids = await responseBids.text();
            const dataBids = JSON.parse(textBids);
            console.log('Delete bids response:', dataBids);

            // Delete user items
            const responseItems = await fetch(`${config.baseUrl}/api/items/delete/testuser`, {
              method: 'DELETE',
            });
            const textItems = await responseItems.text();
            const dataItems = JSON.parse(textItems);
            console.log('Delete items response:', dataItems);

            // Delete the user
            const responseUser = await fetch(`${config.baseUrl}/api/users/delete/testuser`, {
              method: 'DELETE',
            });
            const textUser = await responseUser.text();
            const dataUser = JSON.parse(textUser);
            console.log('Delete user operation response:', dataUser);

          } catch (error) {
            console.error('Failed to complete operations:', error);
          }
        });

        // Make sure to return the config object as it might have been modified by the plugin.
        return config;
      }
    }
  }
);
