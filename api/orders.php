<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function response(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

$orders = readOrders();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    response(['orders' => $orders]);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];

if ($method === 'POST') {
    $required = ['customer', 'phone', 'products', 'pickup', 'total'];
    foreach ($required as $field) {
        if (!isset($body[$field]) || trim((string) $body[$field]) === '') {
            response(['error' => "Le champ {$field} est obligatoire."], 422);
        }
    }

    $order = [
        'id' => nextOrderId($orders),
        'customer' => trim((string) $body['customer']),
        'phone' => trim((string) $body['phone']),
        'email' => trim((string) ($body['email'] ?? '')),
        'products' => trim((string) $body['products']),
        'pickup' => trim((string) $body['pickup']),
        'pickupSlot' => trim((string) ($body['pickupSlot'] ?? '')),
        'total' => round((float) $body['total'], 2),
        'status' => 'Nouvelle',
        'createdAt' => date(DATE_ATOM),
    ];
    array_unshift($orders, $order);
    writeOrders($orders);
    response(['order' => $order], 201);
}

$id = $_GET['id'] ?? '';
$index = array_search($id, array_column($orders, 'id'), true);
if ($index === false) {
    response(['error' => 'Commande introuvable.'], 404);
}

if ($method === 'PATCH') {
    $allowedStatuses = ['Nouvelle', 'En préparation', 'Prête', 'Retirée'];
    if (!in_array($body['status'] ?? '', $allowedStatuses, true)) {
        response(['error' => 'Statut invalide.'], 422);
    }
    $orders[$index]['status'] = $body['status'];
    writeOrders($orders);
    response(['order' => $orders[$index]]);
}

if ($method === 'DELETE') {
    array_splice($orders, $index, 1);
    writeOrders($orders);
    response(['success' => true]);
}

response(['error' => 'Méthode non autorisée.'], 405);
