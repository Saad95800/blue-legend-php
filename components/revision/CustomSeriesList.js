import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

export default class CustomSeriesList extends Component {

  constructor(props){
    super(props);

    let series = [];
    if(this.props.data.app == 'server'){
      series = this.props.data.series;
    }
    this.state = {
      series: series
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

    let series = '';

    if(this.state.series.length > 0){
      series = this.state.series.map( (serie, index) => {
        let link = `/revision-mode/texte/${serie.fk_id_text}/serie/${serie.id_serie}/content/1`;
        let serieName = serie.name_serie.length > 20 ? serie.name_serie.substring(0, 20)+'...' : serie.name_serie;
        return <Link
                to={link}
                key={index}>
                  <div key={serie.id_serie} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px'}} className="hover-item">
                    <div style={{textAlign: 'center'}}>{serieName}</div>
                    <div style={{'textAlign': 'center'}}>
                    <span className="img-item-liste-texte"></span>
                    </div>  
                  </div>
                </Link>;
      });
    }

    return (
      <div className="container-custom-serie container-page">
        <Row>
          <div className="main-titles">
            SERIES PERSONNALISEES
          </div>
        </Row>
        <Row>
          <Col xs={{ size: 3, offset: 9 }} style={{textAlign: 'right', marginTop: '16px'}}>
            <Link to={'/add-custom-serie'}>
              <Button className="btn-forms">Ajouter une série</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="10" style={{width: '100%'}}>
            <Row style={{marginTop: '20px'}}>
              <div className="text-center font-infos-revision">Quel série souhaitez-vous réviser ?</div>
            </Row>
            <Row style={{marginTop: '20px'}} className="display-flex-center">
              {series}
            </Row>
          </Col>
        </Row>
    </div>
    );
  }
}