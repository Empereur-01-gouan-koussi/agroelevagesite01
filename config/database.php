<?php
declare(strict_types=1);

const ORDERS_FILE = __DIR__ . '/../data/orders.json';

function ensureOrdersFile(): void
{
    $directory = dirname(ORDERS_FILE);
    if (!is_dir($directory)) {
        mkdir($directory, 0775, true);
    }

    if (!file_exists(ORDERS_FILE)) {
        file_put_contents(ORDERS_FILE, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
}

function readOrders(): array
{
    ensureOrdersFile();
    $content = file_get_contents(ORDERS_FILE);
    $orders = json_decode($content ?: '[]', true);
    return is_array($orders) ? $orders : [];
}

function writeOrders(array $orders): void
{
    ensureOrdersFile();
    file_put_contents(ORDERS_FILE, json_encode(array_values($orders), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function nextOrderId(array $orders): string
{
    $numbers = array_map(static fn (array $order): int => (int) str_replace('CMD-', '', (string) ($order['id'] ?? '0')), $orders);
    return 'CMD-' . (max($numbers ?: [0]) + 1);
}
