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

header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers
header('Access-Control-Allow-Credentials: true'); // Allow credentials (cookies)

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start(); // Start the session

include '../db_connection.php'; // Include your database connection file

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$sql = "SELECT user_id, username FROM user WHERE username = ? AND pass = SHA1(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc(); // Fetch the user data
    $_SESSION['user'] = $user; // Store user data in the session

    // Explicitly set the session ID in the response
    setcookie('PHPSESSID', session_id(), [
        'path' => '/',
        'httponly' => true,
        'samesite' => 'None', // Allow cross-origin requests
        'secure' => false,    // Set to true if using HTTPS
    ]);

    error_log("Session ID in login.php: " . session_id());
    error_log("Session set in login.php: " . print_r($_SESSION['user'], true));
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'username' => $user['username']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}

$stmt->close();
$conn->close();
?>