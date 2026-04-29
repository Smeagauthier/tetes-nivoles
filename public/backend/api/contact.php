<?php
require_once __DIR__ . '/../middlewares/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$env = parse_ini_file(__DIR__ . '/../../.env');


// =====================
// RATE LIMIT SIMPLE
// =====================
session_start();
$now    = time();
$window = 15 * 60;
$max    = 5;

if (!isset($_SESSION['contact_times'])) {
    $_SESSION['contact_times'] = [];
}

$_SESSION['contact_times'] = array_filter(
    $_SESSION['contact_times'],
    function($t) use ($now, $window) { return ($now - $t) < $window; }
);

if (count($_SESSION['contact_times']) >= $max) {
    http_response_code(429);
    echo json_encode(["error" => "Trop de messages envoyés. Réessaie plus tard."]);
    exit;
}

// =====================
// LECTURE BODY
// =====================
$body    = json_decode(file_get_contents("php://input"), true);
$prenom  = trim(isset($body['prenom'])  ? $body['prenom']  : '');
$nom     = trim(isset($body['nom'])     ? $body['nom']     : '');
$email   = trim(isset($body['email'])   ? $body['email']   : '');
$sujet   = trim(isset($body['sujet'])   ? $body['sujet']   : '');
$message = trim(isset($body['message']) ? $body['message'] : '');
$website = trim(isset($body['website']) ? $body['website'] : '');

// =====================
// HONEYPOT
// =====================
if ($website !== '') {
    http_response_code(400);
    echo json_encode(["error" => "Bot detected"]);
    exit;
}

// =====================
// VALIDATION
// =====================
if (!$prenom || !$nom || !$email || !$message) {
    http_response_code(400);
    echo json_encode(["error" => "Champs manquants"]);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Email invalide"]);
    exit;
}
if (strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(["error" => "Message trop long"]);
    exit;
}

// =====================
// INSERT DB
// =====================
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare("
        INSERT INTO contacts (prenom, nom, email, sujet, message)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$prenom, $nom, $email, $sujet, $message]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB error"]);
    exit;
}

// =====================
// ENVOI MAIL (PHPMailer + SMTP Gmail)
// =====================
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $env['MAIL_USER'];
    $mail->Password   = $env['MAIL_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($env['MAIL_USER']);
    $mail->addAddress($env['MAIL_TO']);
    $mail->addReplyTo($email, $prenom . ' ' . $nom);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = "=?UTF-8?B?" . base64_encode("🎭 Message des Têtes Nivoles - " . ($sujet ? $sujet : 'Sans sujet')) . "?=";
    $mail->Body    = "
        <div style='font-family:Arial,sans-serif;background:#070F2B;color:#fff;padding:20px;'>
            <h2 style='color:#CDA268;'>Nouveau message</h2>
            <p><b style='color:#CDA268;'>Prénom :</b> " . htmlspecialchars($prenom) . "</p>
            <p><b style='color:#CDA268;'>Nom :</b> " . htmlspecialchars($nom) . "</p>
            <p><b style='color:#CDA268;'>Email :</b> " . htmlspecialchars($email) . "</p>
            <p><b style='color:#CDA268;'>Sujet :</b> " . htmlspecialchars($sujet) . "</p>
            <hr style='border-color:#CDA268;' />
            <p style='white-space:pre-line;'>" . htmlspecialchars($message) . "</p>
        </div>
    ";

    $mail->send();

    $_SESSION['contact_times'][] = $now;
    echo json_encode(["success" => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Mail error : " . $e->getMessage()]);
}