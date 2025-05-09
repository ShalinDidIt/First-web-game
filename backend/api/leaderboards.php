<?php
    header('Content-Type: application/json');
    include 'db_connection.php'; // Include your database connection file

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