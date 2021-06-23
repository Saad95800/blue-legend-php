import React, { Component } from 'react';
import axios from 'axios';
import {checkPassword} from './functions';

let styles = {
    mfs: {
      width: '100%', 
      height: '40px', 
      backgroundColor: '#00ba62', 
      color: 'white',
      position: 'relative',
      top: '0px',
      left: '0px',
      zIndex: '2',
      textAlign: 'center',
      transition: 'height 0.5s',
      display: 'none',
      alignItems: 'center',
      fontWeight: 'bold'
    }
  }

export default class ConnexionSystem extends Component {

    constructor(props){
      super(props);

      this.state = {
        viewLoginForm: true,
        viewSignUpForm: false,
        email: '',
        userName: '',
        password1: '',
        password2: '',
        passwordLogin: '',
        displayMessageFlash: 'none'
      }

      if(screen.width < 450){
        styles.mfs.top = '73px'
      }
      
    }

    componentDidMount(){
        document.getElementById('black-screen').addEventListener('click', (e) => {
            hidePopupConnexion();
            this.reset();
        })
    }

    reset(){
        this.setState({
            email: '',
            userName: '',
            password1: '',
            password2: '',
            passwordLogin: ''
        })
        this.hideMessageFlash()
    }
    viewMessageFlash(msg, error = false){
        let mf = document.querySelector("#message-flash");
        mf.style.display = 'flex';
        this.setState({displayMessageFlash: 'inline-block'});
        mf.querySelector("#message-flash-box").innerHTML = msg;
        if(error){
          mf.style.backgroundColor = 'rgb(255, 29, 22)';
        }else{
          mf.style.backgroundColor = '#00ba62';
        }
    }

    hideMessageFlash(){
        this.setState({displayMessageFlash: 'none'})
        let mf = document.querySelector("#message-flash")
        mf.style.display = 'none'
    }

    submitSignupForm(e){
        e.preventDefault()

        let formData = new FormData();
            formData.append('username', this.state.userName);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password1);

        if(this.state.email != '' &&
           this.state.userName != '' &&
           this.state.password1  != '' &&
           this.state.password2  != '' ){
          if(this.state.password1 == this.state.password2){
            let res = checkPassword(this.state.password1);
            if(Array.isArray(res)){
              this.viewMessageFlash(res[1], true);
            }else{
                console.log('save user ajax');

              axios({
                method: 'POST',
                url: '/save-user-ajax',
                responseType: 'json',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
              })
              .then((response) => {
                console.log(response);
                if(response.statusText == 'OK'){
                  if(response.data.error == true){
                    this.viewMessageFlash(response.data.msg, true);
                  }else{
                    window.localStorage.setItem('id_user', response.data.id_user);
                    window.localStorage.setItem('date_connexion', Date.now());
                    this.viewMessageFlash(response.data.msg, false, false);
                    document.location.href="/app";
                  }
                }else{
                  this.viewMessageFlash('Erreur lors de la création de l\'utilisateur', true);
                }
    
              })
              .catch( (error) => {
                console.log(error);
                this.viewMessageFlash('Erreur lors de l\'ajout', true);
              });
            }
          }else{
            this.viewMessageFlash('Les deux mots de passe doivent être identiques', true);
          }
        }else{
          this.viewMessageFlash('Tout les champs doivent être remplis.', true);
        }

    }

    submitLoginForm(e){
      
      e.preventDefault()


      if(this.state.passwordLogin  != ''){

            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.passwordLogin);

            axios({
              method: 'POST',
              url: '/connect-user-ajax',
              responseType: 'json',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: formData
            })
            .then((response) => {
              console.log(response);
              if(response.statusText == 'OK'){
                if(response.data.error == true){
                  this.viewMessageFlash(response.data.msg, true);
                }else{
                  window.localStorage.setItem('id_user', response.data.id_user);
                  window.localStorage.setItem('date_connexion', Date.now());
                  this.viewMessageFlash(response.data.msg, false, false);
                  document.location.href="/app";
                }
              }else{
                this.viewMessageFlash('Erreur lors de la tentative de connexion', true);
              }
  
            })
            .catch( (error) => {
              console.log(error);
              this.viewMessageFlash('Erreur lors de l\'ajout', true);
            });
          

      }else{
        this.viewMessageFlash('Tout les champs doivent être remplis.', true);
      }
    }
  
    displaySignUpForm(){
        console.log('view signup form')
        this.setState({viewSignUpForm: true, viewLoginForm: false});
        this.reset()
    }

    displayLoginForm(){
        console.log('view login form')
        this.setState({viewSignUpForm: false, viewLoginForm: true});
        this.reset()
    }

    render() {

        let signUpForm = '';
        let loginForm = '';
        if(this.state.viewSignUpForm === true && this.state.viewLoginForm === false){
            signUpForm =    <form id="form-signup">
                                <h1>Inscription</h1>
                                <div className="form-group">
                                    <label htmlFor="login-user-name">Prénom</label>
                                    <input type="text" value={this.state.userName} onChange={() => {this.setState({userName: document.querySelector("#login-user-name").value})}} className="form-control" id="login-user-name" placeholder="Nom de l'entreprise"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-email">Adresse email</label>
                                    <input type="email" value={this.state.email} onChange={() => {this.setState({email: document.querySelector("#login-email").value})}} className="form-control" id="login-email" placeholder="Votre email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-password1">Mot de passe</label>
                                    <input type="password" value={this.state.password1} onChange={() => {this.setState({password1: document.querySelector("#login-password1").value})}} className="form-control" id="login-password1" placeholder="Mot de passe"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-password2">Confirmation du mot de passe</label>
                                    <input type="password" value={this.state.password2} onChange={() => {this.setState({password2: document.querySelector("#login-password2").value})}} className="form-control" id="login-password2" placeholder="Confirmation du mot de passe"/>
                                    <div className="link-login" onClick={this.displayLoginForm.bind(this)}>Déjà inscrit ? Se connecter</div>
                                </div>
                                <div className="display-flex-center">
                                    <button type="submit" onClick={this.submitSignupForm.bind(this)} className="btn btn-primary" style={{backgroundColor: '#6475a1'}}>S'inscrire</button>
                                </div>
                            </form>
        }else{
            loginForm = <form id="form-signin">
                            <h1>Connexion</h1>
                            <div className="form-group">
                                <label htmlFor="siret-input">Email</label>
                                <input type="email" value={this.state.siretLogin} onChange={() => {this.setState({email: document.querySelector("#email-input").value})}} className="form-control" id="email-input" placeholder="Entrez votre Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mot de passe</label>
                                <input type="password" value={this.state.passwordLogin} onChange={() => {this.setState({passwordLogin: document.querySelector("#password1-input").value})}} className="form-control" id="password1-input" placeholder="Entrez votre mot de passe"/>
                                <div className="link-login" onClick={this.displaySignUpForm.bind(this)}>Pas encore inscrit ? Créer un compte</div>
                            </div>
                            <div className="display-flex-center">
                                <button type="submit" onClick={this.submitLoginForm.bind(this)} className="btn btn-primary" style={{backgroundColor: '#6475a1'}}>Se connecter</button>
                            </div>
                        </form>
        }
        return (
                <div style={{width: '80%'}}>
                    <div id="message-flash" style={styles.mfs}>
                        <span id="message-flash-box"style={{flex: '15'}} ></span>
                        <button type="button" onClick={this.hideMessageFlash.bind(this)} style={{flex: '1', display: this.state.displayMessageFlash}} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {loginForm}
                    {signUpForm}
                </div>
        );
      }
  
    }