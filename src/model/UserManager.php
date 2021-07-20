<?php

namespace App\Model;
use lib\Model;

class UserManager extends Model {

    public function saveUser(){

        $data = $_POST;
        if($this->checkIfEmailExist($data['email'])){
            return [
                'error' => true,
                'msg' => 'Cet email est déjà utilisé',
            ];
        }

		$sql = "INSERT INTO `bl_user`(`name_user`, `email_user`, `password_hash`, `created_at`, `updated_at`) 
                VALUES (:name_user, :email_user, :password_hash, :created_at, :updated_at)";				

		$req = $this->dbh->prepare($sql);
        $req->bindValue(':name_user', htmlentities($data['username']));
        $req->bindValue(':email_user', htmlentities($data['email']));
        $req->bindValue(':password_hash', password_hash($data['password'], PASSWORD_DEFAULT));
        $req->bindValue(':created_at', time() );
        $req->bindValue(':updated_at', time() );
        
        $result = $req->execute();

        $id_user = $this->dbh->lastInsertId();

        $this->insertLog('accueil', 2, 'Création de l\'utilisateur d\'id : '.$id_user);

        if ($result) {
            $_SESSION['id_user'] = $id_user;
            return [
                'result' => $result,
                'error' => false,
                'msg' => 'Compte crée avec succès',
                'id_user' => $id_user
            ];
        }
        return [
            'result' => $result,
            'error' => false,
            'msg' => 'Echec de la création du compte', 
        ];

    }

    public function chefIfUserExist($siret){

        $sql = "SELECT * FROM bl_user WHERE email_user = :email";

        $req = $this->dbh->prepare($sql);
        $req->bindValue(':email', htmlentities($siret));
        $req->execute();
        $user = $req->fetch(\PDO::FETCH_OBJ);
        if ($user) {
            return true;
        }
        return false;
    
    }

    public function getUserByEmail($siret){			

        $sql = "SELECT * FROM bl_user WHERE email_user = :email";

        $req = $this->dbh->prepare($sql);
        $req->bindValue(':email', htmlentities($siret));
        $req->execute();
        $user = $req->fetch(\PDO::FETCH_OBJ);
        if ($user) {
            return $user;
        }
        return false;
    }

    public function checkIfEmailExist($email){			

        $sql = "SELECT * FROM bl_user WHERE email_user = :email";

        $req = $this->dbh->prepare($sql);
        $req->bindValue(':email', htmlentities($email));
        $req->execute();
        $user = $req->fetch(\PDO::FETCH_OBJ);
        if ($user) {
            return true;
        }
        return false;
    }

    public function getUserById($id_user){

        $sql = "SELECT * FROM bl_user WHERE id_user = :id_user";

        $req = $this->dbh->prepare($sql);
        $req->bindValue(':id_user', htmlentities($id_user));
        $req->execute();
        $user = $req->fetch(\PDO::FETCH_OBJ);
        if ($user) {
            return $user;
        }
        return false;

    }

}