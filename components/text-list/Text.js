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
      type_text: ''
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
          type_text: text.type_text
        });
      })
      .catch( (error) => {
        console.log(error);
      });     
    
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
        console.log(fns)
        // let src = root+'public/uploads/'+fns+"/"+this.state.texte.file_name_server; Affiche le PDF original
        let src = root+'public/uploads/'+fns+"/html/"+fns+"-html.html";
        text = 
        <div>
          <iframe
            className="iframe-pdf" 
            id="iframe-pdf" 
            data-textid={this.state.texte.id_text}
            src={src}
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
