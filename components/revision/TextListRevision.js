import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row} from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';
import {root} from './../setup'
import axios from 'axios';
import {insertLog} from './../functions';

export default class TextListRevision extends Component {

  constructor(props){
    super(props);

    insertLog(axios, 15, 1)

  }

  render() {
    let textes = '';
    if(this.props.data.textes.length > 0){

      textes = this.props.data.textes.map((texte, index) => {
        let link = '/revision-serie-list/text/'+texte.id_text;
        let textTitle = texte.title_text.length > 20 ? texte.title_text.substring(0, 20)+'...' : texte.title_text;
        let cssItem = {}
        let folder = texte.file_name_server.replace('.pdf', '')
        if(texte.type_text == 'pdf'){
          cssItem = {boxShadow: '0px 0px 10px 0px grey', background: 'url('+root+'/public/uploads/'+folder+'/html/'+folder+'001.png'+') no-repeat', backgroundSize: '100%'}
        }
        return  <div className="" key="index">
                  <Link
                    to={link}
                    key={index}>
                    <div key={texte.id_text} className="list-hover-item">
                      <div className="display-flex-center title-text-item">{ capitalizeFirstLetter(textTitle) }</div>
                      <div style={{'textAlign': 'center'}}>
                      <span className="img-item-liste-texte" style={cssItem}></span>
                      </div>
                    </div>
                  </Link>
                </div>;
        });
    }


    return (
            <div className="container-revision-text-list">
                <Row>
                  {textes}
                </Row>
            </div>
    );

  }
}