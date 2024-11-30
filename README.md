# terminal-web
a jQuery based website that mimics a terminal window with LLM integration

## Overview

Terminal-web is a web-based terminal emulator that allows users to interact with a Large Language Model (LLM) using a conversational interface. The project uses a PHP proxy script to handle requests to the LLM API and display the responses in the terminal window.

## How to Use

1. Open `index.html` in your web browser.
2. You will see a terminal window with an input field.
3. Type your command or question in the input field and press Enter.
4. The command will be processed asynchronously, and the output will be displayed in the terminal window.
5. For LLM-related queries, the response will be displayed with a typing animation.

## LLM Integration

The project uses a PHP proxy script to handle requests to the LLM API. The proxy script is configured to use the Awanllm-Llama-3-8B-Dolfin model by default, but you can change this to any other model supported by the LLM API.

## New Functionality

The website now detects the visitor's IP address, operating system, and browser asynchronously and displays the information with a typing animation.

### How to Use the New Functionality

1. Open `index.html` in your web browser.
2. You will see a section displaying the detected IP address, operating system, and browser.
3. The information will be displayed with a typing animation.

## Background Color

The background color of the terminal window is black.

## Requirements

* PHP 7.4 or later
* jQuery 3.6 or later
* Awanllm API key (get yours from https://awanllm.com/dashboard)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Acknowledgments

This project uses the Awanllm API and the jQuery library.
