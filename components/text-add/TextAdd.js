import React, { Component } from 'react'
import '../../node_modules/react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import slugify from 'slugify'
import {root} from './../setup'
import {isURL, insertLog} from './../functions'

export default class TextAdd extends Component {

  constructor(props){
    super(props);

    this.state = {
      categories: [],
      redirect: false,
      wysiwyg_title: '',
      wysiwyg_content: '',
      selected_category: '',
      wysiwyg_bg_color: '',
      type_text: 'pdf',
      file_name_pdf: '',
      file_name_pdf_server: '',
      view_pdf: false,
      inputFileTitle: 'Choisir un fichier',
      text_link: '',
      file_html: '',
      id_file: '',
      file_name_server_link: '',
      url_file_link: '',
      view_iframe_link_display: 'none',
      url_file_link_loaded: false,
      text_link_loaded: false
    }

    insertLog(axios, 1, 1)

  }

  componentDidMount(){

    if(this.state.view_pdf == true){
      this.setState({inputFileTitle: this.state.file_name_pdf});
    }

    this.textarea = $("#react-trumbowyg"); 
    this.textAreaWysiwyg = document.getElementsByName("#react-trumbowyg")[0];
    this.divWysiwyg = document.querySelector("#react-trumbowyg");
    this.inputTitleText = document.querySelector("#title-text");
    this.selectCategory = document.querySelector("#select-category-text");
    this.typeText = document.querySelector("#type-text");

    // this.setState({
    //   wysiwyg_content: document.getElementsByName("react-trumbowyg")[0].value,
    //   wysiwyg_bg_color: document.querySelector("#react-trumbowyg").style.backgroundColor
    // });

    // this.divWysiwyg.addEventListener("paste", () => {
    //   this.setState({wysiwyg_content: this.textAreaWysiwyg.value});
    // });
    // this.divWysiwyg.addEventListener("keyup", () => {
    //   this.setState({wysiwyg_content: this.textAreaWysiwyg.value});
    // });

    axios({
      method: 'post',
      url: '/categories-ajax',
      responseType: 'json',
      data: {}
    })
    .then((response) => {
      this.setState({categories: response.data});
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  saveText(){
    
    if(this.state.wysiwyg_title == ''){
      let titleWysiwyg = document.querySelector("#title-text");
      this.props.viewMessageFlash('Le titre du texte ne doit pas être vide.', true);
      titleWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){titleWysiwyg.style.backgroundColor = '#fff';}, 3000);
      return;
    }  

    if(this.state.type_text == 'text'){
      if(this.state.wysiwyg_content == ''){
        let divWysiwyg = document.querySelector("#react-trumbowyg");
        this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
        divWysiwyg.style.backgroundColor = '#ff00001a';
        setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000);
        return;
      }    
    }else if(this.state.type_text == 'pdf'){
      if(this.state.file_name_pdf_server == ''){
        this.props.viewMessageFlash('Vous devez choisir un fichier.', true);
        return;
      }
    }else if(this.state.text_link == ''){
      this.props.viewMessageFlash('Vous devez saisir une URL.', true);
      return;
    }else if(this.state.text_link_loaded == false){
      this.props.viewMessageFlash('Vous devez charger l\'URL saisie', true);
      return;
    }

    let formdata = new FormData()
    formdata.append('title_text', this.state.wysiwyg_title)
    formdata.append('content_text', this.state.wysiwyg_content)
    formdata.append('id_category', this.state.selected_category)
    formdata.append('type_text', this.state.type_text)
    formdata.append('file_name_pdf', this.state.file_name_pdf)
    formdata.append('file_name_pdf_server', this.state.file_name_pdf_server)
    formdata.append('file_html', this.state.file_html)
    formdata.append('id_file', this.state.id_file)
    formdata.append('slug', slugify(this.state.wysiwyg_title))
    formdata.append('file_name_server_link', this.state.file_name_server_link)
    // formdata.append('url_file_link', this.state.url_file_link)

    axios({
      method: 'POST',
      url: '/save-text-ajax',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formdata
    })
    .then((response) => {
      console.log(response)
      if(response.data.result == true){
        this.props.viewMessageFlash('Texte ajouté avec succès !');
        this.setState({ redirect: true });
      }else{
        this.props.viewMessageFlash('Erreur lors de l\'ajout !');
      }
    })
    .catch( (error) => {
      console.log(error);
    });
    
    
  }

  changeTypeText(type){
    this.setState({type_text: type})
  }

  uploadAndViewPdfFile(e){
    console.log(e.target.files[0]);
    let file  = e.target.files[0];

    let formData = new FormData();
    formData.append('file', file);

    axios({
      method: 'post',
      url: '/upload-file-pdf-ajax',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
    .then((response) => {
      console.log(response);
      if(response.data.error == false){
        this.props.viewMessageFlash(response.data.msg);
        this.setState(
          { 
            pdf_loading: false,
            file_name_pdf_server: response.data.file.file_name_pdf_server,
            file_name_pdf: response.data.file.file_name_pdf,
            view_pdf: true,
            inputFileTitle: response.data.file.file_name_pdf,
            wysiwyg_title: response.data.file.file_name_pdf,
            file_html: response.data.file_html,
            id_file: response.data.file.file_name_pdf_server.replace(".pdf", "")
        });
      }else{
        this.props.viewMessageFlash(response.data.msg, response.data.error);
        this.setState({inputFileTitle: 'Choisir un fichier', pdf_loading: false})
      }

    })
    .catch( (error) => {
      console.log(error);
    });

    this.setState({
      pdf_loading : true
    })

  }

  savePageContent(){

    if(isURL(this.state.text_link)){

      let formdata = new FormData()
      formdata.append('url', this.state.text_link)
      axios({
        method: 'POST',
        url: '/save-html-page',
        responseType: 'html',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formdata
      })
      .then((response) => {
        console.log(response);
        if(response.data.error == false){
          this.setState({
            file_name_server_link: response.data.file_name_server,
            url_file_link: response.data.url,
            view_iframe_link_display: 'block',
            text_link_loaded: true
          })
        }else{
          this.props.viewMessageFlash('Erreur de traitement', true)
        }
        // $("#react-trumbowyg").html(response.data)
      })
      .catch( (error) => {
        console.log(error);
      });
    }else{
      this.props.viewMessageFlash('Veuillez saisir une url valide', true)
    }


  }

  setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }
  
  setCaretToPos(input, pos) {
     this.setSelectionRange(input, pos, pos);
  }

  render() {

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/texte-liste'/>;
     }

    let options = this.state.categories.map((category, index) =>{
                    return <option key={index} value={category.id_category}>{category.name_category}</option>
                  });
    
    let classBtnTypePdf = "btn btn-choice-file display-flex-center btn-primary btn-sm active";
    let classBtnTypeText = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive";
    let classBtnTypeLink = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive"

    let contentForm = []         
    
    if(this.state.type_text == 'pdf'){
      
      classBtnTypePdf = "btn btn-choice-file display-flex-center btn-primary btn-sm active";
      classBtnTypeLink = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive"
      classBtnTypeText = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive";

      let contentBtnFile = this.state.inputFileTitle;
      if(this.state.pdf_loading){
        contentBtnFile = <img src={root+"/public/img/Rolling-1s-80px.gif"} style={{width: '40px', marginTop: '-10px'}} />
      }
      contentForm =
      <div className="full-width">
        <h3 className="text-center color">Choisissez un fichier PDF.</h3>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="display-flex-center">
          <input
              type="file" 
              id="main-input" 
              className="form-control form-input form-style-base"
              onChange={(e) => {this.uploadAndViewPdfFile(e)}}
              />
            <h4 id="fake-btn" className="form-input fake-styled-btn text-center truncate">
            <span className="margin">
              {contentBtnFile}
            </span>
            </h4>
          </div>
        </div>
      </div>
    }else if(this.state.type_text == 'link'){

      classBtnTypePdf = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive";
      classBtnTypeLink = "btn btn-choice-file display-flex-center btn-primary btn-sm active"
      classBtnTypeText = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive";

      let fnsl = this.state.file_name_server_link
      let src = root+'public/uploads/links/'+fnsl;

      contentForm =   <Row>
                        <Col sm="12">
                          <Label for="title-text">Ajouter un lien</Label>
                          <FormGroup row>
                            <Col sm={12}>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                                <Input type="text" style={{width: '85%'}} value={this.state.text_link} onChange={() => {
                                  this.setState({text_link: $("#text-link").val()})
                                  }} autoComplete="off" id="text-link" />
                                  <div className="btn-forms" style={{height: '38px', padding: '6px 0px', backgroundColor: '#3B74FE'}} onClick={() => {this.savePageContent()}}>Charger</div>                                
                              </div>
                              <div>
                                <iframe
                                  id="iframe-pdf" 
                                  data-texte={JSON.stringify(this.state.texte)}
                                  src={src}
                                  style={{display: this.state.view_iframe_link_display, width: '100%', height: '500px', marginTop: '15px'}}
                                  ></iframe>
                              </div>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
    }else if(this.state.type_text == 'text'){

      classBtnTypePdf = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive";
      classBtnTypeLink = "btn btn-choice-file display-flex-center btn-primary btn-sm notActive"
      classBtnTypeText = "btn btn-choice-file display-flex-center btn-primary btn-sm active";

      contentForm =               
      <div className="container-wysiwig" style={{backgroundColor: this.state.wysiwyg_bg_color}}>
        <Trumbowyg id="react-trumbowyg"
                  onChange={() =>{
                    console.log(document.getElementsByName("react-trumbowyg")[0].value);
                    this.setState({wysiwyg_content: document.getElementsByName("react-trumbowyg")[0].value});
                    let val = $("#react-trumbowyg").val();
                    this.setCaretToPos($("#react-trumbowyg"), 8)
                  }} 
                  onPaste={() =>{
                    console.log(this.textAreaWysiwyg.value);
                    this.setState({wysiwyg_content: this.textAreaWysiwyg.value});
                    let val = this.textarea.val();
                    this.textarea.focus().val("").val(val);
                  }} 
                  buttons={
                      [
                          ['viewHTML'],
                          ['formatting'],
                          'btnGrp-semantic',
                          ['link'],
                          ['insertImage'],
                          'btnGrp-justify',
                          'btnGrp-lists',
                          ['table'], // I ADDED THIS FOR THE TABLE PLUGIN BUTTON
                          ['fullscreen']
                      ]
                  }
                  data={this.state.wysiwyg_content}
                  placeholder='Entrez votre texte'
                  ref="trumbowyg"
        />

    </div>
    }

    return (

      <div className="container-text-add container-page">
          <Container>
          <div className="block-text-add">
            <Row>
              <div className="main-titles">
                AJOUTER UN TEXTE
              </div>
            </Row>
            <Row style={{marginTop: '20px'}}>
              <Col sm="9">
                <Label for="select-category-text">Catégorie</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="select" id="select-category-text" onChange={()=>{this.setState({selected_category: this.selectCategory.value})}}>
                      <option key="0" value="0">---</option>
                      {options}
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col sm="3" style={{textAlign: 'right', marginTop: '16px'}}>
                <div className="btn-forms" onClick={this.saveText.bind(this)}>Ajouter</div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Label for="title-text">Titre du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="text" value={this.state.wysiwyg_title} onChange={() => {this.setState({wysiwyg_title: this.inputTitleText.value})}} autoComplete="off" id="title-text" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Label for="title-text">Type du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <form>
                      <div className="form-group">
                        <div className="input-group">
                          <div id="radioBtn" className="btn-group">
                            <a 
                              className={classBtnTypePdf}
                              data-toggle="type" 
                              data-title="pdf"
                              onClick={() => {this.changeTypeText('pdf')}}>
                                PDF
                            </a>
                            <a 
                              className={classBtnTypeLink}
                              data-toggle="type" 
                              data-title="link"
                              onClick={() => {this.changeTypeText('link')}}>
                                Lien
                            </a>
                            <a 
                              className={classBtnTypeText}
                              data-toggle="type" 
                              data-title="text"
                              onClick={() => {this.changeTypeText('text')}}>
                                Texte
                            </a>
                          </div>
                          <input type="hidden" name="happy" id="happy"/>
                        </div>
                      </div>
                    </form>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            {/* <div className="row">
              <div className="col-xs-12">
                <iframe src="" frameborder="0"></iframe>
              </div>
            </div> */}
            <Row>
            <Col sm="12">

              {contentForm}
              
            </Col>
            </Row>
            </div>
          </Container>
      </div>
    );
  }

}