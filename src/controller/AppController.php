<?php

namespace App\Controller;
use lib\Controller;
use lib\Router;
use App\Model\SerieManager;
use App\Model\UserManager;
use App\Model\TextManager;
use App\Controller\AuthenticationController;
use App\Model\ExpressionManager;
use \App\Traits\TextTrait;

class AppController extends Controller {
    use TextTrait;

    public function indexaction(){

        $auth = new AuthenticationController();
        if(!$auth->is_connected()){
            header('location: /');
        }
        $display['content'] = $this->_view->render( 'app.php' , []);

        include VIEW . 'layout.php';

    }

    public function getUserAjax(){

        $auth = new AuthenticationController();

        if(!$auth->is_connected()){
            echo json_encode([
                'error' => true,
                'error_code' => 1,
                'msg' => 'L\'utilisateur n\'est pas connecté'
            ]);
            die;
        }

        $id_user = $_POST['id_user'];

        $cm = new UserManager();
        $journeyList = $cm->getUserById($id_user);
        echo json_encode($journeyList);
        die;

    }

    public function saveUserAjax(){

        $cm = new UserManager();
        echo json_encode($cm->saveUser());
        die;

    }

    public function getDataHomeAjax(){

        $id_user = $_SESSION['id_user'];

        $sm = new SerieManager();
        // Récupération du nombre de série planifiée pour aujourd'hui
        $nbSeriesToday = $sm->getNbSerieToday($id_user);

        $nbMotsExprApprisToday = $sm->getNbMotsExprApprisToday($id_user);/////////////
        // Récupération du nombre de séries réalisés aujourd'hui
        $nbSerieRealiseesToday = $sm->getnbSerieRealiseesToday($id_user);

        // Récupération du nombre total de séries réalisés
        $nbSeriesTotalRealisees = $sm->getNbSeriesTotalRealisees($id_user);

        $nbMotsExprTotalAppris = $sm->getNbMotsExprTotalAppris($id_user);///////////
        // $nbMotsExprTotalAppris = '-';
        $data = [
            'nbSeriesToday' => $nbSeriesToday,
            'nbSerieRealiseesToday' => $nbSerieRealiseesToday,
            'nbMotsExprApprisToday' => $nbMotsExprApprisToday,
            'nbSeriesTotalRealisees' => $nbSeriesTotalRealisees,
            'nbMotsExprTotalAppris' => $nbMotsExprTotalAppris
        ];
        
        echo json_encode($data);
        die;

    }

    public function getDataNavbarAjax(){

        $um = new UserManager();

        $user = $um->getUserById($_SESSION['id_user']);

        echo json_encode($user);
        die;

    }

    public function getTextesAjax(){

        $tm = new TextManager();

        $id_category = 0;
        if(isset($_POST['id_category'])){
            $id_category = $_POST['id_category'];
        }
        $textes = $tm->getTextes($_SESSION['id_user'], $id_category);

        echo json_encode($textes);
        die;

    }

    public function getCategoriesAjax(){

        $tm = new TextManager();
        $categories = $tm->getCategories($_SESSION['id_user']);

        echo json_encode($categories);
        die;

    }
    public function getTextAjax(){

        $tm = new TextManager();
        $em = new ExpressionManager();
        
        $texte = $tm->getTextById($_POST['id_text'], $_SESSION['id_user']);
        $recordExpressions = $em->getRecordExpressions($_SESSION['id_user'], $_POST['id_text']);

        $textContentArea = $this->textHoverWord([
            'textContent' => $texte['content_text'],
            'recordexpressions' => $recordExpressions]);

        $texte['textContentArea'] = $textContentArea;

        echo json_encode($texte);
        die;

    }

    public function updateTextAjax(){

        $tm = new TextManager();

        $result = $tm->updateTextContent($_POST['id_text'], $_POST['title_text'], $_POST['content_text'], $_POST['id_category']);

        echo json_encode([
            'result' => $result
        ]);
        die;

    }

    public function saveCategoryAjax(){

        $tm = new TextManager();

        $result = $tm->saveCategory($_SESSION['id_user'], $_POST['name_category']);

        echo json_encode([
            'result' => $result
        ]);
        die;

    }

    public function saveTextAjax(){

        $tm = new TextManager();

        $data = [
            'id_user' => $_SESSION['id_user'],
            'title_text' => $_POST['title_text'],
            'content_text' => $_POST['content_text'],
            'id_category' => $_POST['id_category'],
            'type_text' => $_POST['type_text'],
            'file_name_pdf' => $_POST['file_name_pdf'],
            'file_name_pdf_server' => $_POST['file_name_pdf_server'],
            'slug' => $_POST['slug'],
        ];

        $result = $tm->saveText($data);

        echo json_encode([
            'result' => $result
        ]);
        die;

    }

    
    public function uploadFilePdfAjax(){

        $upload_html = false;
        $file_name = time();
        mkdir("public/uploads/".$file_name, 0700);
        mkdir("public/uploads/".$file_name."/html", 0700);
        $target_dir = "public/uploads/".$file_name."/";
        $target_file = $target_dir . $file_name . '.pdf';

        if($_FILES["file"]["type"] != 'application/pdf'){
            echo json_encode([
                'result' => false,
                'msg' => 'Veuillez choisir un fichier .pdf'
            ]);
            die;
        }

        $result = move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

        $msg = 'Echec lors du chargement du fichier';
        $file = [];

        if($result == 1){
            $msg = 'Fichier chargé avec succès !';
            $file = [
                'file_name_pdf' => basename($_FILES["file"]["name"]),
                'file_name_pdf_server' => $file_name.'.pdf'
            ];

            $file_name;

            // debug('C:\Program Files\poppler-0.68.0\bin\pdftohtml -c -s "'.ROOT.$file_name.'.pdf" "'.ROOT.'\public\uploads\\'.$file_name.'\html\\'.$file_name.'.html"');
            $r =  proc_open(
                'C:\Program Files\poppler-0.68.0\bin\pdftohtml -c -s "'.ROOT.'\public\uploads\\'.$file_name.'\\'.$file_name.'.pdf" "'.ROOT.'\public\uploads\\'.$file_name.'\html\\'.$file_name.'.html"',
                [],
                $pipes,
                null,
                null,
                ['bypass_shell' => true]
            );
            // if(gettype($result) == 'resource'){
            //     $upload_html = true;
            // }

        }

        echo json_encode([
            'result' => $result,
            'msg' => $msg,
            'file' => $file
        ]);

        die;

    }

    public function getHtmlPage(){
        // Initialize a file URL to the variable
        $url = 'https://naturalnewsblogs.com/best-ways-to-boost-your-immune-system/';
        $file_name = basename($url).'.html';
        if(file_put_contents( $file_name,file_get_contents($url))) {
            move_uploaded_file(ROOT.'', 'public/pages/'. time() . '.pdf');
            echo "File downloaded successfully";
        }
        else {
            echo "File downloading failed.";
        }
    }

    public function textesRevisionAjax(){

        $tm = new TextManager();

        $result = $tm->getTextesRevision($_SESSION{'id_user'});

        // debug($result);
        echo json_encode($result);
        die;

    }

    public function seriesRevisionAjax(){

        $tm = new SerieManager();

        $result = $tm->getSeriesRevision($_SESSION{'id_user'}, $_POST['id_text']);

        echo json_encode($result);
        die;

    }

    public function getSerieByIdAjax(){

        $tm = new SerieManager();

        $result = $tm->getSerieById($_SESSION{'id_user'}, $_POST['id_text'], $_POST['id_serie']);

        echo json_encode($result);
        die;

    }

    public function saveDataserie(){

        // debug($_POST);
        $sm = new SerieManager();

        $data = [
            'id_user' => $_SESSION['id_user'],
            'duration' => $_POST['duration'],
            'id_histoserie' => $_POST['id_histoserie'],
            'id_serie'=> $_POST['id_serie'],
            'id_expression'=> $_POST['id_expression'],
            'result'=> ($_POST['result']== false ? 0 : 1),
        ];

        $histoserie = [];
        $id_histoserie = 0;

        if($data['id_histoserie'] == 0){
            $id_histoserie = $sm->createHistoSerie($_SESSION['id_user'], $_POST['id_serie']);
        }else{
            $id_histoserie = $_POST['id_histoserie'];
        }

        $data['id_histoserie'] = $id_histoserie;
        $dataserie = $sm->createDataSerie($data);

        // debug($id_histoserie);
        echo json_encode([
            'id_histoserie' => $id_histoserie
        ]);
        die;

    }
    
    public function updateHistoserie(){

        $sm = new SerieManager();

        $data = [
            'id_histoserie' => $_POST['id_histoserie'],
            'completed' => $_POST['completed'],
            'score' => $_POST['score'],
            'id_serie' => $_POST['id_serie'],
            'id_user' => $_SESSION['id_user']
        ];
        $result = $sm->updateHistoserie($data);

        echo json_encode([
            'result' => $result
        ]);
        die;
    }

    public function checkExpressionExistAjax(){

        $em = new ExpressionManager();

        $expression = $em->checkExpressionExist(trim(strtolower($_POST['expression'])));

        if($expression){

            $recordExpression = $em->checkRecordExpressionExist($expression['id_expression']);

            if($recordExpression){
                echo json_encode([
                    'existDb' => 'yes', 
                    'existUserSpace' => 'yes', 
                    'translation' => $expression['french_value']
                ]);
            }else{
                echo json_encode([
                    'existDb' => 'yes', 
                    'existUserSpace' => 'no', 
                    'translation' => $expression['french_value']
                ]);
            }
            die;

        }else{
            // appel de l'api de traduction de google
            $english_value = str_replace(' ', '%20',trim($_POST['expression']));
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, 'https://translation.googleapis.com/language/translate/v2/?q='.$english_value.'&source=en&target=fr&key=AIzaSyDXclEOa7zqozby4oRS_Z1q7KIzsmclaTc');
            // curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            //     'key: AIzaSyDXclEOa7zqozby4oRS_Z1q7KIzsmclaTc',
            //     'source: en',
            //     'target: fr',
            //     'Content-Type: application/json',
            //  ));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            // EXECUTE:
            $result = curl_exec($curl);

            if(!$result){die("Erreur de connexion à l'API de Google traduction");}
            curl_close($curl);

            $array_result = json_decode($result, true);
            $french_val = $array_result['data']['translations'][0]['translatedText'];
// debug($result);
            $result = $em->saveExpression($french_val, $_POST['expression']);
             if($result){
                // Insérer la nouvelle expression en base de donnée
                echo json_encode([
                    'existDb' => 'no', 
                    'existUserSpace' => 'no', 
                    'translation' => ucfirst($french_val)
                ]);                 
             }else{
                echo json_encode([
                    'error' => true, 
                    'msg' => 'Echec de l\'enregistrement en base de donnée',
                ]);
             }
            die;
        }

    }

    public function SaveExpressionAjax(){

        $em = new ExpressionManager();

        $expression = $em->checkExpressionExist(trim(strtolower($_POST['english_value'])));

        $series = $em->getSeriesByText($_POST['id_text'], $_SESSION['id_user']);

        $id_serie = 0;

        if(count($series) == 0){
            // var_dump('ici 1');
            // on crée une série et on récupère son id
            $id_serie = $em->createSerie('Serie '.(count($series)+1), $_POST['id_text'], $_SESSION['id_user']);
        }elseif(count($series) > 0){
            // var_dump('ici 2');
            foreach($series as $serie){
                if(count($serie['expressions']) < 5 ){
                    // var_dump('ici 3');
                    $id_serie = $serie['id_serie'];
                    break;
                }
            }
            if($id_serie == 0){
                var_dump('ici 4');
                // on crée une série et on récupère son id
                // var_dump('Serie '.(count($series)+1));
                // die('stop 1');
                $id_serie = $em->createSerie('Serie '.(count($series)+1), $_POST['id_text'], $_SESSION['id_user']);
                if(!$id_serie){
                    echo json_encode([
                        'error' => true, 
                        'msg' => 'Erreur de traitement',
                    ]);
                    die;
                }
            }
        }else{
            echo json_encode([
                'error' => true, 
                'msg' => 'Erreur de traitement',
            ]);
            die;   
        }
        $data = [
            'french_value' => $_POST['french_value'],
            'english_value' => $_POST['english_value'],
            'id_text' => $_POST['id_text'],
            'id_expression' => $expression['id_expression'],
            'id_user' => $_SESSION['id_user'],
            'id_serie' => $id_serie
        ];
        // die('stop 2');
        $result = $em->saveRecordExpression($data);

        if($result){
            echo json_encode([
                'error' => false, 
                'msg' => 'Enregistrement effectuée avec succès',
            ]);
            die;
        }
        echo json_encode([
            'error' => true, 
            'msg' => 'Echec de l\'enregistrement en base de donnée',
        ]);
        die;

    }

}