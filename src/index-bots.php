<?php
// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

/*
require 'php/vendor/autoload.php';

use JonnyW\PhantomJs\Client;

$client = Client::getInstance();
// $client->setPhantomLoader('js/phantom-renderer.js');

$request  = $client->getMessageFactory()->createRequest();
$response = $client->getMessageFactory()->createResponse();

$request->setMethod('GET');
$request->setUrl('http://local.transmote.com/');
// $request->setUrl('http://local.transmote.com/projects/vizthebay/');

$client->send($request, $response);
*/

$url = 'http://local.transmote.com/';//projects/vizthebay';
$response = exec('./renderer/phantomjs ./renderer/phantom-renderer.js "' . $url . '"', $output, $exitVal);

// TODO: should escape url (security), but that breaks the call
// when testing on local, with status: failUnsafe;
// might be ok when everything is running on transmote.com?
// $response = exec('./bin/phantomjs ./js/phantom-renderer.js "' . escapeshellarg($url) . '"', $output, $exitVal);

echo(implode('', $output));
