$(document).ready(function() {
    $('#command').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            var command = $(this).val();
            $(this).val('');
            processCommand(command);
        }
    });

    function processCommand(command) {
        $.ajax({
            url: 'process_command.php',
            type: 'POST',
            data: { command: command },
            success: function(response) {
                $('#output').append(response + '\n');
                $('#terminal').scrollTop($('#terminal')[0].scrollHeight);
            }
        });
    }

    function handleResize() {
        var viewportHeight = $(window).height();
        var viewportWidth = $(window).width();
        $('.terminal-window').css({
            'height': viewportHeight,
            'width': viewportWidth
        });
    }

    $(window).resize(function() {
        handleResize();
    });

    handleResize();

    function typeWriter(element, text, i, callback) {
        if (i < text.length) {
            $(element).append(text.charAt(i));
            i++;
            setTimeout(function() {
                typeWriter(element, text, i, callback);
            }, 100);
        } else if (typeof callback == 'function') {
            callback();
        }
    }

    function detectIP() {
        $.getJSON('https://api.ipify.org?format=json', function(data) {
            typeWriter('#ip-address', data.ip, 0);
        });
    }

    function detectOS() {
        var os = "Unknown OS";
        if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1) os = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
        typeWriter('#os-name', os, 0);
    }

    function detectBrowser() {
        var browser = "Unknown Browser";
        if (navigator.userAgent.indexOf("Chrome") != -1) browser = "Chrome";
        if (navigator.userAgent.indexOf("Firefox") != -1) browser = "Firefox";
        if (navigator.userAgent.indexOf("Safari") != -1) browser = "Safari";
        if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) browser = "IE"; // IE <= 10
        typeWriter('#browser-name', browser, 0);
    }

    detectIP();
    detectOS();
    detectBrowser();
});
