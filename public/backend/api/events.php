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

    // =========================
    // GET ALL EVENTS
    // =========================
    if ($method === 'GET' && !$id) {

        $stmt = $pdo->query("SELECT * FROM events ORDER BY event_date DESC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // ajouter images pour chaque event
        foreach ($events as &$event) {
            $imgStmt = $pdo->prepare("SELECT * FROM event_images WHERE event_id = ?");
            $imgStmt->execute([$event['id']]);
            $event['images'] = $imgStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        header("X-Total-Count: " . count($events));
        echo json_encode($events, JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // GET ONE EVENT
    // =========================
    elseif ($method === 'GET' && $id) {

        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($event) {
            $imgStmt = $pdo->prepare("SELECT * FROM event_images WHERE event_id = ?");
            $imgStmt->execute([$id]);
            $event['images'] = $imgStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($event, JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // CREATE EVENT
    // =========================
    elseif ($method === 'POST') {

        $body = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("
            INSERT INTO events
            (title, description, location, event_date, is_published, price, booking_url, show_name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $body['title'],
            $body['description'] ?? null,
            $body['location'] ?? null,
            $body['event_date'],
            $body['is_published'] ?? 0,
            $body['price'] ?? null,
            $body['booking_url'] ?? null,
            $body['show_name'] ?? null
        ]);

        $eventId = $pdo->lastInsertId();

        // images (optionnel)
        if (!empty($body['images'])) {
            $imgStmt = $pdo->prepare("
                INSERT INTO event_images (event_id, url, alt_text)
                VALUES (?, ?, ?)
            ");

            foreach ($body['images'] as $img) {
                $imgStmt->execute([
                    $eventId,
                    $img['url'],
                    $img['alt_text'] ?? null
                ]);
            }
        }

        echo json_encode(['id' => $eventId] + $body, JSON_UNESCAPED_UNICODE);
    }

    // =========================
    // UPDATE EVENT
    // =========================
    elseif ($method === 'PUT') {

        $body = json_decode(file_get_contents("php://input"), true);


        $stmt = $pdo->prepare("
        UPDATE events SET
            title=?,
            description=?,
            location=?,
            event_date=?,
            is_published=?,
            price=?,
            booking_url=?,
            show_name=?
        WHERE id=?
    ");

        $stmt->execute([
            $body['title'],
            $body['description'] ?? null,
            $body['location'] ?? null,
            $body['event_date'],
            !empty($body['is_published']) ? 1 : 0,
            $body['price'] ?? null,
            $body['booking_url'] ?? null,
            $body['show_name'] ?? null,
            $id
        ]);

        $pdo->prepare("DELETE FROM event_images WHERE event_id = ?")
            ->execute([$id]);

        if (!empty($body['images']) && is_array($body['images'])) {

            $imgStmt = $pdo->prepare("
            INSERT INTO event_images (event_id, url, alt_text)
            VALUES (?, ?, ?)
        ");

            foreach ($body['images'] as $img) {

                $url = is_array($img) ? $img['url'] : $img;

                $imgStmt->execute([
                    $id,
                    $url,
                    $img['alt_text'] ?? null
                ]);
            }
        }

        echo json_encode(['id' => $id] + $body, JSON_UNESCAPED_UNICODE);
    }
    // =========================
    // DELETE EVENT
    // =========================
    elseif ($method === 'DELETE') {

        // 1. supprimer images en base
        $stmt = $pdo->prepare("DELETE FROM event_images WHERE event_id = ?");
        $stmt->execute([$id]);

        // 2. supprimer event
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['id' => $id]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}