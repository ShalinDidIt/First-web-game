<?php
header('Content-Type: application/json');
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$sql = "INSERT INTO user (username, pass) VALUES (?, SHA1(?))";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Signup successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Signup failed']);
}

$stmt->close();
$conn->close();
?>