<?php

require_once __DIR__ . '/env.php';
require_once __DIR__ . '/../vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/../vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

load_env(__DIR__ . '/../.env');

/**
 * Splits a "Name <email@domain>" string into [name, email].
 */
function parse_from_header($raw)
{
    if (preg_match('/^(.*)<(.+)>$/', $raw, $m)) {
        return [trim($m[1], " \t\"'"), trim($m[2])];
    }
    return ['', trim($raw)];
}

/**
 * Sends an HTML email over the configured SMTP account.
 * Returns true on success, false on failure (details go to the PHP error log).
 */
function send_smtp_mail($subject, $htmlBody, $replyToEmail = null, $replyToName = '')
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = env('SMTP_HOST');
        $mail->Port       = (int) env('SMTP_PORT', 587);
        $mail->SMTPAuth   = true;
        $mail->Username   = env('SMTP_USER');
        $mail->Password   = env('SMTP_PASS');
        $mail->SMTPSecure = $mail->Port === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet    = 'UTF-8';

        [$fromName, $fromEmail] = parse_from_header(env('SMTP_FROM', env('SMTP_USER')));
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress(env('CONTACT_TO_EMAIL'));

        if ($replyToEmail) {
            $mail->addReplyTo($replyToEmail, $replyToName);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;

        $mail->send();
        return true;
    } catch (PHPMailerException $e) {
        error_log('SMTP mail failed: ' . $mail->ErrorInfo);
        return false;
    }
}
