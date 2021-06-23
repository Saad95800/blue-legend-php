<?php

namespace App\controller;
use lib\Controller;
use App\Model\SerieManager;

class HomeController extends Controller {

    public function indexaction(){

        $journeyManager = null;
        
        $display['content'] = $this->_view->render( 'home.php' , []);

        include VIEW . 'layout.php';

    }

}