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
            const response = await fetch(`${config.baseUrl}/api/users/delete/testuser`, {
              method: 'DELETE',
            });
            const text = await response.text();
            const data = JSON.parse(text);
            console.log('Delete operation response:', data);
          } catch (error) {
            console.error('Failed to delete test user:', error);
          }
        });

        // Make sure to return the config object as it might have been modified by the plugin.
        return config;
      }
    }
  }
);
