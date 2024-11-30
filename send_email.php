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

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'example.com'; // Change this to your SMTP host
$mail->Port = 465; // Change this to your SMTP port (usually 465 or 587) 
$mail->SMTPSecure = 'ssl'; // Change this to the encryption method (ssl or tls) 
$mail->SMTPAuth = true; 
$mail->Username = 'noreply@example.com'; // Change this to your SMTP username
$mail->Password = 'smtp-password'; // Change this to your SMTP password

$mail->setFrom('noreply@example.com', 'Sender Name'); // Change this to your sender name and email
$mail->addAddress($_POST['email']);
$mail->Subject = 'Email Verification'; // Change the subject
$mail->Body = 'Your OTP is: ' . $_POST['otp']; 

if (!$mail->send()) {
    echo 'Error sending email: ' . $mail->ErrorInfo;
} else {
    echo 'Email sent successfully!';
}
?>