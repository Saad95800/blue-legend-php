import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import axios from 'axios';
import Trumbowyg from 'react-trumbowyg';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {root} from './../setup'
import {insertLog} from './../functions'

export default class TextEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            categories: [],
            texte: '',
            texteContent: '',
            contentTextArea: '',
            textTitle: '',
            textCategory: '',
            redirect: false,
            to: '/texte/'+this.props.location.pathname.split("/")[2]
        }

        insertLog(axios, 3, 1)

    }

    componentDidMount(){

        let formdata = new FormData()
        formdata.append('id_text', this.props.location.pathname.split("/")[2])
        axios({
            method: 'post',
            url: '/get-texte-ajax',
            responseType: 'json',
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

        axios({
            method: 'post',
            url: '/categories-ajax',
            responseType: 'json',
            data: {}
        }).then((response) => {
            this.setState({categories: response.data});
        }).catch( (error) => {
            console.log(error);
        }); 
    }

    updateText(){
console.log('update text')
        let wysiwyg = document.getElementsByName("react-trumbowyg")[0];
        let divWysiwyg = document.querySelector("#react-trumbowyg");
    
        if(divWysiwyg.innerText == ''){
          this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
          divWysiwyg.style.backgroundColor = '#ff00001a';
          setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000)
        }else{

          let formdata = new FormData();
          formdata.append('id_text', this.props.location.pathname.split("/")[2]);
          formdata.append('title_text', this.state.textTitle);
          formdata.append('content_text', wysiwyg.value);
          formdata.append('id_category', this.state.textCategory);
          axios({
            method: 'post',
            url: '/update-texte-ajax',
            responseType: 'json',
            data: formdata
          })
          .then((response) => {
              console.log(response)
            this.setState({redirect: true})
          })
          .catch( (error) => {
            console.log(error);
          });
        }
    
    }

    render(){

        if (this.state.redirect) {
            return <Redirect to={this.state.to} />
        }

        let options = this.state.categories.map((category, index) =>{
            return <option key={index} value={category.id_category}>{category.name_category}</option>
        });

        return(
            <div>
                <div className="container-wysiwig" style={{display: 'block', backgroundColor: this.state.wysiwyg_bg_color}}>

                <div>
                    <Container>
                    <Row style={{marginTop: '20px'}}>
                    <Col sm="12">
                        <Label for="select-category-text" sm={2}>Catégorie</Label>
                        <FormGroup row>
                        <Col sm={12}>
                            <Input value={this.state.textCategory} type="select" id="select-category-text" onChange={()=>{this.setState({textCategory: document.querySelector("#select-category-text").value})}}>
                            <option key="0" value="0">---</option>
                            {options}
                            </Input>
                        </Col>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm="12">
                        <Label for="title-text" sm={3}>Titre du texte</Label>
                        <FormGroup row>
                        <Col sm={12}>
                            <Input 
                                value={this.state.textTitle} 
                                type="text" 
                                onChange={() => {
                                    this.setState({
                                        textTitle: document.querySelector("#title-text").value
                                        })
                                }} 
                                autoComplete="off" 
                                id="title-text" />
                        </Col>
                        </FormGroup>
                    </Col>
                    </Row>
                    <div className="display-flex-right">
                        <div className="btn-forms" style={{marginRight: '5px'}} onClick={this.updateText.bind(this)}>Enregistrer</div>
                        <div className="btn-forms" style={{backgroundColor: '#DF2645'}} onClick={() => {this.setState({redirect: true})}}>Annuler</div>
                    </div>
                    <div style={{backgroundColor: this.state.wysiwyg_bg_color}}>
                    <Trumbowyg id='react-trumbowyg'
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
                        data={this.state.contentTextArea}
                        placeholder='Entrez votre texte'
                        ref="trumbowyg"
                    />
                    </div>
                    </Container>
                </div>

                </div>

            </div>
        );

    }

}