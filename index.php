<?php
if(session_status() === PHP_SESSION_NONE){
    session_start();
}
require './setup.php';

function debug($value, $die = true, $type = 1) {

    if ($type == 1) {
        echo '<pre>';
        print_r($value);
        echo '</pre>';
    } else {
        echo '<pre>';
        var_dump($value);
        echo '</pre>';
    }

    if ($die) {
        die();
    }
}

$router = new lib\Router();
// on Récupère le nom du controlleur saisi dans l'URL
$controllerName = ucfirst($router->getGet()['controller']);
$methodName = $router->getGet()['method'];
$controllerClassName = "App\\controller\\$controllerName"; // appelle le controlleur
$class = new ReflectionClass($controllerClassName);
$router->executeMethod($methodName, $class);
die;