<?php
// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

// pass url in via ?url=foo
$url = $_GET['url'];

// TODO: should escape url (security), but that breaks the call
// when testing on local, with status: failUnsafe; on prod as well.
// $response = exec('./renderer/phantomjs ./renderer/phantom-renderer.js "' . escapeshellarg($url) . '"', $output, $exitVal);
$response = exec('./renderer/phantomjs ./renderer/phantom-renderer.js "' . $url . '"', $output, $exitVal);

echo(implode('', $output));
