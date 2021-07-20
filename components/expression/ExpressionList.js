import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {capitalizeFirstLetter, limit15str, ucFirst, insertLog} from './../functions';
import {root} from './../setup'

export default class ExpressionList extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      textes: [],
      series: [],
      record_expressions: [],
      id_text_selected: '',
      id_serie_selected: '',
      id_record_expression_selected: '',
      inputFilterRecordExpressions: '',
      record_expression_selected: [],
      displayPopupDeleteRecordExpression: 'none',
      id_record_expression_to_delete: '',
      record_expression_checked: []
    }

    insertLog(axios, 7, 1)
  }

  componentDidMount(){

    let formdata = new FormData()
    formdata.append('id_category', null)

    axios({
      method: 'post',
      url: '/textes-ajax',
      responseType: 'json',
      data: formdata
    })
    .then((response) => {
      this.setState({textes: response.data.textes});
    })
    .catch( (error) => {
      console.log(error);
    });

    axios({
      method: 'post',
      url: '/get-series-by-user',
      responseType: 'json',
      data: {}
    })
    .then((response) => {
      console.log(response)
      this.setState({series: response.data});
    })
    .catch( (error) => {
      console.log(error);
    });

    axios({
      method: 'post',
      url: '/get-expressions-by-user',
      responseType: 'json',
      data: {}
    })
    .then((response) => {
      console.log(response)
      this.setState({record_expressions: response.data.record_expressions});
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  selectText(id_text){
    $('.c-e-l-text').css('background-color', 'transparent')
    $('.c-e-l-serie').css('background-color', 'transparent')
    $('.c-e-l-record_expressions').css('background-color', 'transparent')
    if(id_text == this.state.id_text_selected){
      this.setState({id_text_selected: '', id_serie_selected: '', id_record_expression_selected: ''})
    }else{
      this.setState({id_text_selected: id_text, id_serie_selected: '', id_record_expression_selected: ''})
    }
  }

  selectSerie(id_serie){
    $('.c-e-l-serie').css('background-color', 'transparent')
    $('.c-e-l-record_expressions').css('background-color', 'transparent')
    if(id_serie == this.state.id_serie_selected){
      this.setState({id_serie_selected: '', id_record_expression_selected: ''})
    }else{
      this.setState({id_serie_selected: id_serie, id_record_expression_selected: ''})
    }
}

  selectRecordExpression(record_expression){
    $('.c-e-l-record_expressions').css('background-color', 'transparent')
    if(record_expression.id_record_expression == this.state.id_record_expression_selected){
      this.setState({id_record_expression_selected: ''})
    }else{
      this.setState({id_record_expression_selected: record_expression.id_record_expression, record_expression_selected: record_expression})
    }
}

  msgDeleteRecordExpression(record_expression){
    this.viewPopupDeleteRecordExpression(record_expression)
  }

  viewPopupDeleteRecordExpression(record_expression){
    this.setState({displayPopupDeleteRecordExpression: 'flex', id_record_expression_to_delete: record_expression.id_record_expression})
  }

  deleteRecordExpression(){

    let formdata = new FormData()
    formdata.append('id_record_expression', this.state.id_record_expression_to_delete)

    axios({
      method: 'post',
      url: '/delete-record-expression-ajax',
      responseType: 'json',
      data: formdata
    })
    .then((response) => {
      console.log(response)
      if(response.data.error == false){
        let id_record_expression_to_delete = this.state.id_record_expression_to_delete
        this.props.viewMessageFlash(response.data.msg)
        let new_record_expressions = []
        for(let rc of this.state.record_expressions){
          if(rc.id_record_expression != id_record_expression_to_delete){
            new_record_expressions.push(rc)
          }
        }
        this.setState({record_expressions: new_record_expressions, displayPopupDeleteRecordExpression: 'none', id_record_expression_to_delete: ''})
      }else{
        this.props.viewMessageFlash(response.data.msg, true)
      }
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  selectCheckbox(id_record_expression){

    let new_recordEpressionsChecked = this.state.record_expression_checked

    let index = this.state.record_expression_checked.indexOf(id_record_expression)

    if(index == -1){
      new_recordEpressionsChecked.push(id_record_expression)
    }else{
      new_recordEpressionsChecked.splice(index, 1);
    }

    this.setState({record_expression_checked: new_recordEpressionsChecked})

  }

  deleteRecordExpressionsChecked(){

    if(this.state.record_expression_checked.length > 0){
      let formdata = new FormData()
      formdata.append('id_record_expressions', this.state.record_expression_checked)

      axios({
        method: 'post',
        url: '/delete-record-expressions-checked-ajax',
        responseType: 'json',
        data: formdata
      })
      .then((response) => {
        console.log(response)
        if(response.data.error == false){
          let id_record_expressions_to_delete = this.state.record_expression_checked
          this.props.viewMessageFlash(response.data.msg)
          let new_record_expressions = []
          for(let rc of this.state.record_expressions){
            if(id_record_expressions_to_delete.indexOf(rc.id_record_expression) == -1){
              new_record_expressions.push(rc)
            }
          }
          $('.checkbox-record-expression').prop( "checked", false );
          this.setState({record_expressions: new_record_expressions, displayPopupDeleteRecordExpression: 'none', record_expression_checked: []})
        }else{
          this.props.viewMessageFlash(response.data.msg, true)
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  }

  updateRecordExpression(){

    let formdata = new FormData()
    formdata.append('id_record_expression_selected', this.state.id_record_expression_selected)
    formdata.append('french_value', this.state.record_expression_selected.french_value)

    axios({
      method: 'post',
      url: '/update-record-expressions-selected-ajax',
      responseType: 'json',
      data: formdata
    })
    .then((response) => {
      console.log(response)
      if(response.data.error == false){
        let id_record_expressions_to_delete = this.state.record_expression_checked
        this.props.viewMessageFlash(response.data.msg)
        let new_record_expressions = []
        for(let rc of this.state.record_expressions){
          if(id_record_expressions_to_delete.indexOf(rc.id_record_expression) == -1){
            new_record_expressions.push(rc)
          }
        }
        $('.checkbox-record-expression').prop( "checked", false );
        this.setState({record_expressions: new_record_expressions, displayPopupDeleteRecordExpression: 'none', record_expression_checked: []})
      }else{
        this.props.viewMessageFlash(response.data.msg, true)
      }
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  render() {

    let displayEditRecordExpression = 'none'
    if(this.state.id_record_expression_selected != ''){
      displayEditRecordExpression = 'block'
    }
    //////////////////////////////////////// Texts

    let textes = ''

    if(this.state.textes.length > 0){
      textes = 
      <div className="block-Expression-list">
        {this.state.textes.map( (text, index) => {

          let cssItem = {width: '52px', height: '60px', margin: 'auto', background: 'url('+root+'public/img/main_img.png) -681px 0px   no-repeat'}
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

//////////////////////////////////////// Series

    let series = ''

    let s = []

    for(let serie of this.state.series){
      if(this.state.id_text_selected == '' || serie.fk_id_text == this.state.id_text_selected){
        s.push(serie)
      }
    }

    if(s.length > 0){
      series = 
      <div className="block-Expression-list">
        {s.map( (serie, index) => {

          let cssItem = {width: '52px', height: '60px', margin: 'auto', background: 'url('+root+'public/img/main_img.png) -784px 0px   no-repeat'}
          let bgc = 'transarent'
          if(serie.id_serie == this.state.id_serie_selected){
            bgc = '#dde6ff'
          }else{
            bgc = 'transarent'
          }
          return <div className="container-expression-list c-e-l-serie" key={index} style={{backgroundColor: bgc}} onClick={()=>{this.selectSerie(serie.id_serie)}}>
                    <div style={cssItem}></div>
                    <p style={{fontSize: '11px', fontFamily: 'system-ui', width: '115px', marginBlockStart: '0px', marginBlockEnd: '0px',fontWeight: 'bold', textAlign: 'center'}}>{capitalizeFirstLetter(limit15str(serie.name_serie))+' -'}</p>
                    <p style={{fontSize: '11px', fontFamily: 'system-ui', width: '115px', marginBlockStart: '0px', marginBlockEnd: '0px', fontStyle: 'italic'}}>{capitalizeFirstLetter(limit15str(serie.title_text))}</p>
                </div>
        })}
      </div>
    }

//////////////////////////////////////// Expressions

    let record_expressions = ''

    let rcs0 = []
    let rcs1 = []
    let rcs = []

    for(let rc of this.state.record_expressions){
      if(this.state.id_text_selected == '' || rc.fk_id_text == this.state.id_text_selected){
        rcs0.push(rc)
      }
    }

    for(let rc of rcs0){
      if(this.state.id_serie_selected == '' || rc.fk_id_serie == this.state.id_serie_selected){
        rcs1.push(rc)
      }
    }

    if(this.state.inputFilterRecordExpressions.trim() != ''){
      for(let rc of rcs1){
          if(rc.english_value.toLowerCase().indexOf(this.state.inputFilterRecordExpressions.toLowerCase()) != -1
              || rc.french_value.toLowerCase().indexOf(this.state.inputFilterRecordExpressions.toLowerCase()) != -1){
            rcs.push(rc)
          }
      }      
    }else{
      rcs = rcs1
    }

    if(rcs.length > 0){
      record_expressions =
      <div>
        <div>
          <input type="text" placeholder="Rechercher" style={{marginTop: '5px'}} id="input-filter-record-expressions" value={this.state.inputFilterRecordExpressions} onChange={()=>{this.setState({inputFilterRecordExpressions: $('#input-filter-record-expressions').val()})}}/>
          <button className="btn-danger" style={{float: 'right', marginTop: '5px'}} onClick={()=>{this.deleteRecordExpressionsChecked()}}>Supprimer les éléments sélectionnés</button>
        </div>
        <div className="block-record-expression-list" style={{paddingBottom: '30px', height: ($(window).height()-425)+'px'}}>
          {rcs.map( (record_expression, index) => {

            let bgc = 'transarent'
            if(record_expression.id_record_expression == this.state.id_record_expression_selected){
              bgc = '#dde6ff'
            }else{
              bgc = 'transarent'
            }
            return <div className="container-record-expression-list c-e-l-record_expressions" key={index} data-id_record_expression={record_expression.id_record_expression} style={{backgroundColor: bgc}} onClick={()=>{this.selectRecordExpression(record_expression)}}>
                      <span style={{fontWeight: 'bold', fontSize: '21px', display: 'inline-block', width: '40%'}}>{ucFirst(record_expression.english_value)}</span>
                      <span style={{fontWeight: 'bold', fontSize: '21px', display: 'inline-block', width: '40%'}}>{(record_expression.user_value == null ? ucFirst(record_expression.french_value) : record_expression.user_value)}</span>
                      <div style={{float: 'right'}}>
                        <button className="close" aria-label="Close" style={{height: '100%', width: '24px'}} onClick={(e)=>{e.stopPropagation();this.msgDeleteRecordExpression(record_expression)}}>
                          <span aria-hidden="true">×</span>
                        </button>
                        <input type="checkbox" data-id_record_expression={record_expression.id_record_expression} className="checkbox-record-expression" aria-label="Checkbox for following text input" onClick={(e)=>{e.stopPropagation();this.selectCheckbox(record_expression.id_record_expression)}} style={{ marginTop: '6px', marginRight: '30px'}}></input>
                      </div>
                  </div>
          })}
        </div>
      </div>
    }

    return (
      <div className="expression-container display-flex-center">
          <div className="main-titles">
            LISTE DES EXPRESSIONS
          </div>
          <div className="row width100">
            <div className="col-sm-6">
              {textes}
              {series}
              {record_expressions}
            </div>
            <div className="col-sm-6">
              <div style={{marginTop: '10px', paddingTop: '50px', height: ($(window).height()-141)+'px', boxShadow: '0px 0px 10px 0px #c5c5c5'}}>
                <div style={{width: '75%', margin:'auto', display: displayEditRecordExpression}}>
                  <div style={{height: '200px', fontSize: '40px', fontWeight: 'bold'}}>{ucFirst(this.state.record_expression_selected.english_value)}</div>
                  <textarea id="french-value-record-expression" style={{border: '0px', boxShadow: '0px 0px 10px 0px #c5c5c5', height: '150px', fontSize: '40px', fontWeight: 'bold'}} value={(this.state.record_expression_selected.user_value == null ? ucFirst(this.state.record_expression_selected.french_value) : this.state.record_expression_selected.user_value)} onChange={()=>{
                    let new_record_expression_selected = this.state.record_expression_selected
                    new_record_expression_selected.user_value = $('#french-value-record-expression').val()
                    this.setState({record_expression_selected: new_record_expression_selected})
                  }}></textarea>
                  <div className="btn btn-success" style={{marginTop: '20px'}} onClick={()=>{this.updateRecordExpression()}}>Mettre à jour</div>
                </div>
              </div>
            </div>
          </div>
          <div className="screen-popup-delete-record-expression display-flex-center" style={{display: this.state.displayPopupDeleteRecordExpression}}>
            <div className="popup-delete-record-expression display-flex-center" >
              <div style={{width: '70%'}}>
                <p style={{fontSize: '25px', textAlign: 'center'}}>Etes-vous sûr de vouloir supprimer cette expression ?</p>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <button className="btn btn-danger" onClick={()=>{this.setState({displayPopupDeleteRecordExpression: 'none', id_record_expression_to_delete: ''})}}>Non</button>
                  <button className="btn btn-success" style={{backgroundColor: '#6cd182'}} onClick={()=>{this.deleteRecordExpression()}}>Oui</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

}