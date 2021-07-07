<?php

namespace App\Model;
use lib\Model;

class ExpressionManager extends Model {

    public function getRecordExpressions($id_user, $id_text){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM bl_record_expression WHERE fk_id_user = :id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $record_expressions = $req->fetchAll(\PDO::FETCH_ASSOC);
            if ($record_expressions) {
                $sql = "SELECT * FROM bl_expression WHERE id_expression = :fk_id_expression";
                
                foreach($record_expressions as &$record_expression){

                    $req = $this->dbh->prepare($sql);
                    $req->bindValue(':fk_id_expression', $record_expression['fk_id_expression']);
                    $req->execute();
                    $result = $req->fetch(\PDO::FETCH_ASSOC);
                    $record_expression['expression'] = $result;
                }
                // $record_expressions = $result;
            }else{
                $record_expressions = [];
            }

            $this->dbh->commit();

            return $record_expressions;
            
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
            $req->bindValue(':english_value', $english_value);
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

            $sql = "SELECT * FROM bl_record_expression WHERE fk_id_expression = :id_expression";

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
            $req->bindValue(':french_value', html_entity_decode($french_val) );
            $req->bindValue(':english_value', $english_val);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $result = $req->execute();
            if ($result) {
                $retour = true;
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

    public function saveRecordExpression($data){

        try {

            $this->dbh->beginTransaction();

            $sql = "INSERT INTO `bl_record_expression`(`created_at`, `updated_at`, `fk_id_expression`, `fk_id_text`, `fk_id_serie`, `fk_id_user`) 
                    VALUES (:created_at, :updated_at, :fk_id_expression, :fk_id_text, :fk_id_serie, :fk_id_user)";

            $req = $this->dbh->prepare($sql);
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

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getSeriesByText($id_text, $id_user){

        try {

            $this->dbh->beginTransaction();

            $sql = "SELECT * FROM `bl_serie` WHERE fk_id_text = :id_text AND fk_id_user = :id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_text', $id_text);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $series = $req->fetchAll(\PDO::FETCH_ASSOC);
            if ($series) {
                $sql = "SELECT * 
                        FROM bl_record_expression as a
                        INNER JOIN bl_expression as b
                        ON b.id_expression  = a.fk_id_expression
                        WHERE fk_id_serie = :id_serie";
                foreach($series as &$serie){
                    $req = $this->dbh->prepare($sql);
                    $req->bindValue(':id_serie', $serie['id_serie']);
                    $req->execute();
                    $expressions = $req->fetchAll(\PDO::FETCH_ASSOC);
                    $serie['expressions'] = $expressions;
                }
                $retour = $series;
            }else{
                $retour = [];
            }

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

            $this->dbh->commit();

            return $retour;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

}