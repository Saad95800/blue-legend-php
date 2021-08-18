<?php

namespace App\Model;
use lib\Model;
use \App\Traits\FunctionTrait;

class ExpressionManager extends Model {
    use FunctionTrait;

    public function getRecordExpressions($id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * 
                    FROM bl_record_expression as a
                    INNER JOIN bl_expression as b
                    ON b.id_expression = a.fk_id_expression
                    WHERE fk_id_user = :id_user
                    AND deleted = 0";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $record_expressions = $req->fetchAll(\PDO::FETCH_ASSOC);

            if($record_expressions){
                $return = $record_expressions;
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

    public function checkExpressionExist($english_value){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_expression WHERE english_value = :english_value";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':english_value', trim(html_entity_decode($_POST['english_value'])) );
            $req->execute();
            $expression = $req->fetchAll(\PDO::FETCH_ASSOC);

            if (count($expression) > 0) {
                $retour = $expression[0];
            }else{
                $retour = false;
            }

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function checkRecordExpressionExist($id_expression){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_record_expression WHERE fk_id_expression = :id_expression AND deleted = 0";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_expression', $id_expression);
            $req->execute();
            $record_expression = $req->fetchAll(\PDO::FETCH_ASSOC);

            if (count($record_expression) > 0) {
                $retour = $record_expression[0];
            }else{
                $retour = false;
            }

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function saveExpression($french_val, $english_val){

        try {

            $this->dbh->beginTransaction();

            $sql = "INSERT INTO `bl_expression`(`french_value`, `english_value`, `created_at`, `updated_at`) 
                    VALUES (:french_value, :english_value, :created_at, :updated_at)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':french_value', FunctionTrait::replaceSpecialChars( html_entity_decode($french_val) ) );
            $req->bindValue(':english_value', $english_val);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $result = $req->execute();
            if ($result) {
                $retour = true;
            }else{
                $retour = false;
            }

            $this->insertLog('text-view', 2, 'Ajout d\'une nouvelle expression d\'id : '.$this->dbh->lastInsertId());

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function saveRecordExpression($data){

        try {

            $this->dbh->beginTransaction();

            $sql = "INSERT INTO `bl_record_expression`(`user_value`, `created_at`, `updated_at`, `fk_id_expression`, `fk_id_text`, `fk_id_serie`, `fk_id_user`) 
                    VALUES (:user_value, :created_at, :updated_at, :fk_id_expression, :fk_id_text, :fk_id_serie, :fk_id_user)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':user_value', $data['french_value']);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $req->bindValue(':fk_id_expression', $data['id_expression']);
            $req->bindValue(':fk_id_text', $data['id_text']);
            $req->bindValue(':fk_id_serie', $data['id_serie']);
            $req->bindValue(':fk_id_user', $data['id_user']);
            $result = $req->execute();
            if ($result) {
                $retour = $this->dbh->lastInsertId();
            }else{
                $retour = false;
            }

            $this->insertLog('text-view', 2, 'Ajout d\'une nouvelle expression utilisateur enregistrée d\'id : '.$this->dbh->lastInsertId());

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function createSerie($name_serie, $id_text, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "INSERT INTO `bl_serie`(`name_serie`, `fk_id_text`, `fk_id_user`) 
                    VALUES (:name_serie, :fk_id_text, :fk_id_user)";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':name_serie', $name_serie);
            $req->bindValue(':fk_id_text', $id_text);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if ($result) {
                $retour = $this->dbh->lastInsertId();
            }else{
                $retour = false;
            }

            $this->insertLog('text-view', 2, 'Créaction d\'une nouvelle série');

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function deleteRecordExpression($id_record_expression, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "UPDATE `bl_record_expression` SET `deleted`= 1 WHERE id_record_expression = :id_record_expression AND fk_id_user = :fk_id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_record_expression', $id_record_expression);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if ($result) {
                $retour = true;
            }else{
                $retour = false;
            }

            $this->insertLog('list_expression', 4, 'Suppression d\'une expression utilisateur enregistrée');

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }
    
    public function deleteRecordExpressionsChecked($id_record_expressions, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "UPDATE `bl_record_expression` SET `deleted`= 1 WHERE id_record_expression IN (".$id_record_expressions.") AND fk_id_user = :fk_id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if ($result) {
                $retour = true;
            }else{
                $retour = false;
            }

            $this->insertLog('list_expression', 4, 'Suppression de plusieurs expressions utilisateur enregistrées');

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function updateRecordExpressionsSelected($id_record_expression, $french_value, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "UPDATE `bl_record_expression` SET `user_value`= :user_value WHERE id_record_expression = :id_record_expression AND fk_id_user = :fk_id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':user_value', $french_value);
            $req->bindValue(':id_record_expression', $id_record_expression);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if ($result) {
                $retour = true;
            }else{
                $retour = false;
            }

            $this->insertLog('list_expression', 3, 'Mise à jour d\'une expression utilisateur enregistrée d\'id : '.$id_record_expression);

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

}