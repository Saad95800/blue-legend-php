<?php

namespace App\Controller;
use lib\Controller;
use App\Model\UserManager;

class AuthenticationController extends Controller {

    public function is_connected(){

        return !empty($_SESSION['id_user']);

    }

    public function connectUserAjax(){

        if(empty($_POST)){
            echo json_encode([
                'error' => true,
                'msg' => 'Erreur de traitement'
            ]);
        }

        $um = new UserManager();
        $user = $um->getUserByEmail($_POST['email']);
        
        if($user == false){
            echo json_encode([
                'error' => true,
                'msg' => 'Cette utilisateur n\'éxiste pas'
            ]);
            die;
            
        }elseif( !password_verify($_POST['password'], $user->password_hash) ){
            echo json_encode([
                'error' => true,
                'msg' => 'Le mot de passe est incorrect'
            ]);
            die;
        }

        $_SESSION['id_user'] = $user->id_user;
        setcookie('id_user', $user->id_user, -1);
        echo json_encode([
            'error' => false,
            'msg' => 'Connexion effectuée avec succès',
            'id_user' => $user->id_user
        ]);
        die;

    }

    public function logoutAjax(){

        unset($_SESSION['id_user']);

        return true;
        die;

    }

}