import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import {capitalizeFirstLetter, insertLog} from './../functions';

export default class CategoryList extends Component {

  constructor(props){
    
    super(props);
    
    let categories = []

    this.state = {
      categories: categories
    }
    
    insertLog(axios, 6, 1)

  }

  componentDidMount(){
    fetch("/categories-ajax", {
      method: 'post',
    })
    .then((resp) => resp.json())
    .then( (categories) => {
      console.log(categories);
      this.setState({categories: categories});
    });
  }

  render() {

    let categories = this.state.categories.map((category, index) => {
      let categoryName = category.name_category.length > 20 ? category.name.substring(0, 20)+'...' : category.name_category;
        return  <div key={index}>
                  <Link
                    to={'/categorie-edit/'+category.id_category}
                    className={this.props.classItem}
                    key={index}>
                    <div key={category.id_category} className="list-hover-item">
                      <div className="display-flex-center" style={{textAlign: 'center', height: '40px'}}>{ capitalizeFirstLetter(categoryName) }</div>
                      <div style={{'textAlign': 'center'}}>
                        <span className="img-item-liste-category"></span>
                      </div>
                    </div>
                  </Link>
                </div>;
    });

      return (
        <div className="container-list-category container-page display-flex-center">
          <div style={{width: '100%'}}>
          <div className="block-category-list">
            <Row>
              <div className="main-titles">
                LISTE DES CATEGORIES
              </div>
            </Row>
            <Row>
              <Col xs={{ size: 3, offset: 9 }} style={{textAlign: 'right', marginTop: '16px'}}>
              <Link to={'/categorie-ajout'}>
                <Button className="btn-forms">Ajouter une catégorie</Button>
              </Link>
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
              {categories}
            </Row>
            </div>
          </div>
      </div>
      );
    }
  }