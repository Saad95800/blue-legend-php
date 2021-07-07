import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col} from 'reactstrap';
import {root} from './../setup'
import { Link } from 'react-router-dom';

export default class Text extends Component {

  constructor(props){
    super(props);
    this.state = {
      texte: {},
      texteContent: '',
      contentTextArea: '',
      categories: [],
      selText: '',
      french_value: '',
      msgBtnSave: 'Enregistrer',
      colorBtnSave: '#6592ff',
      textCategory: '',
      wysiwyg_bg_color: '#fff',
      type_text: '',
      active_page: 1,
      heightContainerIframePdf: '500px',
      zoom: 1.92
    }

      this.inputTitleText = document.querySelector("#title-text");
      this.selectCategory = document.querySelector("#select-category-text");

      let formdata = new FormData();
      formdata.append('id_text', this.props.location.pathname.split("/")[2])
      axios({
        method: 'POST',
        url: '/get-texte-ajax',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formdata
      })
      .then((response) => {
        let text = response.data;
        this.setState({
          texte: text,
          texteContent: text.content_text,
          contentTextArea: text.textContentArea,
          textTitle: text.title_text,
          textCategory: text.fk_id_category,
          type_text: text.type_text,
          active_page: parseInt(text.active_page)
        });
      })
      .catch( (error) => {
        console.log(error);
      });     
    
  }

  componentDidMount(){
    // console.log('componentDidMount')
    // console.log($("#container-iframe-pdf"))
    // console.log(($(window).height()-130)+'px')
    // $("#container-iframe-pdf").css('height', ($(window).height()-130)+'px')
    this.setState({heightContainerIframePdf: ($(window).height()-130)+'px'})
  }

  changePage(action){

    if(action == 'previous'){
      if(parseInt(this.state.active_page) > 1){
        this.setState({active_page: parseInt(this.state.active_page) - 1}) 
      }
    }else{
      if(parseInt(this.state.active_page) < parseInt(this.state.texte.nb_page) ){
        this.setState({active_page: parseInt(this.state.active_page) + 1})
      }
    }  

    document.querySelector("#container-iframe-pdf").scrollTo(0, 0)
    
  }

  zoonIn(){
    this.setState({zoom: this.state.zoom + 0.06})
  }

  zoonOut(){
    this.setState({zoom: this.state.zoom - 0.06})
  }

  render() {

      let text = '';
      if(this.type_text || this.state.type_text == 'text'){

        let src = root+"/public/pages/text.html";
        text = <div>
                      <div className="display-flex-right" style={{marginTop: '20px'}}>
                        <Link
                            to={"/texte-edit/"+this.state.texte.id_text}>
                              <div className="btn-forms">Editer</div>
                        </Link>
                      </div>

                      <div 
                        id="container-text"
                        style={{marginTop: '20px'}}>
                        <iframe
                          id="container-text-iframe" 
                          data-textcontent={this.state.contentTextArea}
                          data-textid={this.state.texte.id_text}
                          src={src}
                          style={{width: '100%', height: '1000px'}}
                        ></iframe>                        
                      </div>

                    </div>;
      }else if(this.state.type_text == 'pdf'){
        console.log(this.state.texte);
        /*let src = root+"/public/pages/web/viewer.html?file="+this.state.texte.file_name_server.replace('public/pages/web/', '');*/
        let fns = this.state.texte.file_name_server.replace(".pdf", "")

        // let src = root+'public/uploads/'+fns+"/"+this.state.texte.file_name_server; Affiche le PDF original
        let ancre = ''
        if( (this.state.texte.ancre_ligne != null) && (this.state.active_page == this.state.texte.active_page) ){
          ancre = '#ancre-'+this.state.texte.ancre_ligne
        }
        let src = root+'public/uploads/'+fns+'/html/'+fns+'-'+this.state.active_page+'.html'+ancre;
        text = 
        <div id="container-iframe-pdf" style={{height: this.state.heightContainerIframePdf}}>
          <div className="container-btn-page">
            <div id="btn-page-previous"  className="arrow-btn-page" onClick={() => { this.changePage('previous')}} ></div>
            <div id="btn-page-next"  className="arrow-btn-page" onClick={() => { this.changePage('next')}} ></div>
            <div id="view-active-page" data-active_page={this.state.active_page}>{this.state.active_page} / {this.state.texte.nb_page}</div>
            <div id="pdf-zoom-out" onClick={() => {this.zoonOut()}}></div>
            <div id="pdf-zoom-in" onClick={() => {this.zoonIn()}}></div>
          </div>
          <iframe
            className="iframe-pdf" 
            id="iframe-pdf" 
            data-textid={this.state.texte.id_text}
            data-id_ancre={this.state.texte.ancre_ligne}
            data-texte={JSON.stringify(this.state.texte)}
            src={src}
            style={{zoom: '0.75', transform: 'scale('+this.state.zoom+')', transformOrigin: '0 0'}}
          ></iframe>
        </div>
      }

    return (
        <div className="container-text-view container-page display-flex-center" style={{padding: '0px 0px'}}>
          <Container>
          <div className="block-text-add">
            <Row>
              <div className="main-titles">
                TEXTE
              </div>
            </Row>
            <Row>
              <Col sm="12">
              <div>
                {text}
              </div>
              </Col>
            </Row>
            </div>
          </Container>
      </div>
    );

  }
  
  }
