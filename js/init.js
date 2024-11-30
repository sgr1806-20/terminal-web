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
function detectIP(callback, forEmail = false) {
  $.getJSON("https://api.ipify.org?format=json")
    .done(function (data) {
      callback(forEmail ? data.ip : `IP Address: ${data.ip} (detected)`);
    })
    .fail(function () {
      callback("IP Address: Unable to detect IP");
    });
}

function detectOS(forEmail = false) {
  const userAgent = navigator.userAgent;
  const os = userAgent.match(/Windows|Mac|Linux|Android|iOS|Chrome OS/) || ["Unknown OS"];
  const version = userAgent.match(/Windows NT (\d+\.\d+)|Mac OS X (\d+[\._]\d+[\._]?\d*)|Android (\d+\.\d+(\.\d+)?)/);
  const osText = `${os[0]} ${version && version[1] || ""}`;
  return forEmail ? osText : `Operating System: ${osText} (detected)`;
}

function detectBrowser(forEmail = false) {
  const userAgent = navigator.userAgent;
  let browser = "";

  if (userAgent.match(/TorBrowser/)) {
    browser = "TOR";
  } else if (userAgent.match(/Edg/)) {
    browser = "Edge";
  } else if (userAgent.match(/Opera/)) {
    browser = "Opera";
  } else if (userAgent.match(/Chrome/)) {
    browser = "Chrome";
  } else if (userAgent.match(/Firefox/)) {
    browser = "Firefox";
  } else if (userAgent.match(/Safari/)) {
    browser = "Safari";
  } else if (userAgent.match(/MSIE/)) {
    browser = "IE";
  } else {
    browser = "Unknown Browser";
  }

  return forEmail ? browser : `Browser: ${browser} (detected)`;
}

function getCurrentTimeIST() {
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat([], options);
  return `Time: ${formatter.format(new Date())} IST`;
}

function generateGreetings(callback) {
  detectIP(function (ipText) {
    var osText = detectOS();
    var browserText = detectBrowser();
    var currentTime = getCurrentTimeIST();
    var greetingsText =
      "Terminal Interface Website (Version 1.02.01)\n\n" +
      "Kodspider Technologies, India\n\n" +
      "System Initialization:\n\n" +
      "This terminal interface is a dynamic, interactive shell that collects anonymous usage data to enhance user experience.\n\n" +
      "Data Collection Policy:\n\n" +
      "Please note that any data collected during interaction with this terminal is strictly for internal use.\n" +
      "Collected data will not be shared with external parties.\n" +
      "Users may voluntarily provide personal information to initiate communication or request support.\n\n" +
      "System Information:\n\n" +
      ipText +
      "\n" +
      osText +
      "\n" +
      browserText +
      "\n" +
      currentTime +
      "\n\n" +
      "Welcome!\n\n" +
      "You can now interact with the terminal using commands. Type 'help' to view available commands.\n\n";
    callback(greetingsText);
  });
}
