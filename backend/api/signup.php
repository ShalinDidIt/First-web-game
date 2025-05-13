<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers
header('Access-Control-Allow-Credentials: true'); // Allow credentials (cookies)

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

include '../db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$sql = "INSERT INTO user (username, pass) VALUES (?, SHA1(?))";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    // trying to get signup to automatically log in the user
    // probably just use the login sql here...
    $user_id = $stmt->insert_id;

    $_SESSION['user'] = [
        'user_id' => $user_id,
        'username' => $username,
    ];
    setcookie('PHPSESSID', session_id(), [
        'path' => '/',
        'httponly' => true,
        'samesite' => 'None', 
        'secure' => false,
    ]);

    error_log("Session ID in signup.php: " . session_id());
    error_log("Session set in signup.php: " . print_r($_SESSION['user'], true));

    echo json_encode(['success' => true, 'message' => 'Signup successful', 'username' => $username]);
} else {
    echo json_encode(['success' => false, 'message' => 'Signup failed']);
}

$stmt->close();
$conn->close();
?>