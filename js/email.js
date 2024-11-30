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
 * Version: 1.0
 * Date: 30-11-2024
 */
function sendEmail(email, otp) {
    return $.ajax({
      url: "send_email.php",
      method: "POST",
      data: { email, otp },
    });
  }
  
  // Function to handle the query command
function handleQueryCommand(term) {
    // Generate two random numbers for the math problem
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num2Word = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][num2];
  
    // Ask the user to solve the math problem
    term.echo(`Please verify that you are a human:\n${num1} + ${num2Word} = ?`);
    term.set_command("");
  
    // Wait for the user's response
    term.push(
      function (answer) {
        // Check if the answer is correct
        if (parseInt(answer) === num1 + num2) {
          term.echo("Verification successful.");
  
          // Ask for the user's email ID
          term.echo("Tell us your email id");
          term.set_command("");
          term.push(
            function (email) {
              // Validate the email ID
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (emailRegex.test(email)) {
                // Generate a random OTP
                const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
                let otpAttempts = 0;
  
                // Set a timeout for the OTP (3 minutes)
                const otpTimeout = setTimeout(() => {
                  term.echo("OTP timed out. Please try again.");
                  term.pop();
                  term.pop();
                  term.pop();
                }, 180000);
  
                // Send the OTP to the user's email ID
                term.echo("We are sending an OTP to your email address. Please wait and perhaps check your spam folder.");
  
                // Create a typing effect to show progress
                var typingEffect = "Sending OTP";
                var typingEffectUpdateInterval = 500; // Update every 500ms
  
                // Display the initial typing effect
                term.echo(typingEffect);
                var typingEffectLine = term.last_index();
  
                // Update the typing effect at regular intervals
                var dotsInterval = setInterval(function () {
                  typingEffect += ".";
                  term.update(typingEffectLine, typingEffect);
                }, typingEffectUpdateInterval);
  
                // Send the OTP to the user's email ID
                sendEmail(email, otp)
                  .then(() => {
                    // Stop the typing effect animation
                    clearInterval(dotsInterval);
                    term.echo("\n"); // Move to a new line
  
                    // Ask the user to enter the OTP
                    term.echo("Enter the otp received in your email");
                    term.set_command("");
                    term.push(
                      function (userOtp) {
                        // Check if the OTP is correct
                        if (userOtp === otp) {
                          // Stop the OTP timeout
                          clearTimeout(otpTimeout);
  
                          // Verify the email ID
                          term.echo("Email verified successfully. You may tell us your concern now. Type your full message and hit enter.");
                          term.set_command("");
                          term.push(
                            function (message) {
                              // Receive the user's message
                              term.echo("We got your message. We will get back to you shortly.");
  
                              // Detect the user's IP address, operating system, and browser
                              detectIP(function (ip) {
                                const osText = detectOS(true);
                                const browserText = detectBrowser(true);
  
                                // Save the user's message and details to the database
                                $.ajax({
                                  type: "POST",
                                  url: "save_message.php",
                                  data: {
                                    email,
                                    message,
                                    ipAddress: ip,
                                    operatingSystem: osText,
                                    browser: browserText,
                                  },
                                });
                              });
  
                              // Exit the nested prompt
                              term.pop();
                              term.pop();
                              term.pop();
                              term.pop();
                            },
                            {
                              prompt: "> ",
                            }
                          );
                        } else {
                          // Increment the OTP attempts
                          otpAttempts++;
  
                          // Check if the maximum OTP attempts have been reached
                          if (otpAttempts >= 3) {
                            // Stop the OTP timeout
                            clearTimeout(otpTimeout);
  
                            // Display an error message
                            term.echo("Invalid OTP. Maximum attempts reached. Please try again later.");
                            term.pop();
                            term.pop();
                            term.pop();
                          } else {
                            // Display an error message
                            term.echo("Invalid OTP. Please try again.");
                          }
                        }
                      },
                      {
                        prompt: "> ",
                      }
                    );
                  })
                  .catch((error) => {
                    // Stop the typing effect animation
                    clearInterval(dotsInterval);
                    term.echo("\n"); // Move to a new line
  
                    // Display an error message
                    term.echo("Error sending email: " + error);
                    term.pop();
                    term.pop();
                  });
              } else {
                // Display an error message
                term.echo("Invalid email ID. Please try again.");
              }
            },
            {
              prompt: "> ",
            }
          );
        } else {
          // Display an error message
          term.echo("Invalid answer. Please try again.");
        }
      },
      {
        prompt: "> ",
      }
    );
  }