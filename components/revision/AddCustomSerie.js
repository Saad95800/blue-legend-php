import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

export default class AddCustomSerie extends Component {

  constructor(props){
    super(props);

    let expressions = [];
    this.state = {
      expressions: expressions
    }
  }

  componentDidMount(){

      axios({
        method: 'post',
        url: '/series-revision-ajax',
        responseType: 'json',
        data: {id_text: ''}
      })
      .then((response) => {
        this.setState({series: response.data});
      })
      .catch( (error) => {
        console.log(error);
      });

  }

  render() {

    return (
      <div className="container-custom-serie container-page">
        <Row>
          <div className="main-titles">
            AJOUTER UNE SERIE PERSONNALISEE
          </div>
        </Row>
        <Row>
          <Col xs={{ size: 3, offset: 9 }} style={{textAlign: 'right', marginTop: '16px'}}>
            <Link to={'/add-custom-serie'}>
              <Button className="btn-forms">Enregistrer</Button>
            </Link>
          </Col>
        </Row>
    </div>
    );
  }
}