<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/inc/mailer.php';

function respond($ok, $message)
{
    http_response_code($ok ? 200 : 400);
    echo json_encode(['status' => $ok ? 'ok' : 'error', 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.');
}

$email = trim(preg_replace('/[\r\n]+/', ' ', (string) ($_POST['email'] ?? '')));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

$body = '<p>New newsletter subscriber:</p><p><b>' . htmlspecialchars($email) . '</b></p>';

$sent = send_smtp_mail('New newsletter subscriber', $body, $email);

if ($sent) {
    $welcome = '<p>Hi there,</p>'
        . '<p>Thanks for subscribing to Connect Agency&rsquo;s insights &mdash; you&rsquo;ll now get our latest annual report, ESG and BRSR updates straight to your inbox.</p>';

    send_smtp_mail(
        'You\'re subscribed — Connect Agency Insights',
        $welcome,
        null,
        '',
        $email
    );

    respond(true, 'Subscribed.');
}

respond(false, 'Sorry, something went wrong. Please try again later.');
