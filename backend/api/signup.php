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


$email = isset($data['email']) ? $data['email'] : null;
$username = isset($data['username']) ? $data['username'] : null;
$password = isset($data['password']) ? $data['password'] : null;

if (!$email || !$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

$sql = "INSERT INTO user (email, username, pass) VALUES (?, ?, SHA1(?))";
$stmt = $conn->prepare($sql);

$stmt->bind_param("sss", $email, $username, $password);

if ($stmt->execute()) {
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