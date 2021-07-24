<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Blue Legend</title>
    <link rel="icon" type="image/x-icon" href="<?= URLROOT ?>/public/assets/img/favicon.ico" />
    <!-- Font Awesome icons (free version)-->
    <script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js" crossorigin="anonymous"></script>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link rel="stylesheet" href="<?= URLROOT ?>/public/css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="<?= URLROOT ?>/public/css/index-1.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js" integrity="sha512-0bEtK0USNd96MnO4XhH8jhv3nyRF0eK87pJke6pkYf3cM0uDIhNJy9ltuzqgypoIFXw3JSuiy04tVk4AjpZdZw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Document</title>
</head>
<body id="page-top"  onload="endLoad()">
    <main id="main"><?php echo $display['content']; ?></main>

    <script>
      function endLoad(){
        // $("#container-text").find("img").css('max-width', '100%');
        // $("#container-text").find("a").click(function(e){
        //   e.preventDefault();
        // });
        // $("#react-trumbowyg").find("img").css('max-width', '100%');
        // $("#react-trumbowyg").find("a").click(function(e){
        //   e.preventDefault();
        // });
      };
    </script>
</body>
</html>