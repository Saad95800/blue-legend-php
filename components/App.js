import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './home/Home';
import TextAdd from './text-add/TextAdd';
import TextList from './text-list/TextList';
import Text from './text-list/Text';
import TextEdit from './text-list/TextEdit';
import CategoryList from './category/CategoryList';
import CategoryAdd from './category/CategoryAdd';
import Revision from './revision/Revision';
import CustomSeriesList from './revision/CustomSeriesList';
import AddCustomSerie from './revision/AddCustomSerie';
import ExpressionList from './expression/ExpressionList';
import SerieList from './serie/SerieList';
// import SwipeableRoutes from "react-swipeable-routes";

let styles = {
  mfs: {
    width: '100%', 
    height: '0px', 
    backgroundColor: '#00ba62', 
    color: 'white',
    position: 'fixed',
    top: '0px',
    zIndex: '2',
    textAlign: 'center',
    transition: 'height 0.5s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
}

export default class Appclient extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  viewMessageFlash(msg, error = false){
    let mf = document.querySelector("#message-flash");
    mf.style.height = '40px';
    mf.innerHTML = msg;
    if(error){
      mf.style.backgroundColor = 'rgb(255, 29, 22)';
    }else{
      mf.style.backgroundColor = '#00ba62';
    }
    setTimeout(function(){
      mf.style.height = '0px';
      mf.style.padding = '0px';
      mf.innerHTML = '';
    }, 3000);

  }

  render() {

    let data = this.props.data;
    data.app = 'client';

    return (
      <BrowserRouter>
            <div className="body-container">
                <div id="message-flash" style={styles.mfs}></div>
                
                <div className="container-app">
                
                  <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper">
                          <Route 
                            path="/app" 
                            render={(props) => { return <Home {...props} 
                            data={data} 
                            />}} 
                          />
                          <Route 
                            path="/accueil" 
                            render={(props) => { return <Home {...props} 
                            data={data} 
                            />}} 
                          />
                          <Route 
                            path="/ajout-texte" 
                            render={(props) => { return <TextAdd {...props} 
                            data={data} 
                            viewMessageFlash={this.viewMessageFlash} 
                            />}} 
                          />
                          <Route 
                            path="/texte-liste" 
                            render={(props) => { return <TextList {...props} 
                            data={data} 
                            />}} 
                          />
                          <Route 
                            path="/textes/category/:id_category" 
                            render={(props) => { return <TextList {...props} 
                            data={data} 
                            />}} 
                          />
                          <Route 
                            path="/categories-liste" 
                            render={(props) => { return <CategoryList {...props} 
                            data={data} 
                            />}} 
                          />
                          <Route 
                            path="/categorie-ajout" 
                            render={(props) => { return <CategoryAdd {...props} 
                            data={data} 
                            viewMessageFlash={this.viewMessageFlash} 
                            />}} 
                          />
                          <Route 
                            path="/texte/:id_texte" 
                            render={ (props) => { return <Text {...props} 
                            data={data} 
                            viewMessageFlash={this.viewMessageFlash} 
                            />} } 
                          />    
                          {/* <SwipeableRoutes> */}
                            <Route 
                              path="/revision" render={(props) => { return <Revision {...props}
                              data={data}
                              step={'text-list'}
                               />}} 
                            />
                            <Route
                              path="/revision-serie-list/text/:id_text" 
                              render={(props) => { return <Revision {...props} 
                              data={data} 
                              step={'serie-list'} 
                              />}} 
                            />
                            <Route 
                              path="/revision-content/text/:id_text/serie/:id_serie" 
                              render={(props) => { return <Revision {...props} 
                              data={data} 
                              step={'content-review'} 
                              />}} 
                            />
                            <Route 
                              path="/revision-mode/texte/:id_texte/serie/:id_serie/content/:num_content" 
                              render={(props) => { return <Revision {...props} 
                              data={data} 
                              step={'mode'} 
                              />}} 
                            />
                            <Route 
                              path="/revision-btn-begin/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode" 
                              render={(props) => { return <Revision {...props} 
                              data={data} 
                              step={'btn-begin'} 
                              />}} 
                            />
                            <Route 
                              path="/revision-serie/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode" 
                              render={(props) => { return <Revision {...props} 
                              data={data} 
                              step={'serie'} 
                              />}} 
                            />
                            <Route 
                              path="/custom-series-list" 
                              render={ (props) => { return <AddCustomSerie {...props} 
                              data={data} 
                               />} } 
                            />
                            <Route 
                              path="/add-custom-serie" 
                              render={ (props) => { return <AddCustomSerie {...props} 
                              data={data} 
                               />} } 
                            />
                            <Route 
                              path="/expressions" 
                              render={ (props) => { return <ExpressionList {...props} 
                              data={data} 
                               />} } 
                            />
                            <Route
                              path="/series" 
                              render={ (props) => { return <SerieList {...props} 
                              
                              data={data} />} } 
                            />
                          {/* </SwipeableRoutes> */}
                          <Route 
                            path="/texte-edit/:id_texte"
                            render={ (props) => { return <TextEdit viewMessageFlash={this.viewMessageFlash.bind} {...props} 
                            data={data} 
                            />} }
                          />
                  </AnimatedSwitch>
                  </div>
                <Route 
                  render={ (props) => { return <NavBar {...props} data={{url: this.props.data.url}}/>} }
                />
            </div>
      </BrowserRouter>
    );
  }
}