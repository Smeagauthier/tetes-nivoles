<?php

ini_set('display_errors', 0); // important en prod
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../middlewares/cors.php';
require_once __DIR__ . '/../config/db.php';

//require_once "auth.php";

$user = requireAuth();

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$pdo = new PDO(
    "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4",
    $_ENV['DB_USER'],
    $_ENV['DB_PASS']
);

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {

    // =========================
    // GET LIST HEROES (react-admin compatible)
    // =========================
    if ($method === 'GET' && !$id) {

        $stmt = $pdo->query("SELECT * FROM hero ORDER BY id ASC");
        $heroes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($heroes as &$hero) {

            $imgStmt = $pdo->prepare("
                SELECT url, position
                FROM hero_images
                WHERE hero_id = ?
                ORDER BY position ASC
            ");
            $imgStmt->execute([$hero['id']]);
            $hero['images'] = $imgStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        header("X-Total-Count: " . count($heroes));
        echo json_encode($heroes, JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // GET ONE HERO
    // =========================
    elseif ($method === 'GET' && $id) {

        $stmt = $pdo->prepare("SELECT * FROM hero WHERE id = ?");
        $stmt->execute([$id]);
        $hero = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($hero) {
            $imgStmt = $pdo->prepare("
                SELECT url, position
                FROM hero_images
                WHERE hero_id = ?
                ORDER BY position ASC
            ");
            $imgStmt->execute([$id]);
            $hero['images'] = $imgStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($hero, JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // CREATE HERO
    // =========================
    elseif ($method === 'POST') {

        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            INSERT INTO hero (title, subtitle, is_active)
            VALUES (?, ?, ?)
        ");

        $stmt->execute([
            $body['title'],
            $body['subtitle'],
            $body['is_active'] ?? 1
        ]);

        $heroId = $pdo->lastInsertId();

        if (!empty($body['images']) && is_array($body['images'])) {

            $imgStmt = $pdo->prepare("
                INSERT INTO hero_images (hero_id, url, position)
                VALUES (?, ?, ?)
            ");

            foreach ($body['images'] as $index => $img) {

                $url = is_array($img) ? $img['url'] : $img;

                $imgStmt->execute([
                    $heroId,
                    $url,
                    $img['position'] ?? $index
                ]);
            }
        }

        echo json_encode(['id' => $heroId], JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // UPDATE HERO
    // =========================
    elseif ($method === 'PUT') {

        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            UPDATE hero
            SET title = ?,
                subtitle = ?,
                is_active = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $body['title'],
            $body['subtitle'],
            $body['is_active'] ?? 1,
            $id
        ]);

        // reset images
        $pdo->prepare("DELETE FROM hero_images WHERE hero_id = ?")
            ->execute([$id]);

        if (!empty($body['images']) && is_array($body['images'])) {

            $imgStmt = $pdo->prepare("
                INSERT INTO hero_images (hero_id, url, position)
                VALUES (?, ?, ?)
            ");

            foreach ($body['images'] as $index => $img) {

                $url = is_array($img) ? $img['url'] : $img;

                $imgStmt->execute([
                    $id,
                    $url,
                    $img['position'] ?? $index
                ]);
            }
        }

        echo json_encode(['id' => $id], JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // DELETE HERO
    // =========================
    elseif ($method === 'DELETE') {

        $pdo->prepare("DELETE FROM hero_images WHERE hero_id = ?")
            ->execute([$id]);

        $pdo->prepare("DELETE FROM hero WHERE id = ?")
            ->execute([$id]);

        echo json_encode(['id' => $id]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}