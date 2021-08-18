        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light header-nav-vitrine" id="mainNav">
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
        <section class="block2 img-vitrine-blocks display-flex-center">
            <Container class="size100">
                <div class="row display-flex-center" style="height:100%" >
                <div class="col-sm-6" style="height:100%">
                    <div class="display-flex-center size100" style="padding: 0px 20px">
                    <div class="flex-column">
                        <p class="text1-block2 text-center font-weight-bold">Qu'est-ce que Blue Legend ?</p>
                        <p class="text2-block2 text-center font-weight-bold">C'est une application web et mobile permettant d'apprendre l'anglais à travers la lecture de textes et de livres.</p>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6" style="height:100%">
                    <div style="height:100%">
                        <div class="img-vitrine-block2"></div>
                    </div>
                </div>
                </div>
            </Container>
        </section>
        <section class="block3 img-vitrine-blocks display-flex-center">
            <Container class="img-vitrine-block3 size100">
            <div class="row minH600Desktop" style="height:100%">
                <div class="col-6 offset-6 col-sm-offset-6 display-flex-center minH600Desktop" style="height:100%">
                    <div class="size100 text-border display-flex-center flex-column">
                        <p class="text1-block3 text-center font-weight-bold">Apprend en lisant tes textes et contenus préférés.</p>
                        <p class="text2-block3 text-center font-weight-bold">Choisis les livres et contenus qui te passionnent. Lis tes textes et enregistre les mots de vocabulaire et expression que tu souhaites.</p>
                    </div>
                </div>                  
            </div>
            </Container>
        </section>
        <section class="block4 img-vitrine-blocks display-flex-center">
            <Container class="size100">
            <div class="row" style="height:100%">
                <div class="col-sm-6 col-block4">
                    <div style="height:100%">
                        <div class="img-vitrine-block4"></div>
                    </div>
                </div>
                <div class="col-sm-6 col-block4">
                    <div class="size100 display-flex-center flex-column">
                        <p class="text1-block4 text-center font-weight-bold">Apprend efficacement ton vocabulaire.</p>
                        <p class="text2-block4 text-center font-weight-bold">Révise ton vocabulaire avec des séries de révision intéractives.</p>
                    </div>
                </div>        
            </div>
            </Container>
        </section>
        <section class="block5 img-vitrine-blocks display-flex-center">
            <Container class="size100">
            <div class="row" style="height:100%">
                <div class="col-6 display-flex-center" style="height:400px">
                    <div class="img-vitrine-block5"></div>
                </div>
                <div class="col-6" style="height:400px">
                <div class="size100 display-flex-center flex-column">
                    <p class="text1-block5 text-center font-weight-bold">Met-toi au défi en jouant contre la montre.</p>
                    <p class="text2-block5 text-center font-weight-bold">Tu as la possibilité de mettre au chronomètre lors de chacune de tes séries de révision afin de te mettre au défi et de voir la qualité de ton apprentissage.</p>
                </div>
                </div>                
            </div>
            </Container>
        </section>
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