<?php

namespace App\Model;
use lib\Model;

class SerieManager extends Model {

    public function getNbSerieToday($id_user){

        try {

            $this->dbh->beginTransaction();


            $sql = "SELECT count(*) as nb FROM bl_planning WHERE date > :today_midnight AND completed = 0 AND fk_id_user = :id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':today_midnight', strtotime('today midnight'));
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $nbSeriesToday = $result['nb'];
            }else{
                $nbSeriesToday = 0;
            }


            $this->dbh->commit();

            return $nbSeriesToday;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getNbMotsExprApprisToday($id_user){

        try {

            $this->dbh->beginTransaction();


            $sql = "SELECT count(fk_id_expression) as nb FROM bl_data_serie WHERE created_at > :today_midnight AND result = 1 AND fk_id_user = :id_user GROUP BY fk_id_expression";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':today_midnight', strtotime('today midnight'));
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $nbExprApprisToday = $result['nb'];
            }else{
                $nbExprApprisToday = 0;
            }


            $this->dbh->commit();

            return $nbExprApprisToday;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getNbMotsExprTotalAppris($id_user){

        try {

            $this->dbh->beginTransaction();


            $sql = "SELECT count(fk_id_expression) as nb FROM bl_data_serie WHERE result = 1 AND fk_id_user = :id_user GROUP BY fk_id_expression";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $nbExprApprisToday = $result['nb'];
            }else{
                $nbExprApprisToday = 0;
            }


            $this->dbh->commit();

            return $nbExprApprisToday;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getnbSerieRealiseesToday($id_user){

        try {

            $this->dbh->beginTransaction();


            $sql = "SELECT count(*) as nb FROM bl_histo_serie WHERE created_at > :today_midnight AND fk_id_user = :id_user";

            $req = $this->dbh->prepare($sql);
            $req->bindValue(':today_midnight', strtotime('today midnight'));
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $nbSerieRealiseesToday = $result['nb'];
            }else{
                $nbSerieRealiseesToday = 0;
            }


            $this->dbh->commit();

            return $nbSerieRealiseesToday;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getNbSeriesTotalRealisees($id_user){

        try {

            $this->dbh->beginTransaction();


        
            // Récupération du nombre total de séries réalisés
            $sql = "SELECT count(*) as nb FROM bl_histo_serie WHERE fk_id_user = :id_user";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->execute();
            $result = $req->fetch(\PDO::FETCH_ASSOC);
            if ($result) {
                $nbSeriesTotalRealisees = $result['nb'];
            }else{
                $nbSeriesTotalRealisees = 0;
            }

            $this->dbh->commit();

            
            return $nbSeriesTotalRealisees;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getSeriesRevision($id_user, $id_text){

        try {

            $this->dbh->beginTransaction();

            // Récupération du nombre total de séries réalisés
            $sql = "SELECT* FROM bl_serie WHERE fk_id_user = :id_user AND fk_id_text = :id_text";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->bindValue(':id_text', $id_text);
            $req->execute();
            $result = $req->fetchAll(\PDO::FETCH_ASSOC);
            if ($result) {
                $series = $result;
            }else{
                $series = [];
            }

            $this->dbh->commit();

            
            return $series;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function getSerieById($id_user, $id_text, $id_serie){

        try {

            $this->dbh->beginTransaction();

            // Récupération du nombre total de séries réalisés
            $sql = "SELECT* FROM bl_serie WHERE fk_id_user = :id_user AND id_serie = :id_serie AND fk_id_text = :id_text";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':id_user', $id_user);
            $req->bindValue(':id_serie', $id_serie);
            $req->bindValue(':id_text', $id_text);
            $req->execute();
            $serie = $req->fetch(\PDO::FETCH_ASSOC);
            if ($serie) {
                $sql = "SELECT * 
                        FROM bl_record_expression as a
                        INNER JOIN bl_expression as b
                        ON b.id_expression = a.fk_id_expression
                        WHERE fk_id_user = :id_user 
                        AND fk_id_serie = :id_serie 
                        AND fk_id_text = :id_text";

                    $req = $this->dbh->prepare($sql);
                    $req->bindValue(':id_user', $id_user);
                    $req->bindValue(':id_serie', $id_serie);
                    $req->bindValue(':id_text', $id_text);
                    $req->execute();
                    $serie['record_expression'] = $req->fetchAll(\PDO::FETCH_ASSOC);                    

            }else{
                $serie = [];
            }

            $this->dbh->commit();

            
            return $serie;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function createDataSerie($data){

        try {

            $this->dbh->beginTransaction();

            // Récupération du nombre total de séries réalisés
            $sql = "INSERT INTO `bl_data_serie`(`result`, `duration`, `created_at`, `updated_at`, `fk_id_expression`, `fk_id_serie`, `fk_id_histo_serie`, `fk_id_user`) 
                    VALUES (:result, :duration, :created_at, :updated_at, :fk_id_expression, :fk_id_serie, :fk_id_histo_serie, :fk_id_user)";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':result', $data['result']);
            $req->bindValue(':duration', $data['duration']);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $req->bindValue(':fk_id_expression', $data['id_expression']);
            $req->bindValue(':fk_id_serie', $data['id_serie']);
            $req->bindValue(':fk_id_histo_serie', $data['id_histoserie']);
            $req->bindValue(':fk_id_user', $data['id_user']);
            $result = $req->execute();
            if ($result) {               
                $id_histoserie = $this->dbh->lastInsertId();
            }else{
                $id_histoserie = false;
            }

            $this->dbh->commit();

            
            return $id_histoserie;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }

    public function createHistoSerie($id_user, $id_serie){

        try {

            $this->dbh->beginTransaction();

            // Récupération du nombre total de séries réalisés
            $sql = "INSERT INTO `bl_histo_serie`(`score`, `completed`, `created_at`, `updated_at`, `fk_id_serie`, `fk_id_user`) 
                    VALUES (:score, :completed, :created_at, :updated_at, :fk_id_serie, :fk_id_user)";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':score', 0);
            $req->bindValue(':completed', 0);
            $req->bindValue(':created_at', time());
            $req->bindValue(':updated_at', time());
            $req->bindValue(':fk_id_serie', $id_serie);
            $req->bindValue(':fk_id_user', $id_user);
            $result = $req->execute();
            if ($result) {               
                $id_histoserie = $this->dbh->lastInsertId();
            }else{
                $id_histoserie = false;
            }

            $this->dbh->commit();

            
            return $id_histoserie;
            
        } catch (PDOException $e) {
            $this->dbh->rollback();
            return false;
        }

    }
    
    public function updateHistoserie($data){

        try {

            $this->dbh->beginTransaction();

            $sql = "UPDATE `bl_histo_serie` 
                    SET `score`= :score, `completed`= :completed, `updated_at`= :updated_at, `fk_id_serie`= :fk_id_serie WHERE id_histo_serie = :id_histo_serie AND `fk_id_user`= :fk_id_user";
    
            $req = $this->dbh->prepare($sql);
            $req->bindValue(':score', $data['score']);
            $req->bindValue(':completed', ($data['completed'] == true ? 1 : 0));
            $req->bindValue(':updated_at', time());
            $req->bindValue(':fk_id_serie', $data['id_serie']);
            $req->bindValue(':fk_id_user', $data['id_user']);
            $req->bindValue(':id_histo_serie', $data['id_histoserie']);
            $result = $req->execute();
            if ($result) {               
                $retour = $result;
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