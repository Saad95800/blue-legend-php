import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import {capitalizeFirstLetter, limit15str, insertLog} from './../functions';
import {root} from './../setup'

export default class TextList extends Component {

  constructor(props){
    super(props);

    let textes = [];
    let id_category = '';
    
    this.state = {
      textes: textes,
      id_category: id_category,
      categories: [],
      category_selected: ''
    }

    insertLog(axios, 4, 1)
    this.props.setColorNavItem('texte-liste')
    
  }

  componentDidMount(){

    let data = {};
    let formdata = new FormData()
    let url = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "");
      
    if( url.indexOf('textes/category') != -1 ){
      formdata.append('id_category', url.split("/")[3])
    }

    axios({
      method: 'post',
      url: '/textes-ajax',
      responseType: 'json',
      data: formdata
    })
    .then((response) => {
      let textes = []
      for(let text of response.data.textes){
        text.selected = true
        textes.push(text)
      }
      this.setState({
        textes: textes, 
        categories: response.data.categories,
        id_category:url.split("/")[3]
      });
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  changeCategory(){
    this.setState({category_selected: $("#select-category-text-list").val()})
  }

    render() {

        let textes = this.state.textes.map((texte, index) => {
          if(texte.fk_id_category == this.state.category_selected  || this.state.category_selected == ''){
            let textTitle = limit15str(texte.title_text)
            let folder = texte.file_name_server.replace('.pdf', '')
            let cssItem = {background: 'url('+root+'public/img/main_img.png) -2349px -200px no-repeat'}
            if(texte.type_text == 'pdf'){
              cssItem = {boxShadow: '0px 0px 10px 0px grey', background: 'url('+root+'/public/uploads/'+folder+'/html/'+folder+'001.png'+') no-repeat', backgroundSize: '100%'}
            }
            return  <div className="col-6 col-sm-2" key={index}>
                      <Link
                        to={'/texte/'+texte.id_text}
                        key={index}>
                        <div key={index} className="list-hover-item">
                          <div className="display-flex-center title-text-item">{ capitalizeFirstLetter(textTitle) }</div>
                          <div style={{'textAlign': 'center'}}>
                          <span className="img-item-liste-texte" style={cssItem}></span>
                          </div>
                        </div>
                      </Link>
                    </div>;            
          }

        });

        let options = []
        options = this.state.categories.map((category, index)=>{
          return <option key={index} value={category.id_category}>{category.name_category}</option>
        })
      return (
              <div className="container-text-list container-page display-flex-center">
                <div style={{width: '100%'}}>
                  <Row>
                    <div className="main-titles">
                      LISTE DES TEXTES
                    </div>
                  </Row>
                  <div className="row">
                  <div className="col-sm-6">
                    <span>Catégories : </span>
                    <select className="form-control" id="select-category-text-list" style={{marginTop: '20px'}} value={this.state.category_selected} onChange={()=>{this.changeCategory()}}>
                      <option value="">---</option>
                      {options}
                    </select>
                  </div>
                    <div className="col-sm-6" style={{textAlign: 'right', marginTop: '36px'}}>
                    <Link to={'/ajout-texte'}>
                      <Button className="btn-forms">Ajouter un texte</Button>
                    </Link>
                    </div>
                  </div>
                  <Row style={{marginTop: '20px'}}>
                    {textes}
                  </Row>
                </div>
              </div>
      );
    }

  }