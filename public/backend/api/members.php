<?php
require_once __DIR__ . '/../middlewares/cors.php';
require_once __DIR__ . '/../config/db.php';

//require_once "auth.php";

//$user = requireAuth();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$pdo = getDB();

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;
$action = $_GET['action'] ?? null;

try {
    if ($method === 'GET' && !$id) {
        $stmt = $pdo->query("SELECT * FROM members ORDER BY sort_order ASC");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header("X-Total-Count: " . count($data));
        echo json_encode($data, JSON_UNESCAPED_UNICODE);

    } elseif ($method === 'GET' && $id) {
        $stmt = $pdo->prepare("SELECT * FROM members WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);

    } elseif ($method === 'POST' && $action === 'reorder') {
        $body = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE members SET sort_order = ? WHERE id = ?");
        foreach ($body['order'] as $index => $id) {
            $stmt->execute([$index + 1, $id]);
        }
        echo json_encode(['success' => true]);

    } elseif ($method === 'POST') {
        $body = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO members (name, role, bio, photo, sort_order) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$body['name'], $body['role'], $body['bio'], $body['photo'], $body['sort_order'] ?? 0]);
        $body['id'] = $pdo->lastInsertId();
        echo json_encode($body, JSON_UNESCAPED_UNICODE);

    } elseif ($method === 'PUT') {
        $body = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE members SET name=?, role=?, bio=?, photo=?, sort_order=? WHERE id=?");
        $stmt->execute([$body['name'], $body['role'], $body['bio'], $body['photo'], $body['sort_order'] ?? 0, $id]);
        echo json_encode($body, JSON_UNESCAPED_UNICODE);

    } elseif ($method === 'DELETE') {
        $stmt = $pdo->prepare("DELETE FROM members WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['id' => $id]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}