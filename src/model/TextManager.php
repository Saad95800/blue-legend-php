<?php

namespace App\Model;
use lib\Model;

class TextManager extends Model {

    public function getTextes($id_user, $id_category){

        try {

            $this->dbh->beginTransaction();
            
            $sql2 = '';
            if($id_category != 0){
                $sql2 = " AND fk_id_category = :id_category";
            }

            $sql = "SELECT * FROM bl_text WHERE fk_id_user = :id_user ".$sql2." OR ISNULL(fk_id_user)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            if($id_category != 0){
                $req->bindValue(':id_category', $id_category);
            }
            $req->execute();
            $result = $req->fetchAll(\PDO::FETCH_ASSOC);
            if ($result) {
                $textes = $result;
            }else{
                $textes = [];
            }

            $this->dbh->commit();

            return $textes;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getTextById($id_text, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_text WHERE id_text = :id_text";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_text', $id_text);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);

            if ($result) {
                $texte = $result;
            }else{
                $texte = [];
            }

            $this->dbh->commit();

            return $texte;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getCategories($id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_category WHERE fk_id_user = :id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetchAll(\PDO::FETCH_ASSOC);
            if ($result) {
                $categories = $result;
            }else{
                $categories = [];
            }

            $this->dbh->commit();

            return $categories;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function updateTextContent($id_text, $title_text, $content_text, $id_category){

        try {

            $this->dbh->beginTransaction();
            $sql = "UPDATE `bl_text` SET `title_text`= :title_text,`content_text`= :content_text,`fk_id_category`= :fk_id_category, `updated_at`= :updated_at WHERE id_text = :id_text";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':title_text', $title_text);
            $req->bindValue(':content_text', $content_text);
            $req->bindValue(':fk_id_category', $id_category);
            $req->bindValue(':updated_at', time());
            $req->bindValue(':id_text', $id_text);
            $result = $req->execute();
            if (!$result) {
                return false;
            }

            $this->insertLog('text-edit', 3, 'Mise à jour du contenu du texte d\'id '.$id_text);

            $this->dbh->commit();

            return $result;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function saveCategory($id_user, $name_category){

        try {

            $this->dbh->beginTransaction();
            $sql = "INSERT INTO `bl_category`( `name_category`, `created_at`, `updated_at`, `fk_id_user`) 
                    VALUES (:name_category,:created_at,:updated_at,:id_user)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':name_category', $name_category);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $req->bindValue(':id_user', $id_user);
            $result = $req->execute();
            if (!$result) {
                return false;
            }

            $this->insertLog('category-add', 2, 'Enregistrement d\'une nouvelle catégorie');

            $this->dbh->commit();

            return $result;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }
    
    public function updateCategory($id_category, $name_category, $id_user){

        try {

            $this->dbh->beginTransaction();
            $sql = "UPDATE `bl_category` 
                    SET `name_category`= :name_category, `updated_at`= :updated_at, `fk_id_user`= :fk_id_user 
                    WHERE id_category = :id_category 
                    AND fk_id_user = :fk_id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':name_category', $name_category);
            $req->bindValue(':updated_at', time());
            $req->bindValue(':id_category', $id_category);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if (!$result) {
                return false;
            }

            $this->insertLog('category-add', 3, 'Mise à jour de la categorie d\'id : '.$id_category);

            $this->dbh->commit();

            return $result;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function saveText($data){

        try {

            $this->dbh->beginTransaction();
            $sql = "INSERT INTO `bl_text`(`title_text`, `content_text`, `type_text`, `file_name`, `file_name_server`, `file_name_server_link`, `slug`, `nb_page`, `fk_id_user`, `fk_id_category`, `created_at`, `updated_at`) 
                    VALUES (:title_text, :content_text, :type_text, :file_name, :file_name_server, :file_name_server_link, :slug, :nb_page, :fk_id_user, :fk_id_category, :created_at, :updated_at)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':title_text', $data['title_text']);
            $req->bindValue(':content_text', $data['content_text']);
            $req->bindValue(':type_text', $data['type_text']);
            $req->bindValue(':file_name', $data['file_name_pdf']);
            $req->bindValue(':file_name_server', $data['file_name_pdf_server']);
            $req->bindValue(':file_name_server_link', $data['file_name_server_link']);
            $req->bindValue(':slug', $data['slug']);
            $req->bindValue(':nb_page', $data['nb_page']);
            $req->bindValue(':fk_id_user', $data['id_user']);
            $req->bindValue(':fk_id_category', (isset($data['id_category']) || $data['id_categoryy'] == '' ? null : $data['id_category']));
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $result = $req->execute();
            if (!$result) {
                return false;
            }

            $id_text = $this->getLastInsertId();

            $this->insertLog('text-add', 2, 'Création d\'un nouveau texte de type '.$data['type_text']);

            $this->dbh->commit();

            
            return $id_text;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getTextesRevision($id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_text WHERE fk_id_user = :id_user OR ISNULL(fk_id_user)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetchAll(\PDO::FETCH_ASSOC);
            $newTextes = [];
            if ($result) {
                $textes = $result;
                $sql = "SELECT * FROM bl_serie WHERE fk_id_text = :id_text";
                foreach($textes as &$texte){
                    $req = $this->dbh->prepare($sql);
                    $req->bindValue(':id_text', $texte['id_text']);
                    $req->execute();
                    $series = $req->fetchAll(\PDO::FETCH_ASSOC);
                    $texte['series'] = $series;
                    if(count($series) > 0){
                        $newTextes[] = $texte;
                    }
                }
            }else{
                $newTextes = [];
            }

            $this->dbh->commit();

            return $newTextes;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function saveAncreLigne($id_text, $id_ancre){

        try {

            $this->dbh->beginTransaction();

            $sql = "UPDATE bl_text SET ancre_ligne = :id_ancre, active_page = :active_page WHERE id_text = :id_text";

            $req = $this->dbh->prepare($sql);

            $req->bindValue(':id_ancre', $_POST['id_ancre']);
            $req->bindValue(':id_text', $_POST['id_text']);
            $req->bindValue(':active_page', $_POST['active_page']);
            
            $result = $req->execute();

            if ($result) {
                $return = true;
            }else{
                $return = false;
            }

            $this->insertLog('text-view', 3, 'Ajout d\'un marque page dans le texte d\'id : '.$id_text);

            $this->dbh->commit();

            return $return;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getCategoryById($id_category){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_category WHERE id_category = :id_category";

            $req = $this->dbh->prepare($sql);

            $req->bindValue(':id_category', $id_category);
            
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);

            if ($result) {
                $return = $result;
            }else{
                $return = [];
            }

            $this->dbh->commit();

            return $return;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

}