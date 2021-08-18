<?php
if(session_status() === PHP_SESSION_NONE){
    session_start();
}
require './setup.php';

$router = new lib\Router();
// on Récupère le nom du controlleur saisi dans l'URL
$controllerName = ucfirst($router->getGet()['controller']);
$methodName = $router->getGet()['method'];
$controllerClassName = "App\\controller\\$controllerName"; // appelle le controlleur
$class = new ReflectionClass($controllerClassName);
$router->executeMethod($methodName, $class);
die;

// $destinataire = "s.rajraji@yahoo.com";
// $objet        = "Object";
// $content      = "<b>Hello world !</b>";
 
// $headers  = "";
// $headers .= "From: rs.mailpro@gmail.com\n";
// $headers .= "MIME-version: 1.0\n";
// $headers .= "Content-type: text/html; charset=utf-8\n";
 
// $result = mail($destinataire, $objet, $content, $headers);
 
// if( !$result ){
//     echo "L'envoi du mail a échoué";
// }

// var_dump($result);