<?php
header('Content-Type: application/json');
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$difficulty = $data['difficulty'];
$time_score = $data['time_score'];
$mistakes_made = $data['mistakes_made'];

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