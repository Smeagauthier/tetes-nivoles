<?php
require_once __DIR__ . '/auth.php';

$user = requireAuth();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Aucun fichier reçu']);
    exit;
}

$type = $_POST['type'] ?? 'members';

// whitelist sécurité (IMPORTANT)
$allowedFolders = ['members', 'events', 'books', 'heros'];

if (!in_array($type, $allowedFolders)) {
    $type = 'members';
}

$allowed_types = ['image/jpeg', 'image/png', 'image/webp'];
$allowed_exts  = ['jpg', 'jpeg', 'png', 'webp'];
$max_size      = 5 * 1024 * 1024;

$file = $_FILES['file'];

if ($file['size'] > $max_size) {
    http_response_code(400);
    echo json_encode(['error' => 'Fichier trop lourd']);
    exit;
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($ext, $allowed_exts)) {
    http_response_code(400);
    echo json_encode(['error' => 'Format non autorisé']);
    exit;
}

$finfo     = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    http_response_code(400);
    echo json_encode(['error' => 'Type invalide']);
    exit;
}

// dossier dynamique
$upload_dir = __DIR__ . "/../../uploads/$type/";

if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$filename = uniqid($type . '_', true) . '.' . $ext;
$dest     = $upload_dir . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500);
    echo json_encode(['error' => 'Upload failed']);
    exit;
}

// URL publique
echo json_encode([
    'url' => "/uploads/$type/$filename"
]);