<?php
/**
 * PHP Script for Terminal Interface Website
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
$servername = "localhost"; // Change this to your MySQL server name
$username = ""; // Change this to your MySQL username
$password = ""; // Change this to your MySQL password
$dbname = ""; // Change this to your MySQL database name

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
$sql = "SELECT command, description, output FROM commands";
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