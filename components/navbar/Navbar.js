import React, { Component } from 'react';
import NavItem from './NavItem';
import axios from 'axios';
import {capitalizeFirstLetter} from '../functions';

export default class NavBar extends Component {

  constructor(props){

    super(props);
    let username = '';

    this.state = {
      username: username,
      items:[
        // {
        //     url:"/ajout-texte",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-ajout-texte",
        //     id:"item-menu-add",
        //     style: {},
        //     isSelected: false
        // },
        {
            url:"/texte-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-lecture",
            id:"item-menu-text",
            style: {},
            isSelected: false,
            title: 'Textes',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-48px', color: 'white'}
        },
        // {
        //     url:"/categorie-ajout",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-categories",
        //     id:"item-menu-add-category",
        //     style: {},
        //     isSelected: false
        // },
        {
            url:"/categories-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-categories",
            id:"item-menu-categories",
            style: {},
            isSelected: false,
            title: 'Catégories',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-60px', color: 'white'}
        },
        {
            url:"/revision",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-revision",
            id:"item-menu-revision",
            style: {},
            isSelected: false,
            title: 'Révision',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-51px', color: 'white'}
        },
        {
            url:"/expressions",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-expression",
            id:"item-menu-expression",
            style: {},
            isSelected: false,
            title: 'Expressions',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-64px', color: 'white'}
        },
        // {
        //     url:"/series",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-serie",
        //     id:"item-menu-serie",
        //     style: {},
        //     isSelected: false,
        //     title: 'Séries',
        //     cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-44px', color: 'white'}
        // },
        // {
        //     url:"/planning",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-planning",
        //     id:"item-menu-planning",
        //     style: {},
        //     isSelected: false
        // },
        // {
        //     url:"/statistiques",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-statistiques",
        //     id:"item-menu-statistiques",
        //     style: {},
        //     isSelected: false
        // }
      ],
      itemsMobile:[
        {
          url:"/accueil",
          classContainer:"bloc-btn-menu",
          classItem:"menu-item nav-item-left",
          id:"item-menu-accueil-mobile",
          style: {width: '80px', height: '68px'},
          isSelected: false,
          title: 'Dashboard',
          cssTitle: {position: 'absolute', marginTop: '32px', marginLeft: '-36px', color: 'white', fontSize: '9px'}
        },
        {
            url:"/texte-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-lecture",
            id:"item-menu-text",
            style: {},
            isSelected: false,
            title: 'Textes',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-48px', color: 'white'}
        },
        {
            url:"/categories-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-categories",
            id:"item-menu-categories",
            style: {},
            isSelected: false,
            title: 'Catégories',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-60px', color: 'white'}
        },
        {
            url:"/revision",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-revision",
            id:"item-menu-revision",
            style: {},
            isSelected: false,
            title: 'Révision',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-51px', color: 'white'}
        },
        {
            url:"/expressions",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-expression",
            id:"item-menu-expression",
            style: {},
            isSelected: false,
            title: 'Expressions',
            cssTitle: {position: 'absolute', marginTop: '58px', marginLeft: '-64px', color: 'white'}
        },
        // {
        //     url:"/info-user",
        //     classContainer:"bloc-btn-menu-left",
        //     classItem:"menu-item-left nav-item-left",
        //     id:"item-menu-info-user",
        //     style: {},
        //     isSelected: false,
        //     title: 'Infos Utilisateur',
        // },
        // {
        //     url:"/parametres",
        //     classContainer:"bloc-btn-menu-left",
        //     classItem:"menu-item-left nav-item-left",
        //     id:"item-menu-parametres",
        //     style: {},
        //     isSelected: false,
        //     title: 'Paramètres',
        // }
      ],
      itemsLeft:[
        {
            url:"/accueil",
            classContainer:"bloc-btn-menu-left",
            classItem:"menu-item-left nav-item-left",
            id:"item-menu-accueil",
            style: {},
            isSelected: false,
            title: 'Dashboard',
            cssTitle: {position: 'absolute', marginTop: '32px', marginLeft: '-36px', color: 'white', fontSize: '9px'}
        },
        // {
        //     url:"/info-user",
        //     classContainer:"bloc-btn-menu-left",
        //     classItem:"menu-item-left nav-item-left",
        //     id:"item-menu-info-user",
        //     style: {},
        //     isSelected: false,
        //     title: 'Infos Utilisateur',
        // },
        // {
        //     url:"/parametres",
        //     classContainer:"bloc-btn-menu-left",
        //     classItem:"menu-item-left nav-item-left",
        //     id:"item-menu-parametres",
        //     style: {},
        //     isSelected: false,
        //     title: 'Paramètres',
        // }
      ],
      url_courante: this.props.data.url,
      menuMobileView: false
    }
    
  }

  componentDidMount(){
    axios({
      method: 'post',
      url: '/get-data-navbar-ajax',
      responseType: 'json',
      data: {}
    })
    .then((response) => {
      console.log(response);
        this.setState({
          username: response.data.name_user
        });
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  colorClickItem(event){
    
    let newItems = this.state.items.map((item) =>{
      if(item.id == event.target.id){
        item.isSelected = true;
        this.setState({url_courante: item.url})
      }else{
        item.isSelected = false;
      }
      return item;
    });
    this.setState({items: newItems})   

  }

  colorHoverItem(event){
    if(event.target.parentElement.style.backgroundColor != 'rgb(32, 96, 250)'){
      event.target.parentElement.style.backgroundColor = 'rgb(32, 96, 250)';
    }
  }

  colorMouseOutItem(event){
    if(event.target.parentElement.style.backgroundColor == 'rgb(32, 96, 250)'
        && window.location.href.split('/')[3] != event.target.href.split('/')[3]){
      event.target.parentElement.style.backgroundColor = 'rgb(59, 116, 254)';
    }
  }

  displayMenuMobile(event){
    console.log(this.state.menuMobileView);
    if(this.state.menuMobileView == true){
      this.setState({menuMobileView: false});
    }else{
      this.setState({menuMobileView: true});
    }
  }

  render() {

    let navitems = this.state.items.map((item) =>{
      return             <NavItem
                            url={item.url}
                            url_courante={this.state.url_courante}
                            classContainer={item.classContainer}
                            classItem={item.classItem}
                            id={item.id}
                            style={item.style}
                            isSelected={item.isSelected}
                            title={item.title}
                            cssTitle={item.cssTitle}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            position="top"
                            key={item.id}
                          />
    });
    let navitemsMobile = this.state.itemsMobile.map((item) =>{
      return             <NavItem
                            url={item.url}
                            url_courante={this.state.url_courante}
                            classContainer={item.classContainer}
                            classItem={item.classItem}
                            id={item.id}
                            style={item.style}
                            isSelected={item.isSelected}
                            title={item.title}
                            cssTitle={item.cssTitle}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            position="top"
                            key={item.id}
                          />
    });
    navitemsMobile.push(
      <NavItem
        url={'/logout'}
        url_courante={this.state.url_courante}
        classContainer={'bloc-btn-menu-right'}
        classItem={'menu-item nav-vitrine'}
        id={'item-logout'}
        style={{position: 'absolute', bottom: '55px'}}
        isSelected={false}
        colorClickItem={this.colorClickItem.bind(this)}
        colorHoverItem={() => {}}
      />
    )
    let navitemsLeft = this.state.itemsLeft.map((item) =>{
      return             <NavItem
                            url={item.url}
                            url_courante={this.state.url_courante}
                            classContainer={item.classContainer}
                            classItem={item.classItem}
                            id={item.id}
                            style={item.style}
                            isSelected={item.isSelected}
                            title={item.title}
                            cssTitle={item.cssTitle}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            position="left"
                            key={item.id}
                          />
    });

    let displayMenuMobile = {left: '-80px'};
    if(this.state.menuMobileView == true){
      displayMenuMobile = {left: '0px'};
    }
    return (
      <div>
        <nav className="menu-mobile" style={displayMenuMobile}>
          {navitemsMobile}
        </nav>
        <nav className="navbar-home-mobile">
          <div className="bloc-btn-menu-mobile ml10" onClick={this.displayMenuMobile.bind(this)}>
            <div className="menu-item nav-accueil" id="item-menu-home-mobile">

            </div>
          </div>
        </nav>
        <nav className="navbar-home">
            <NavItem
                            url={'/'}
                            url_courante={this.state.url_courante}
                            classContainer={'bloc-btn-menu-vitrine'}
                            classItem={'menu-item-vitrine nav-vitrine'}
                            id={'item-vitrine'}
                            style={''}
                            isSelected={false}
                            colorClickItem={this.colorClickItem.bind(this)}
                            colorHoverItem={() => {}}
                          />
            {navitems}
            <NavItem
                            url={'/logout'}
                            url_courante={this.state.url_courante}
                            classContainer={'bloc-btn-menu-right'}
                            classItem={'menu-item nav-vitrine'}
                            id={'item-logout'}
                            style={''}
                            isSelected={false}
                            colorClickItem={this.colorClickItem.bind(this)}
                            colorHoverItem={() => {}}
                          />
            <div className="display-flex-center" style={{justifyContent: 'left', color: '#fff', minWidth: '150px', height: '74px', padding: '7px 10px', textAlign: 'center', float: 'right'}} id="username">
              <div className="navbar-img-user"></div>
              <div style={{marginLeft: '8px', fontFamily: 'cursive'}}>{capitalizeFirstLetter(this.state.username)}</div>
            </div>
        </nav>
        <nav className="navbar-home-left">
          {navitemsLeft}
        </nav>
        <div className="block-corner-radius">
          <div className="corner-radius"></div>
        </div>
      </div>
    );

  }
}
