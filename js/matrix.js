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
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

// Create a 2D drawing context
var ctx = canvas.getContext('2d');

// Set the font and text color
ctx.font = '12px monospace';

// Create a function to draw the Matrix-like characters
var chars = [];
for (var i = 0; i < canvas.height; i += 20) {
  chars.push([]);
  for (var j = 0; j < canvas.width; j += 20) {
    chars[chars.length - 1].push({
      char: String.fromCharCode(Math.floor(Math.random() * 256)),
      opacity: 1,
    });
  }
}

function drawMatrix() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the characters
  for (var i = 0; i < chars.length; i++) {
    for (var j = 0; j < chars[i].length; j++) {
      // Set the text color and opacity
      ctx.fillStyle = `rgba(0, 111, 117, ${chars[i][j].opacity})`;
      ctx.fillText(chars[i][j].char, j * 20, i * 20);
    }
  }

  // Update the characters
  for (var i = chars.length - 1; i > 0; i--) {
    for (var j = 0; j < chars[i].length; j++) {
      chars[i][j].char = chars[i - 1][j].char;
      chars[i][j].opacity = chars[i - 1][j].opacity;
    }
  }
  for (var j = 0; j < chars[0].length; j++) {
    chars[0][j].char = String.fromCharCode(Math.floor(Math.random() * 256));
    chars[0][j].opacity = 1;
  }

  // Fade away the characters from the bottom
  for (var i = chars.length - 1; i > chars.length / 2; i--) {
    for (var j = 0; j < chars[i].length; j++) {
      if (Math.random() < 0.05) {
        chars[i][j].opacity -= 0.8;
        if (chars[i][j].opacity < 0) {
          chars[i][j].opacity = 0;
        }
      }
    }
  }

  // Request the next frame
  setTimeout(drawMatrix, 40);
}

// Start drawing
drawMatrix();