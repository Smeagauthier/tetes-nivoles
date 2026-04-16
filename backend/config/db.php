<?php
$env = parse_ini_file(__DIR__ . '/../../.env');

function getDB() {
    static $pdo = null;

    if ($pdo === null) {
        $env = parse_ini_file(__DIR__ . '/../../.env');

        if (!$env) {
            echo json_encode(["error" => "env not loaded"]);
            exit;
        }

        try {
            $pdo = new PDO(
                "mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']};charset=utf8mb4",
                $env['DB_USER'],
                $env['DB_PASS'],
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            echo json_encode([
                "error" => "db connection failed",
                "message" => $e->getMessage()
            ]);
            exit;
        }
    }

    return $pdo;
}