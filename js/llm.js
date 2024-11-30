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
 * Version: 1.4
 * Date: 30-11-2024
 */
var attempts = getCookie("attempts") ? parseInt(getCookie("attempts")) : 5;

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var typingEffectInterval;

function sendQueryToLLM(term, query) {
    term.echo("Processing question...");
    var typingEffect = "|";
    var typingEffectUpdateInterval = 100; // Update every 100ms

    // Display the initial typing effect
    term.echo(typingEffect);
    var typingEffectLine = term.last_index();

    // Update the typing effect at regular intervals
    typingEffectInterval = setInterval(function () {
        typingEffect += "|";
        term.update(typingEffectLine, typingEffect);
    }, typingEffectUpdateInterval);

    $.ajax({
        url: "llm_proxy.php",
        method: "POST",
        data: { query: query },
        dataType: "json",
        success: function (data) {
            clearInterval(typingEffectInterval); // Stop the typing effect animation
            term.echo("\n"); // Move to a new line
            handleLLMResponse(term, data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            clearInterval(typingEffectInterval); // Stop the typing effect animation
            console.error("Error fetching response:", errorThrown);
            console.error("Status:", textStatus);
            console.error("Response:", jqXHR.responseText);
            term.echo("\n"); // Move to a new line
            term.echo("Error: " + errorThrown);
        },
    });
}

function handleLLMResponse(term, data) {
    if (data.choices && data.choices.length > 0) {
        let answer = data.choices[0].message.content;
        term.echo(answer);
    } else {
        term.echo("No answer found.");
    }
    attempts--;
    setCookie("attempts", attempts, 1); // Update the cookie with the new attempts value
    term.echo(`[${attempts} attempts remaining]`);
    if (attempts > 0) {
        askAnotherQuestion(term);
    } else {
        term.echo("You have reached the maximum number of attempts.");
        // Pop all command handlers except the initial one
        while (term.level() > 1) {
            term.pop();
        }
    }
}

function askAnotherQuestion(term) {
    term.echo("Would you like to ask another question? Y/N");
    term.set_command("");
    term.push(
        function (nextAnswer) {
            if (nextAnswer.toLowerCase() === "y") {
                askQuestion(term);
            } else {
                term.echo("Thank you for using our AI assistant.");
                // Pop all command handlers except the initial one
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

function askQuestion(term) {
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