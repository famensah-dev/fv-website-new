<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer/src/Exception.php';
    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/SMTP.php';

    header('Content-Type: application/json');

    $response = [
        'success' => false,
        'message' => ''
    ];
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $firstname = ucfirst($_POST["firstname"]);
        $lastname = ucfirst($_POST["lastname"]);
        $email = $_POST["email"];
        $message = $_POST["message"];
    
        if (empty($firstname)) {
            $response['message'] .= "First name is required.\n";
        }
        if (empty($lastname)) {
            $response['message'] .= "Last name is required.\n";
        }
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] .= "Valid email is required.\n";
        }
        if (empty($message)) {
            $response['message'] .= "Please type a message.\n";
        }
        if (empty($response['message'])) {
            $response['success'] = true;
            $response['message'] = "Form data is valid. Name: $name, Email: $email";
        }

    $subject = 'New Inquiry from '. $firstname ." ". $lastname;

    try{
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'franciscadeveloper@gmail.com';
        $mail->Password = 'bfaccwouxhspgnbx';
        $mail->Port = 465;
        $mail->SMTPSecure = 'ssl';
        $mail->setFrom($email, $firstname);
        $mail->addAddress('franciscadeveloper@gmail.com');
        $mail->Subject = ("$subject - $email");
        $mail->Body = $message;
        $mail->send();
        
        $response['success'] = true;
        $response['message'] = "Message sent! We'll get in touch!";
    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

    echo json_encode($response);

?>