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

// Single-line fields must not contain header-injection newlines.
function clean_line($value)
{
    return trim(preg_replace('/[\r\n]+/', ' ', (string) $value));
}

$name    = clean_line($_POST['name'] ?? '');
$email   = clean_line($_POST['email'] ?? '');
$company = clean_line($_POST['company'] ?? '');
$service = clean_line($_POST['service'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));
$subject = clean_line($_POST['form_subject'] ?? 'New enquiry from the website contact form');

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please fill in your name, email and message.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

$rows = [
    'Name'    => $name,
    'Email'   => $email,
    'Company' => $company,
    'Service' => $service,
    'Message' => nl2br(htmlspecialchars($message)),
];

$body = '<table style="width:100%; border-collapse: collapse;">';
$shaded = false;
foreach ($rows as $label => $value) {
    if ($value === '') {
        continue;
    }
    $bg = $shaded ? ' style="background-color:#f8f8f8;"' : '';
    $shaded = !$shaded;
    $body .= "<tr{$bg}>"
        . '<td style="padding:10px; border:1px solid #e9e9e9;"><b>' . htmlspecialchars($label) . '</b></td>'
        . '<td style="padding:10px; border:1px solid #e9e9e9;">' . ($label === 'Message' ? $value : htmlspecialchars($value)) . '</td>'
        . '</tr>';
}
$body .= '</table>';

$sent = send_smtp_mail($subject, $body, $email, $name);

if ($sent) {
    $confirmation = '<p>Hi ' . htmlspecialchars($name) . ',</p>'
        . '<p>Thanks for reaching out to Connect Agency &mdash; we&rsquo;ve received your message and will be in touch within one business day.</p>'
        . '<p>Here&rsquo;s a copy of what you sent us:</p>'
        . $body;

    send_smtp_mail(
        'We\'ve received your message — Connect Agency',
        $confirmation,
        null,
        '',
        $email,
        $name
    );

    respond(true, 'Message sent.');
}

respond(false, 'Sorry, something went wrong sending your message. Please try again later.');
