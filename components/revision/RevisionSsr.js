import React, { Component } from 'react';
import TextListRevision from './TextListRevision';
import ContentRevision from './ContentRevision';
import ModeRevision from './ModeRevision';
import BtnBeginRevision from './BtnBeginRevision';
import { Row, Col } from 'reactstrap';

export default class RevisionSsr extends Component {

  constructor(props){
    super(props);
    
    let step = this.props.step;
    let id_texte = null;
    let num_content = null;
    let num_mode = null;
    let serie = {};
    let id_serie = 0;

    if(this.props.data.step == 'text-list'){
      step = 'text-list';
    }else if(this.props.data.step == 'serie-list'){
      step = 'serie-list';
    }else if(this.props.data.step == 'content-review'){
      step = 'content-review';
      id_texte = this.props.data.id_texte;
    }else if(this.props.data.step == 'mode'){
      step = 'mode';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
    }else if(this.props.data.step == 'btn-begin'){
      step = 'btn-begin';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
      num_mode = this.props.data.num_mode;
      serie = this.props.data.serie;
    }else if(this.props.data.step == 'serie'){
      step = 'serie';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
      num_mode = this.props.data.num_mode;
      serie = this.props.data.serie;
    }

    this.state = {  
      step: step,
      app: this.props.data.app,
      id_texte: id_texte,
      num_content: num_content,
      num_mode: num_mode,
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
  }

  render() {

    let contentStep;
    let infos;
    let stepsIcons;
    
    switch(this.state.step){
      case 'text-list':
        contentStep = <TextListRevision data={{'textes': this.props.data.textes}}/>;
        infos = <div className="text-center font-infos-revision">Quel texte souhaitez-vous réviser ?</div>;
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                    </div>;
        break;
      case 'serie-list':
        contentStep = <SerieListRevision data={{'series': this.state.series}}/>;
        infos = <div className="text-center font-infos-revision">Quel série souhaitez-vous réviser ?</div>;
        stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
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
      contentStep = <BtnBeginRevision data={this.props} id_serie={this.state.id_serie}/>;
      let mode = this.state.infos_mode[this.state.num_mode];
      infos = '';
      stepsIcons = <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '117px', left: '70px'}}>
                      <span className="img-icone-revision-texte"></span>
                      <span className="img-icone-revision-arrow"></span>
                      <span className="img-icone-revision-time"></span>
                      <span className="img-icone-revision-arrow"></span>
                    </div>;
      break;
      case 'serie':
        contentStep = <img src="/client/images/89.gif" />;
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
        contentStep = <TextListRevision data={{'textes': this.props.data.textes}}/>;
        break;
    }

    return (
            <div className="container-revision container-page">
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