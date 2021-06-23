import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class CategoryAdd extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: false,
      categoryTitle: '',
      inputBgColor: '#fff'
    }
  }

  ajoutCategory(){

    if(this.state.categoryTitle != ''){

      let formdata = new FormData()
      formdata.append('name_category', this.state.categoryTitle)
      
      axios({
        method: 'post',
        url: 'save-category-ajax',
        responseType: 'json',
        data: formdata
      })
      .then((response) => {
        console.log(response);
        if(response){
          this.setState({redirect: true});
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }else{
      this.props.viewMessageFlash('Le nom de la catégorie ne doit pas être vide.', true);
      this.setState({inputBgColor: '#ff00001a'});
      setTimeout(() => {this.setState({inputBgColor: '#fff'});}, 3000)
    }

  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/categories-liste'/>;
    }

      return (
        <div className="container-add-category container-page display-flex-center">
          <Container>
          <div className="block-category-add">
            <Row>
              <div className="main-titles">
                AJOUT DE CATEGORIE
              </div>
            </Row>
            <Row>
              <Col sm="12" style={{marginTop: '20px'}}>
                <Label for="title-category" sm={3}>Nom</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input value={this.state.categoryTitle} type="text" style={{backgroundColor: this.state.inputBgColor}} onChange={() => {this.setState({categoryTitle: document.querySelector("#title-category").value})}} autoComplete="off" id="title-category" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="btn-forms" onClick={this.ajoutCategory.bind(this)}>Ajouter</div>
              </Col>
            </Row>
            </div>
          </Container>
      </div>
      );
    }

  }