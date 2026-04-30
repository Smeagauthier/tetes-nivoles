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

try {

    // GET ALL
    if ($method === 'GET' && !$id) {
        $stmt = $pdo->query("SELECT * FROM books ORDER BY published_year DESC");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header("X-Total-Count: " . count($data));
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    // GET ONE
    elseif ($method === 'GET' && $id) {
        $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);
    }

    // CREATE
    elseif ($method === 'POST') {
        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            INSERT INTO books (
                title,
                subtitle,
                author,
                quote,
                description,
                cover_image,
                back_cover_image,
                published_year,
                amazon_url,
                fnac_url,
                edilivre_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $body['title'],
            $body['subtitle'] ?? null,
            $body['author'],
            $body['quote'] ?? null,
            $body['description'] ?? null,

            is_array($body['cover_image'])
                ? ($body['cover_image']['url'] ?? null)
                : ($body['cover_image'] ?? null),

            is_array($body['back_cover_image'])
                ? ($body['back_cover_image']['url'] ?? null)
                : ($body['back_cover_image'] ?? null),

            $body['published_year'] ?? null,
            $body['amazon_url'] ?? null,
            $body['fnac_url'] ?? null,
            $body['edilivre_url'] ?? null
        ]);

        $body['id'] = $pdo->lastInsertId();
        echo json_encode($body, JSON_UNESCAPED_UNICODE);
    }

    // UPDATE
    elseif ($method === 'PUT') {
        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            UPDATE books SET
                title=?,
                subtitle=?,
                author=?,
                quote=?,
                description=?,
                cover_image=?,
                back_cover_image=?,
                published_year=?,
                amazon_url=?,
                fnac_url=?,
                edilivre_url=?
            WHERE id=?
        ");

        $stmt->execute([
            $body['title'],
            $body['subtitle'] ?? null,
            $body['author'],
            $body['quote'] ?? null,
            $body['description'] ?? null,

            is_array($body['cover_image'])
                ? ($body['cover_image']['url'] ?? null)
                : ($body['cover_image'] ?? null),

            is_array($body['back_cover_image'])
                ? ($body['back_cover_image']['url'] ?? null)
                : ($body['back_cover_image'] ?? null),

            $body['published_year'] ?? null,
            $body['amazon_url'] ?? null,
            $body['fnac_url'] ?? null,
            $body['edilivre_url'] ?? null,
            $id
        ]);

        echo json_encode($body, JSON_UNESCAPED_UNICODE);
    }

    // DELETE
    elseif ($method === 'DELETE') {
        $stmt = $pdo->prepare("DELETE FROM books WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['id' => $id]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}