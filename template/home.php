        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top header-nav-vitrine" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top"><div class="main-logo-vitrine"></div></a>
                <button class="navbar-toggler navbar-toggler-right" style="color: #6475a1;border: 1px solid #6475a1;" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav container-btn-navbar">
                        <li class="nav-item"><a class="js-scroll-trigger btn-vitrine-header display-flex-center" href="#about">Connexion</a></li>
                        <li class="nav-item"><a class="js-scroll-trigger btn-vitrine-header display-flex-center" href="#projects" id="btn-connexion-navbar">Inscription</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="container-block1">
            <div class="row">
                <div class="col-md-6 b1 d-none d-sm-block">
                    <div class="size100 display-flex-center">
                        <div class="img-block1-logo"></div>
                    </div>
                </div>
                <div class="col-md-6 b2">
                    <div class="display-flex-center size100">
                        <div class="img-block1-book"></div>
                        <p class="text-block1-msg text-border" style="margin:15px 0px">Apprend l'anglais efficacement. Par la lecture.</p>
                        <div class="js-scroll-trigger btn-vitrine-begin display-flex-center" id="btn-connexion" href="app">Commencer</div>
                    </div>
                </div>
            </div>
        </header>
        <div id="black-screen" class="display-flex-center" style="display: none;"> 
            <div id="popup-connexion" class="display-flex-center" style="display: none">
            </div>
        </div>
        <!-- Footer-->
        <footer class="footer bg-black small text-center text-white-50"><div class="container">Copyright © Your Website 2019</div></footer>
        <!-- Bootstrap core JS-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Third party plugin JS-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
        <!-- Core theme JS-->
        <script src="<?= URLROOT ?>/public/js/scripts.js"></script>
        <script>

            document.getElementById('btn-connexion').addEventListener('click', function(e){
                e.preventDefault();
                displayPopupConnexion();
            });

            document.getElementById('btn-connexion-navbar').addEventListener('click', function(e){
                e.preventDefault();
                displayPopupConnexion();
            });

            document.getElementById('popup-connexion').addEventListener('click', function(e){
                e.stopPropagation();
            });

            function displayPopupConnexion(){
                document.getElementById('black-screen').style.display = "flex";
                document.getElementById('popup-connexion').style.display = "flex";
            }

            function hidePopupConnexion(){
                document.getElementById('black-screen').style.display = "none";
                document.getElementById('popup-connexion').style.display = "none";    
            }

            function hidePopupConnexion(){
                document.getElementById('black-screen').style.display = "none";
                document.getElementById('popup-connexion').style.display = "none";    
            }

        </script>
        <script src="<?= URLROOT ?>/public/vitrine/client.js"></script>