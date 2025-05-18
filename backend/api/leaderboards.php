<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true'); // cookie credentials

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include '../db_connection.php';

    $difficulty = isset($_GET['difficulty']) ? intval($_GET['difficulty']) : 1;
    $table = "diff_{$difficulty}_score";

    $sql = "SELECT u.username, d.time_score, d.mistakes_made
            FROM user u
            JOIN $table d ON u.user_id = d.user_id
            ORDER BY d.time_score ASC
            LIMIT 10";
    $result = $conn->query($sql);

    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
    $conn->close();
?>