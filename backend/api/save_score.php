<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    session_start();

    // Apache error.log
    error_log("Session ID in save_score.php: " . session_id());
    error_log("Session data in save_score.php: " . print_r($_SESSION, true));
    if (isset($_COOKIE['PHPSESSID'])) {
        error_log("PHPSESSID cookie in save_score.php: " . $_COOKIE['PHPSESSID']);
    } else {
        error_log("PHPSESSID cookie is not set in save_score.php");
    }

    if (!isset($_SESSION['user'])) {
        echo json_encode(['success' => false, 'message' => 'Not authenticated']);
        exit();
    }

    include '../db_connection.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $difficulty = $data['difficulty'];
    $time_score = $data['time_score'];
    $mistakes_made = $data['mistakes_made'];
    $user_id = $_SESSION['user']['user_id']; 

    $table = "diff_{$difficulty}_score";
    $sql = "INSERT INTO $table (user_id, time_score, mistakes_made) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("idd", $user_id, $time_score, $mistakes_made);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Score saved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save score']);
    }

    $stmt->close();
    $conn->close();
?>