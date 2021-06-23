<?php

namespace lib;

class Router {

    private $get = [];

    private $post = [];

    public function __construct(){

        if(isset($_GET)){
            if(!empty($_GET)){
                $this->get = $_GET;
            }
        }
        if(isset($_POST)){
            if(!empty($_POST)){
                $this->post = $_POST;
            }
        }
        if(isset($_SESSION)){
            if(!empty($_SESSION)){
                $this->session = $_SESSION;
            }
        }
    }

    public function executeMethod($methodName, $class){
            $instance = $class->newInstance();
            $method = $class->getMethod($methodName);
            $method->invoke($instance);
    }

    public function getGet(){
        return $this->get;
    }

    public function getPost(){
        return $this->post;
    }

    public function getSession(){
        return $this->session;
    }

}