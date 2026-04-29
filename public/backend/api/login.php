<?php


header("Content-Type: application/json");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;

$SECRET_KEY = "tetes-nivoles-super-secret-key-2026-ultra-secure-987654321";

$input = json_decode(file_get_contents("php://input"), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if ($username !== "Octaveprunille" || $password !== "tetesnivoles1789") {
    http_response_code(401);
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

$payload = [
    "iss" => "tetes-nivoles-api",
    "iat" => time(),
    "exp" => time() + (60 * 60 * 24), // 24h
    "user" => [
        "role" => "admin",
        "username" => $username
    ]
];

$jwt = JWT::encode($payload, $SECRET_KEY, 'HS256');

echo json_encode([
    "token" => $jwt
]);

