import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col} from 'reactstrap';
import {root} from './../setup'
import { Link } from 'react-router-dom';
import {insertLog} from './../functions'

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
      textTitle: '',
      wysiwyg_bg_color: '#fff',
      type_text: '',
      active_page: 1,
      heightContainerIframePdf: '500px',
      zoom: 1,
      fullSreenPdf: false,
      file_name_server: '',
      file_name_server_link: ''
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
        console.log(response)
        let text = response.data;
        this.setState({
          texte: text,
          texteContent: text.content_text,
          contentTextArea: text.textContentArea,
          textTitle: text.title_text,
          textCategory: text.fk_id_category,
          type_text: text.type_text,
          active_page: parseInt(text.active_page),
          file_name_server: text.file_name_server,
          file_name_server_link: text.file_name_server_link
        });
      })
      .catch( (error) => {
        console.log(error);
      });     

      insertLog(axios, 2, 1)
      
  }

  componentDidMount(){
    // console.log('componentDidMount')
    // console.log($("#container-iframe-pdf"))
    // console.log(($(window).height()-130)+'px')
    this.setState({heightContainerIframePdf: ($(window).height()-120)+'px'})
    $('#iframe-pdf').css('height', ($(window).height()-380)+'px')

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
    this.setState({zoom: this.state.zoom + 0.1})
    $($('#iframe-pdf').context).find('body').css({'transform': 'scale('+this.state.zoom+')'})
    // $('#iframe-pdf').css('height', ( ($(window).height()-380)/(this.state.zoom + 0.06) )+'px')
  }

  zoonOut(){
    this.setState({zoom: this.state.zoom - 0.1})
    $($('#iframe-pdf').context).find('body').css({'transform': 'scale('+this.state.zoom+')'})
    // $('#iframe-pdf').css('height', ( ($(window).height()-380)/(this.state.zoom - 0.06) )+'px')
  }

  fullScreenIframePdf(){
    if(this.state.fullSreenPdf){
      this.setState({fullSreenPdf: false})
      $("#iframe-pdf").css({
        'position': 'relative',
        'top': '-0px',
        'left': '-0px',
        'z-index': 1,
        'overflow': 'scroll',
        'height': '1720px',
        'width': '100%'
      })
      $("#full-screen-btn").css({
        'top': '11px',
        'right': '43px'
      })
    }else{
      this.setState({fullSreenPdf: true})
      $("#iframe-pdf").css({
        'position': 'absolute',
        'top': '-156px',
        'left': '-62px',
        'z-index': 1,
        'overflow': 'scroll',
        'height': '100%',
        'width': '100%'
      })
      $("#full-screen-btn").css({
        'top': '-83px',
        'right': '-68px'
      })
    }

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

        /*let src = root+"/public/pages/web/viewer.html?file="+this.state.texte.file_name_server.replace('public/pages/web/', '');*/
        let fns = this.state.texte.file_name_server.replace(".pdf", "")

        // let src = root+'public/uploads/'+fns+"/"+this.state.texte.file_name_server; Affiche le PDF original
        let ancre = ''
        if( (this.state.texte.ancre_ligne != null) && (this.state.active_page == this.state.texte.active_page) ){
          ancre = '#ancre-'+this.state.texte.ancre_ligne
        }
        let src = root+'public/uploads/'+fns+'/html/'+fns+'-'+this.state.active_page+'.html'+ancre;
        text = 
        <div id="" style={{backgroundColor: '#939393', overflowX: 'clip'}}>
          <div id="full-screen-btn" onClick={()=>{this.fullScreenIframePdf()}}
          ></div>
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
            data-root={root}
            src={src}
            // style={{height: this.state.heightContainerIframePdf, zoom: '0.75', transform: 'scale('+this.state.zoom+')', transformOrigin: '0 0'}}
            style={{transform: 'scale('+this.state.zoom+')', transformOrigin: 'center top', border: 'none'}}
          ></iframe>
        </div>
      }else if(this.state.type_text == 'link'){

        let fnsl = this.state.texte.file_name_server_link

        let src = root+'public/uploads/links/'+fnsl;
        text = 
        <div id="container-iframe-pdf" style={{height: this.state.heightContainerIframePdf}}>
          <iframe
            className="iframe-link" 
            id="iframe-pdf" 
            data-textid={this.state.texte.id_text}
            data-id_ancre={this.state.texte.ancre_ligne}
            data-texte={JSON.stringify(this.state.texte)}
            src={src}
          ></iframe>
        </div>

      }

    return (
        <div className="container-text-view container-page display-flex-center" style={{padding: '0px 0px'}}>
          <Container>
          <div className="block-text-add">
            <Row>
              <div style={{fontWeight: 'bold', fontSize: '20px', textAlign: 'center', width: '100%'}}>
                {this.state.texte.title_text}
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
