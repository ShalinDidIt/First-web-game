<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header('Access-Control-Allow-Methods: POST, OPTIONS'); 
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true'); // cookies

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    session_start(); // session cookie

    include '../db_connection.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    $sql = "SELECT user_id, username FROM user WHERE username = ? AND pass = SHA1(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['user'] = $user; // Store user data in the session

        setcookie('PHPSESSID', session_id(), [
            'path' => '/',
            'httponly' => true,
            'samesite' => 'None',
            'secure' => false, 
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