<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Dynamically set the allowed origin
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === 'http://localhost:5173') {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Default to your frontend's origin
}

header('Access-Control-Allow-Methods: GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers
header('Access-Control-Allow-Credentials: true'); // Allow credentials (cookies)

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start(); // Start the session

if (isset($_SESSION['user'])) {
    echo json_encode([
        'success' => true,
        'user' => $_SESSION['user']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Not authenticated'
    ]);
}
?>