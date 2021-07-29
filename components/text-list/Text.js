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
      zoom: 0.4,
      left: 0,
      fullSreenPdf: false,
      file_name_server: '',
      file_name_server_link: '',
      heightIframePdf: ''
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

    let zoom = 0.4
    if(window.screen.width > 600){
      zoom = 1
    }

    this.setState({
      // heightContainerIframePdf: ($(window).height()-120)+'px',
      heightIframePdf: '1291px',
      zoom: zoom
    })
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
    setTimeout(() => {
      $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform', 'matrix('+ (this.state.zoom) +', 0, 0, '+ (this.state.zoom) +', '+ this.state.left +', 0)')
      $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform-origin', 'center top')
    }, 200)

    window.scrollTo(0, 0)

  }

  zoonIn(){
    
    let left = 0
    if(window.screen.width < 600) {
      // if(this.state.left > 0){
        left = this.state.left + 45
      // }else{
      //   left = this.state.left
      // }
    }

    if(this.state.zoom < 2.1){
      let height = ( parseInt(this.state.heightIframePdf.replace('px', '')) + 126 ) + 'px'
      // let zoom = ( parseInt($(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform').replace('scale(', '').replace(')', '')) + 0.1 )
      console.log(this.state.zoom )
      $('#iframe-pdf').css('height', height)
      $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform', 'matrix('+ (this.state.zoom+0.1) +', 0, 0, '+ (this.state.zoom+0.1) +', '+ left +', 0)')
      this.setState({zoom: this.state.zoom + 0.1, heightIframePdf: height, left: left})      
    }

  }
  
  zoonOut(){
    
    let zoom = 1
    let left = 0
    if(window.screen.width < 600) {
      zoom = 0.4
      if(this.state.left > 0){
        left = this.state.left - 45
      }else{
        left = this.state.left
      }
    }

    if(this.state.zoom > zoom){
      let height = ( parseInt(this.state.heightIframePdf.replace('px', '')) - 126 ) + 'px'
      // let zoom = ( parseInt( $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform').replace('scale(', '').replace(')', '')) - 0.1 )
      console.log(this.state.zoom )
      $('#iframe-pdf').css('height', height)
      $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform', 'matrix('+ (this.state.zoom-0.1) +', 0, 0, '+ (this.state.zoom-0.1) +', '+ left +', 0)')
      this.setState({zoom: this.state.zoom - 0.1, heightIframePdf: height, left: left})
    }
  }

  fullScreenIframePdf(){

    if(this.state.fullSreenPdf){
      this.setState({fullSreenPdf: false})
      $("#iframe-pdf").css({
        'position': 'static',
        'top': 'auto',
        'left': 'auto',
        'z-index': 'auto',
        'width': '100%',
        'max-height': 'none',
        'overflow-y': 'visible',
        'height': this.state.heightIframePdf
      })
      $(".container-btn-page").css({
        'left': '60px',
        'top': (window.screen.width < 600 ? '130px': '110px')
      })
      $("#full-screen-btn").css({
        'position': 'absolute',
        'top': '50px',
        'right': '43px',
        // 'z-index': '-1'
      })
      $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform-origin', 'center top')
    }else{
      this.setState({fullSreenPdf: true})
      $("#iframe-pdf").css({
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'z-index': '1',
        'width': window.screen.width,
        'max-height': '100%',
        'overflow-y': 'scroll'
      })
      $(".container-btn-page").css({
        'left': '28px',
        'top': '10px'
      })
      $("#full-screen-btn").css({
        'position': 'fixed',
        'top': '15px',
        'right': '15px',
        // 'z-index': '2'
      })
      if(window.screen.width < 600){
        $(document.querySelector('#iframe-pdf').contentWindow.document.body).css('transform-origin', 'center 165px')
      }
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
        <div id="" style={{backgroundColor: '#939393', overflowX: 'clip', marginTop: '40px'}}>
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
            data-zoom={this.state.zoom}
            src={src}
            // style={{height: this.state.heightContainerIframePdf, zoom: '0.75', transform: 'scale('+this.state.zoom+')', transformOrigin: '0 0'}}
            style={{border: 'none', height: '1291px'}}
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
