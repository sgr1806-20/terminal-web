<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kodspider";

// Define a valid token
$valid_token = "your_secure_token";

// Check for token in the request
if (!isset($_POST['token']) || $_POST['token'] !== $valid_token) {
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Unauthorized access"));
    exit();
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the commands table
$sql = "SELECT command, description FROM commands";
$result = $conn->query($sql);

$commands = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $commands[] = $row;
    }
} else {
    echo json_encode(array("error" => "No commands found"));
    exit();
}

$conn->close();

// Convert to JSON and return
header('Content-Type: application/json');
echo json_encode($commands);
?>