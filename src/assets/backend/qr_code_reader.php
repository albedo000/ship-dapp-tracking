<?php

require "./vendor/autoload.php";

use Zxing\QrReader;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['qr-upload']) && $_FILES['qr-upload']['error'] == 0) {

        //Handling file upload

        $file_name = $_FILES['qr-upload']['name'];
        $file_type = $_FILES['qr-upload']['type'];

        $enabled_extensions = array('jpg' => 'image/jpg', 'jpeg' => 'image/jpeg', 'png' => 'image/png');

        $extension = pathinfo($file_name, PATHINFO_EXTENSION);
        if (!array_key_exists($extension, $enabled_extensions)) die('Format not supported');

        if (in_array($file_type, $enabled_extensions)) {

            $new_qr = 'upload/' . $file_name;

            move_uploaded_file($_FILES['qr-upload']['tmp_name'], $new_qr);

            //Read QR Code

            $qr_code = new QrReader($new_qr);
            $address = $qr_code->text();

            //Delete from server

            unlink($new_qr);

            $res = json_encode($address);

            echo($res);
        }
    }
} else {

    die('Error! Wrong request!');
    
}

?>
