<?php
$DEV_MODE = true;

$autoload = __DIR__ . '/../vendor/autoload.php';

if (!file_exists($autoload)) {
    die(json_encode([
        "error" => "autoload not found",
        "path" => $autoload
    ]));
}

require_once $autoload;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$SECRET_KEY = "tetes-nivoles-super-secret-key-2026-ultra-secure-987654321";

function getBearerToken() {
    $auth = null;

    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } else {
        $headers = getallheaders();
        $auth = $headers['Authorization'] ?? $headers['authorization'] ?? null;
    }

    if (!$auth) return null;

    if (preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
        return $matches[1];
    }

    return null;
}

function requireAuth() {
    global $SECRET_KEY;

    if ($_SERVER['HTTP_HOST'] === 'localhost') {
        return (object)["id" => 1];
    }

    $token = getBearerToken();

    if (!$token) {
        http_response_code(401);
        echo json_encode(["error" => "No token"]);
        exit;
    }

    try {
        return JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
    } catch (Exception $e) {
        http_response_code(403);
        echo json_encode(["error" => "Invalid token"]);
        exit;
    }
}