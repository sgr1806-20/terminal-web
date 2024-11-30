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
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kodspider";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert the user's message and email ID into the database
$email = $_POST['email'];
$message = $_POST['message'];
$ipAddress = $_POST['ipAddress'];
$operatingSystem = $_POST['operatingSystem'];
$browser = $_POST['browser'];

$sql = "INSERT INTO query_box (email, message, ip_address, operating_system, browser) VALUES ('$email', '$message', '$ipAddress', '$operatingSystem', '$browser')";

if ($conn->query($sql) === TRUE) {
    echo "Message saved successfully!";
} else {
    echo "Error saving message: " . $conn->error;
}

// Send an email notification to vishnu@rainverse.com
$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'example.com'; // Change this to your SMTP host
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->Username = 'noreply@example.com'; // Change this to your SMTP username
$mail->Password = 'smtp-password'; // Change this to your SMTP password

$mail->setFrom('noreply@example.com', 'Sender Name'); // Change this to your sender name and email
$mail->addAddress('to@example.com'); // Change this to the recipient email
$mail->Subject = 'New Message in Query Box'; // Change the subject
$mail->Body = 'A message is dropped in query box from ' . $email; // Change the email body

if (!$mail->send()) {
    echo 'Error sending email: ' . $mail->ErrorInfo;
} else {
    echo 'Email sent successfully!';
}

$conn->close();
?>