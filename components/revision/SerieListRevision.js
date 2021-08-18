import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {insertLog} from './../functions';

export default class SerieListRevision extends Component {

  constructor(props){
    super(props);

    insertLog(axios, 13, 1)

  }

  render() {


    if(this.props.data.textes.length > 0){
      textes = 
      <div className="block-Expression-list">
        {this.state.textes.map( (text, index) => {

          let cssItem = {width: '30px', height: '30px', margin: 'auto', background: 'url('+root+'public/img/main_img.png) -15px -81px   no-repeat'}
          let bgc = 'transarent'
          if(text.id_text == this.state.id_text_selected){
            bgc = '#dde6ff'
          }else{
            bgc = 'transarent'
          }
          return <div className="container-expression-list c-e-l-text" key={index} style={{backgroundColor: bgc}} onClick={()=>{this.selectText(text.id_text)}}>
                    <div style={cssItem}></div>
                    <p style={{fontSize: '11px', fontFamily: 'system-ui',fontWeight: 'bold', width: '115px', marginBlockEnd: '0px'}}>{capitalizeFirstLetter(limit15str(text.title_text))}</p>
                </div>
        })}
      </div>
    }

    let series = '';

    if(this.props.data.series.length > 0){
      series = this.props.data.series.map( (serie, index) => {
        let logo_validated = ''
        if(serie.completed == 1){
          logo_validated = <span style={{background: 'url(http://blue-legend.local/public/img/main_img.png) 0px -112px no-repeat', display: 'inline-block', width: '18px', height: '18px'}}></span>
        }
        let link = `/revision-mode/texte/${serie.fk_id_text}/serie/${serie.id_serie}/content/1`;
        let serieName = serie.name_serie.length > 20 ? serie.name_serie.substring(0, 20)+'...' : serie.name_serie;
        return <Link
                to={link}
                key={index}>
                  <div key={serie.id_serie} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px'}} className="list-hover-item">
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <span>{serieName}</span>
                        {logo_validated}
                    </div>
                    <div style={{'textAlign': 'center'}}>
                    <span className="img-item-liste-serie"></span>
                    </div>  
                  </div>
                </Link>;
      });
    }


    return (
            <div>
              {series}
            </div>
    );

  }
}