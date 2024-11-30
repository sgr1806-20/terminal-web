/*
 * JavaScript for Terminal Interface Website
 *
 * Author: sgr1806-20
 * Author URL: https://github.com/sgr1806-20
 * Company: Kodspider Technologies
 * Company URL: https://kodspider.com
 *
 * Copyright (c) Kodspider Technologies. All rights reserved.
 *
 * This script is part of the Kodspider Terminal Interface project.
 * It is licensed under the MIT License.
 *
 * Version: 1.1
 * Date: 30-11-2024
 */
$(document).ready(function () {
  function fetchCommands() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "api.php",
        method: "POST",
        data: { token: "your_secure_token" }, // Replace with your secure token
        dataType: "json",
        success: function (data) {
          resolve(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error fetching commands:", errorThrown);
          console.error("Status:", textStatus);
          console.error("Response:", jqXHR.responseText);
          reject(errorThrown);
        },
      });
    });
  }

  generateGreetings(function (greetingsText) {
    fetchCommands()
      .then((commands) => {
        $("#terminal").terminal(
          function (command, term) {
            if (command === "help") {
              let helpText = "\nAvailable commands:\n\n";
              commands.forEach((cmd) => {
                helpText += `${cmd.command} - ${cmd.description}\n`;
              });
              term.echo(helpText);
            } else if (command === "services") {
              const foundCommand = commands.find(
                (cmd) => cmd.command === command
              );
              if (foundCommand) {
                term.echo(foundCommand.output);
                setTimeout(function () {
                  askFollowUpQuestion();
                }, 500);
              } else {
                term.echo("Unknown command: " + command);
              }

              function askFollowUpQuestion() {
                var attempts = getCookie("attempts")
                  ? parseInt(getCookie("attempts"))
                  : 10;
                term.echo(
                  "\nWould you like to know more about our services or anything particular? Y/N"
                );
                term.set_command("");
                term.push(
                  function (answer) {
                    if (answer.toLowerCase() === "y") {
                      if (attempts > 0) {
                        askQuestion();
                      } else {
                        term.echo(
                          "You have reached the maximum number of attempts today. Please try again tomorrow."
                        );
                      }
                    } else {
                      let helpText = "\nAvailable commands:\n\n";
                      commands.forEach((cmd) => {
                        helpText += `${cmd.command} - ${cmd.description}\n`;
                      });
                      term.echo(helpText);
                      while (term.level() > 1) {
                        term.pop();
                      }
                    }
                  },
                  {
                    prompt: "> ",
                  }
                );
              }

              function askQuestion() {
                term.echo("Please enter your question:");
                term.set_command("");
                term.push(
                  function (query) {
                    sendQueryToLLM(term, query);
                  },
                  {
                    prompt: "> ",
                  }
                );
              }
            } else if (command === "query") {
              handleQueryCommand(term);
            } else {
              const foundCommand = commands.find(
                (cmd) => cmd.command === command
              );
              if (foundCommand) {
                term.echo(foundCommand.output);
              } else {
                term.echo("Unknown command: " + command + "\n");
                term.echo("Please type 'help' to see the list of available commands\n");
              }
            }
          },
          {
            greetings: greetingsText,
            prompt: "> ",
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching commands:", error);
      });
  });
});
