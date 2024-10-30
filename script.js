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
});
