<?php
$env = parse_ini_file(__DIR__ . '/../../.env');

function getDB() {
    global $env;
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']};charset=utf8mb4",
            $env['DB_USER'],
            $env['DB_PASS'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
    return $pdo;
}