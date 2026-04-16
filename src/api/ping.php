<?php
header("Content-Type: application/json");

echo json_encode([
    "ping" => "ok",
    "time" => microtime(true)
]);