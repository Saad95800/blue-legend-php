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

    public function insertLogAjax(){

        $comment = '';
        if(isset($_POST['comment'])){
            $comment = $_POST['comment'];
        }
        $result = $this->insertLog($_POST['page_log'], $_POST['id_type_log'], $comment);

        $error = true;
        $msg = 'Echec de l\'enregistrement';

        if($result){
            $error = false;
            $msg = 'Enregistrement effectué avec succès';
        }

        echo json_encode([
            'error' => $error,
            'msg' => $msg
        ]);
        die;

    }
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
        $categories = $tm->getCategories($_SESSION['id_user']);

        echo json_encode([
            'textes' => $textes,
            'categories' => $categories
        ]);
        die;

    }

    public function getCategoriesAjax(){

        $tm = new TextManager();
        $categories = $tm->getCategories($_SESSION['id_user']);

        echo json_encode($categories);
        die;

    }

    public function getCategoryAjax(){

        $tm = new TextManager();
        $categories = $tm->getCategoryById($_POST['id_category']);

        echo json_encode($categories);
        die;

    }
    
    public function getTextAjax(){

        $tm = new TextManager();
        $em = new ExpressionManager();
        
        $texte = $tm->getTextById($_POST['id_text'], $_SESSION['id_user']);
        // $recordExpressions = $em->getRecordExpressions($_SESSION['id_user']);

        // $textContentArea = $this->textHoverWord([
        //     'textContent' => $texte['content_text'],
        //     'recordexpressions' => $recordExpressions
        // ]);

        // $texte['textContentArea'] = $textContentArea;
        $texte['textContentArea'] = $texte['content_text'];

        echo json_encode($texte);
        die;

    }

    public function getExpressionsByUserAjax(){

        $em = new ExpressionManager();
        $recordExpressions = $em->getRecordExpressions($_SESSION['id_user']);

        echo \json_encode([
            'error' => false,
            'record_expressions' => $recordExpressions
        ]);
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

    public function updateCategoryAjax(){

        $tm = new TextManager();

        $result = $tm->updateCategory($_POST['id_category'], $_POST['name_category'], $_SESSION['id_user']);

        echo json_encode([
            'result' => $result
        ]);
        die;

    }

    public function saveTextAjax(){

        $tm = new TextManager();

        $nbpage = 0;

        if($_POST['type_text'] == 'pdf'){
            for($i = 1; $i <= 2000; $i++){
                if(!file_exists(ROOT.'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.$_POST['id_file'].DIRECTORY_SEPARATOR.'html'.DIRECTORY_SEPARATOR.$_POST['id_file'].'-'.$i.'.html')){
                    $nbpage = $i;
                    break;
                }
                $i++;
            }     
            $nbpage = $nbpage - 2;
        }

        if($_POST['type_text'] == 'link'){
            $nbpage = 1;
        }

        // debug($nbpage);
        $data = [
            'id_user' => $_SESSION['id_user'],
            'title_text' => $_POST['title_text'],
            'content_text' => $_POST['content_text'],
            'id_category' => $_POST['id_category'],
            'type_text' => $_POST['type_text'],
            'file_name_pdf' => $_POST['file_name_pdf'],
            'file_name_pdf_server' => $_POST['file_name_pdf_server'],
            'slug' => $_POST['slug'],
            'file_html' => $_POST['file_html'],
            'nb_page' => $nbpage,
            'file_name_server_link' => $_POST['file_name_server_link']
        ];

        $id_text = $tm->saveText($data);

        if($id_text){

            $links = '
                <link rel="stylesheet" href="'.URLROOT.'/public/css/file.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
                <script src="'.URLROOT.'/public/pages/web/jquery-2.2.2.min.js"></script>
                <script src="'.URLROOT.'/public/js/file.js"></script>
            ';
            $add_html = '
            <div id="id-text" style="display:none;"></div>
            <div id="cal1">&nbsp;</div>
            <div id="cal2">&nbsp;</div>
            <div id="popupTrad" class="popup-trad">
                <div class="arrow-popuptrad"></div>
                <div id="translationPopupText" class="text-center">
                  <div style="margin: 10px;font-weight:normal;display:none;" id="selText"></div>
                  <textarea style="margin: 10px;font-size: 1.5em;font-weight: bold;width: 95%;border: none;overflow: hidden;font-family: cursive;" id="frenchValue"></textarea>
                </div>
                <div class="display-flex-center" id="container-btn-save-expression">
                  <div id="btnSaveExpression" class="display-flex-center" style="background-color: #6592ff"></div>
                </div>
            </div>
            ';

            if($_POST['type_text'] == 'pdf'){
                for($i = 1; $i <= $nbpage; $i++){
                    $file_root = ROOT.'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.$_POST['id_file'].DIRECTORY_SEPARATOR.'html'.DIRECTORY_SEPARATOR.$_POST['id_file'].'-'.$i.'.html';
                    $texte = file_get_contents($file_root);
                    $texte = preg_replace('/\<\/head\>/', $links.'</head>', $texte, 1);
                    $texte = preg_replace('/\<\/body\>/', $add_html.'</body>', $texte, 1);
                    file_put_contents($file_root, $texte);                
                }                
            }elseif($_POST['type_text'] == 'link'){
                $file_root = ROOT.'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'links'.DIRECTORY_SEPARATOR.$_POST['file_name_server_link'];
                $texte = file_get_contents($file_root);
                $texte = preg_replace('/\<\/head\>/', $links.'</head>', $texte, 1);
                $texte = preg_replace('/\<\/body\>/', $add_html.'</body>', $texte, 1);
                file_put_contents($file_root, $texte);      
            }

            // $em = new ExpressionManager();
            // $recordExpressions = $em->getRecordExpressions($_SESSION['id_user'], $id_text);

            // $texte = $this->textHoverWord([
            //     'textContent' => $texte,
            //     'recordexpressions' => $recordExpressions
            // ]);
        }

        $result = false;
        if(strlen($id_text) > 0){
            $result = true;
        }

        echo json_encode([
            'result' => $result
        ]);
        die;

    }

    
    public function uploadFilePdfAjax(){

        $upload_html = false;
        $file_name = uniqid();
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
            $process =  proc_open(
                'C:\Program Files\poppler-0.68.0\bin\pdftohtml -c "'.ROOT.'\public\uploads\\'.$file_name.'\\'.$file_name.'.pdf" "'.ROOT.'\public\uploads\\'.$file_name.'\html\\'.$file_name.'.html"',
                [],
                $pipes,
                null,
                null,
                ['bypass_shell' => true]
            );
        }   

        $file_html = $target_dir . 'html/' . $file_name . '-1.html';

        echo json_encode([
            'result' => $result,
            'msg' => $msg,
            'file' => $file,
            'file_html' => $file_html
        ]);

        die;

    }

    public function saveHtmlPage(){
        // Initialize a file URL to the variable
        // debug($_POST);
        $url = $_POST['url'];
        
        $uniqid = uniqid();
        
        $file_name = ROOT.'public/uploads/links/'.$uniqid.'.html';
        if(file_put_contents( $file_name,file_get_contents($url))) {
            // move_uploaded_file(ROOT.'public/uploads/temp/', ROOT.'public/uploads/links/'.$uniqid.'.html');
            // echo "File downloaded successfully";
        }
        else {
            // echo "File downloading failed.";
        }
        echo json_encode(
            [
                'error' => false,
                'url' => URLROOT.'/public/uploads/links/'.$uniqid.'.html',
                'file_name_server' => $uniqid.'.html'
            ]
        );
    }

    public function textesRevisionAjax(){

        $tm = new TextManager();

        $result = $tm->getTextesRevision($_SESSION['id_user']);

        // debug($result);
        echo json_encode($result);
        die;

    }

    public function seriesRevisionAjax(){

        $tm = new SerieManager();

        $result = $tm->getSeriesRevision($_SESSION['id_user'], $_POST['id_text']);

        echo json_encode($result);
        die;

    }

    public function getSerieByIdAjax(){

        $tm = new SerieManager();

        $result = $tm->getSerieById($_SESSION['id_user'], $_POST['id_text'], $_POST['id_serie']);

        echo json_encode($result);
        die;

    }

    public function getSeriesByUserAjax(){

        $tm = new SerieManager();

        $result = $tm->getSeriesByUser($_SESSION['id_user']);

        echo json_encode($result);
        die;

    }

    public function saveDataserie(){

        $sm = new SerieManager();

        $data = [
            'id_user' => $_SESSION['id_user'],
            'duration' => $_POST['duration'],
            'id_histoserie' => $_POST['id_histoserie'],
            'id_serie'=> $_POST['id_serie'],
            'id_expression'=> $_POST['id_expression'],
            'result'=> ($_POST['result'] == 'false' ? 0 : 1),
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

        $expression = $em->checkExpressionExist(trim(strtolower($_POST['english_value'])));

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
            $english_value = str_replace(' ', '%20',trim($_POST['english_value']));
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

            if(!$result){die("Erreur de connexion au service de traduction");}
            curl_close($curl);

            $array_result = json_decode($result, true);
            $french_val = $array_result['data']['translations'][0]['translatedText'];
// debug($french_val);
            $result = $em->saveExpression($french_val, $_POST['english_value']);
             if($result){
                // Insérer la nouvelle expression en base de donnée
                echo json_encode([
                    'existDb' => 'no', 
                    'existUserSpace' => 'no', 
                    'translation' => $french_val
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
        // debug($_POST);
        $em = new ExpressionManager();
        $sm = new SerieManager();

        $expression = $em->checkExpressionExist(trim($_POST['english_value']));
        
        $series = $sm->getSeriesByText($_POST['id_text'], $_SESSION['id_user']);

        $id_serie = 0;

        if(count($series) == 0){
            // on crée une série et on récupère son id
            $id_serie = $em->createSerie('Serie '.(count($series)+1), $_POST['id_text'], $_SESSION['id_user']);
        }elseif(count($series) > 0){
            foreach($series as $serie){
                if(count($serie['expressions']) < 5 ){
                    $id_serie = $serie['id_serie'];
                    break;
                }
            }
            if($id_serie == 0){
                // on crée une série et on récupère son id
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

        $result = $em->saveRecordExpression($data);

        if($result){
            echo json_encode([
                'error' => false, 
                'msg' => 'Enregistrement effectuée avec succès'
            ]);
            die;
        }
        echo json_encode([
            'error' => true, 
            'msg' => 'Echec de l\'enregistrement en base de donnée'
        ]);
        die;

    }

    public function SaveAncreLigne(){

        $tm = new TextManager();

        $result = $tm->saveAncreLigne($_POST['id_text'], $_POST['id_ancre'], $_POST['active_page']);

        $error = true;
        $msg = 'Echec de l\'enregistrement de l\'ancre';

        if($result){
            $error = false;
            $msg = 'Enregistrement effectué avec succès !';
        }

        echo json_encode([
            'error' => $error, 
            'msg' => $msg
        ]);
        die;

    }

    public function DeleteRecordExpressionAjax(){

        $em = new ExpressionManager();

        $res = $em->deleteRecordExpression($_POST['id_record_expression'], $_SESSION['id_user']);

        $msg = 'Echec de la suppression';
        $error = true;

        if($res){
            $msg = 'Suppression effectuée avec succès';
            $error = false;
        }

        echo json_encode([
            'error' => $error,
            'msg' => $msg
        ]);
    }

    public function DeleteRecordExpressionsCheckedAjax(){

        $em = new ExpressionManager();

        $res = $em->deleteRecordExpressionsChecked($_POST['id_record_expressions'], $_SESSION['id_user']);

        $msg = 'Echec de la suppression';
        $error = true;

        if($res){
            $msg = 'Suppression effectuée avec succès';
            $error = false;
        }

        echo json_encode([
            'error' => $error,
            'msg' => $msg,
            'record_expressions_deleted' => $_POST['id_record_expressions']
        ]);
    }

    public function UpdateRecordExpressionsSelectedAjax(){

        $em = new ExpressionManager();

        $res = $em->updateRecordExpressionsSelected($_POST['id_record_expression_selected'], $_POST['french_value'], $_SESSION['id_user']);

        $msg = 'Echec de la mise à jour';
        $error = true;

        if($res){
            $msg = 'Mise à jour effectuée avec succès';
            $error = false;
        }

        echo json_encode([
            'error' => $error,
            'msg' => $msg
        ]);
    }

}