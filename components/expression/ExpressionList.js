import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class ExpressionList extends Component {

  constructor(props){
    super(props);

    let expressions = [];
    let id_serie = '';
    
    this.state = {
      expressions: expressions,
      id_serie: id_serie,
      numPages: null,
      pageNumber: 1,
      file: pdfFile,
      numPages: null,
    }

  }

  render() {

    return (
      <div className="expression-container display-flex-center">
      </div>
    );
  }

}