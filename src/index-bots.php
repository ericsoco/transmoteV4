<?php
// ini_set('display_errors', 'On');
// error_reporting(E_ALL);

// If url passed via query string, use it.
$url = $_GET['url'];

if ($url) {

	// normalize
	if (strrpos($url, $_SERVER['HTTP_HOST']) === false) {
		$url = $_SERVER['HTTP_HOST'] . $url;
	}
	if (strrpos($url, 'http') === false) {
		$url = 'http://' . $url;
	}

} else {

	// Fallback to current url.
	$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

}

// TODO: should escape url (security), but that breaks the call
// when testing on local, with status: failUnsafe; on prod as well.
// $response = exec('./renderer/phantomjs ./renderer/phantom-renderer.js "' . escapeshellarg($url) . '"', $output, $exitVal);
$response = exec('./renderer/phantomjs ./renderer/phantom-renderer.js "' . $url . '"', $output, $exitVal);

echo(implode('', $output));
