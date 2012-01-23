<?php
$action = (isset($_GET['action'])) ? explode('.', $_GET['action']) : '';
$cn = new PDO('mysql:dbname=opnsrce_dev;host=mysql.dev.levihackwith.com', 'opnsrce', 'Z3us1337');
if(!$action) {
    // Throw Exception here
}
function __autoload($className) {
    $controllerDir = dirname(realpath(__FILE__)) . '/controllers/';
    $modelDir = dirname(realpath(__FILE__)) . '/models/';    
    $controllerFilePath = "{$controllerDir}{$className}.php";
    $modelFilePath = "{$modelDir}{$className}.php";
    if(file_exists($controllerFilePath)) {
        require($controllerFilePath);
    } elseif(file_exists($modelFilePath)) {
        require($modelFilePath);
    } else {
        throw new Exception("Could not locate $className");
    }
}
$controllerName = $action[0] . 'Controller';
$method = (isset($action[1])) ? $action[1] : 'index';
$controller = new $controllerName($cn);
$controller->$method();
?>
