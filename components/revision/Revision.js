import React, { Component } from 'react';
import TextListRevision from './TextListRevision';
import SerieListRevision from './SerieListRevision';
import ContentRevision from './ContentRevision';
import ModeRevision from './ModeRevision';
import BtnBeginRevision from './BtnBeginRevision';
import SerieRevision from './SerieRevision';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import {insertLog} from './../functions';

export default class Revision extends Component {

  constructor(props){
    super(props);

    let textes = [];
    let series = [];
    let step = this.props.step;
    let serie = {};
    let id_serie = (this.props.location.pathname.indexOf('revision-serie-list') != -1) ? this.props.location.pathname.split("/")[3] : 0;

    this.state = {
      step: step,
      app: this.props.data.app,
      textes: textes,
      series: series,
      id_texte: this.props.location.pathname.split("/")[3],
      id_serie: this.props.location.pathname.split("/")[5],
      num_content: this.props.location.pathname.split("/")[7],
      num_mode: this.props.location.pathname.split("/")[9],
      serie: serie,
      id_serie: id_serie,
      infos_content: {
        "1": "Mots",
        "2": "Expressions",
        "3": "Mots & Expressions"
      },
      infos_mode: {
        "1": "Normal",
        "2": "Contre la montre"
      }
    }

    if(this.props.location.pathname == '/revision'){
      insertLog(axios, 12, 1)
      this.props.setColorNavItem('revision')      
    }

    
  }

  componentDidMount(){

      let url = this.props.location.pathname.split("/");
      let formdata = new FormData()
      if(this.props.step == 'text-list'){
        axios({
          method: 'post',
          url: '/textes-revision-ajax',
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: formdata
        })
        .then((response) => {
          this.setState({textes: response.data});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'serie-list'){
        formdata.append('id_text', url[3])
        axios({
          method: 'post',
          url: '/series-revision-ajax',
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: formdata
        })
        .then((response) => {
          this.setState({series: response.data});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'content-review'){
        let id_texte = url[3];
        this.setState({id_texte: id_texte});
      }else if(this.props.step == 'mode'){
        let id_texte = url[3];
        let id_serie = url[5];
        let num_content = url[7];
        this.setState({id_texte: id_texte, id_serie: id_serie, num_content: num_content});
      }else if(this.props.step == 'btn-begin'){
        let num_content = url[7];
        let num_mode = url[9];
        formdata.append('id_text', url[3])
        formdata.append('id_serie', url[5])
        axios({
          method: 'POST',
          url: '/get-serie-by-id-ajax',
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: formdata
        })
        .then((response) => {
          this.setState({id_texte: id_texte, num_content: num_content, num_mode: num_mode, serie: response.data, id_serie: id_serie});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'serie'){
        let id_texte = url[3];
        let id_serie = url[5];
        let num_content = url[7];
        let num_mode = url[9];
        this.setState({id_texte: id_texte, id_serie: id_serie, num_content: num_content, num_mode: num_mode});
      }

  }

  render() {

    let contentStep;
    let infos;
    let stepsIcons;

    switch(this.state.step){
      case 'text-list':
        contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        infos = <div className="text-center font-infos-revision">Quel texte souhaitez-vous réviser ?</div>;
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                    </div>;
        break;
      case 'serie-list':
        contentStep = <SerieListRevision data={{'series': this.state.series}}/>;
        infos = <div className="text-center font-infos-revision">Quel série souhaitez-vous réviser ?</div>;
        stepsIcons = <div className="flex-column" style={{alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                      <span className="img-icone-revision-arrow"></span>
                    </div>;
        break;
      case 'content-review':
        contentStep = <ContentRevision data={this.props}/>;
        infos = '';
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                      <span className="img-icone-revision-arrow"></span>
                    </div>;
        break;
      case 'mode':
        contentStep = <ModeRevision data={this.props}/>;
        let content = this.state.infos_content[this.state.num_content];
        infos = '';
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                      <span className="img-icone-revision-arrow"></span>
                    </div>;
        break;
      case 'btn-begin':
        let id_serie = this.props.location.pathname.split("/")[9];
        contentStep = <BtnBeginRevision data={this.props} id_serie={id_serie}/>;
        let mode = this.state.infos_mode[this.state.num_mode];
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                        <span className="img-icone-revision-texte"></span>
                        <span className="img-icone-revision-arrow"></span>
                        <span className="img-icone-revision-time"></span>
                        <span className="img-icone-revision-arrow"></span>
                      </div>;
        infos = '';
        break;
      case 'serie':
        contentStep = <SerieRevision data={this.props} num_mode={this.state.num_mode} id_texte={this.state.id_texte}/>;
        infos = '';
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                        <span className="img-icone-revision-texte"></span>
                        <span className="img-icone-revision-arrow"></span>
                        <span className="img-icone-revision-time"></span>
                        <span className="img-icone-revision-arrow"></span>
                        <span className="img-icone-revision-serie"></span>
                      </div>;
        break;
      default:
      contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        break;
    }

    return (
      <div className="container-page container-revision">
        <Row>
          <div className="main-titles">
            REVISION
          </div>
        </Row>
        <Row>
          <div className="hidden-xs col-sm-2" style={{position: 'absolute'}}>
            {/* {stepsIcons} */}
          </div>
          <Col xs="12" sm="10" style={{width: '100%'}}>
            <Row style={{marginTop: '20px'}}>
              {infos}
            </Row>
            <Row style={{marginTop: '20px'}} className="display-flex-center">
              {contentStep}
            </Row>
          </Col>
        </Row>
    </div>
    );
  }
}