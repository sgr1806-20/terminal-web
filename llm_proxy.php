<?php
// Set your API key and system prompt
$api_key = "your_api_key_here"; // Get your API key from https://awanllm.com/dashboard
$system_prompt = "your system prompt here"; // Set your system prompt here

// Get the user query from the POST request
$user_query = $_POST['query'];

// Prepare the data for the LLM API request
// Awanllm-Llama-3-8B-Dolfin is set as the default model
$data = [
    "model" => "Awanllm-Llama-3-8B-Dolfin", // Change this to the model you want to use
    "messages" => [
        [
            "role" => "system",
            "content" => $system_prompt,
        ],
        [
            "role" => "user",
            "content" => $user_query,
        ],
    ],
    "repetition_penalty" => 1.1, // Increase this value to reduce repetitive responses
    "temperature" => 0.7, // Adjust the temperature for more creative responses
    "top_p" => 0.9, // Adjust the nucleus sampling probability
    "top_k" => 40, // Adjust the nucleus sampling size
    "max_tokens" => 1024, // Maximum number of tokens to generate
    "stream" => false, 
];

// Initialize cURL
$ch = curl_init("https://api.awanllm.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $api_key",
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Execute the request and get the response
$response = curl_exec($ch);
$errno = curl_errno($ch);
$errmsg = curl_error($ch);
curl_close($ch);

// Check for errors
if ($errno) {
    header('Content-Type: application/json');
    echo json_encode(["error" => $errmsg]);
} else {
    header('Content-Type: application/json');
    echo $response;
}
?>