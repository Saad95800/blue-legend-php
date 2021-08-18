import React, { Component } from 'react';
import axios from 'axios';
import ReactCountdownClock from 'react-countdown-clock';
import {capitalizeFirstLetter, replaceSpecialChar, insertLog} from './../functions';

export default class serieRevision extends Component {

  constructor(props){
    super(props);

    this.timer = 0;
    this.durationCount = 5;
    
    this.state = {
      id_histoserie: 0,
      numQuestion: 0,
      inputResponse: '',
      inputResponseDisabled: false,
      stepRev: "Question",
      stepRevs: {
        "1": "Question",
        "2": "Validation",
        "3": "Resultat"
      },
      stateQuestion: {
        logoUrlValidation: "",
        logoDisplayValidation: "none",
        messageValidation: "",
        btnValidation: "Valider",
        inputTextValue: "",
        colorMessageValidation: "#26DF38"
      },
      score: 0,
      expressions: [],
      clock: 'enabled',

      minutes: 0,
      seconds: 0,
      millis: 0,
      running: false
    }

    // this.startTimer();
    if(this.props.num_mode == 2){
      this._handleStartClick = this._handleStartClick.bind(this);
      this._handleStopClick = this._handleStopClick.bind(this);
      this._handleResetClick = this._handleResetClick.bind(this);
    }

    insertLog(axios, 14, 1)
    
  }

  componentDidMount(){
    let url = this.props.data.location.pathname.split('/');
    this._handleStartClick();
    let formdata = new FormData()
    formdata.append('id_text', url[3])
    formdata.append('id_serie', url[5])
    axios({
      method: 'post',
      url: '/get-serie-by-id-ajax',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formdata
    })
    .then((response) => {
      console.log(response);
      this.setState({expressions: response.data.record_expression});
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  validate(){
    this._handleStopClick();
    if(this.state.stepRev == 'Question'){
      let res = (replaceSpecialChar(this.state.expressions[this.state.numQuestion].french_value.toLowerCase().trim()) == replaceSpecialChar(document.querySelector("#inputResponse").value.toLowerCase().trim()) );
      let last = (this.state.numQuestion == this.state.expressions.length - 1);
      let msg = "Suivant";
      if(last){
        msg = "Résultats";
      }
      console.log(res)
      if(res){
        this.setState({
          stateQuestion:{
            btnValidation: msg, 
            colorMessageValidation: "rgb(38, 223, 56)", 
            messageValidation: "Bonne réponse"
          }, 
          score: this.state.score+1, 
          stepRev: "Validation", 
          clock: 'disabled',
          // inputResponseDisabled: true
        });
      }else{
        this.setState({
                    stateQuestion:{
                      btnValidation: msg, 
                      colorMessageValidation: "red", 
                      messageValidation: this.state.expressions[this.state.numQuestion].french_value
                    }, 
                    stepRev: "Validation",
                    clock: 'disabled',
                    // inputResponseDisabled: true
                  });
      }
      let url = this.props.data.location.pathname.split('/');
      let formdata = new FormData()
      formdata.append('result', res)
      formdata.append('id_serie', url[5])
      formdata.append('id_histoserie', this.state.id_histoserie)
      formdata.append('duration', this.state.seconds)
      formdata.append('id_expression', this.state.expressions[this.state.numQuestion].id_expression)

      axios({
        method: 'post',
        url: '/save-dataserie',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formdata
      })
      .then((response) => {
        console.log(response)
        if(this.state.id_histoserie == 0){
          this.setState({id_histoserie: response.data.id_histoserie});
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  }

  next(){
    if( this.state.numQuestion == this.state.expressions.length - 1){
      this.setState({
        stateQuestion:{
          btnValidation: "Résultats", 
          messageValidation: ""
        }, 
        stepRev: "Resultat",
        inputResponse: ''
      });

      let formdata = new FormData()
      formdata.append('id_histoserie', this.state.id_histoserie)
      formdata.append('completed', true)
      formdata.append('score', this.state.score)
      formdata.append('id_serie', this.props.data.location.pathname.split('/')[5])

      axios({
        method: 'post',
        url: '/update-histoserie-ajax',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formdata
      })
      .then((response) => {
        if(this.state.id_histoserie == 0){
          this.setState({id_histoserie: response.data.id_histoserie});
        }
      })
      .catch( (error) => {
        console.log(error);
      });

    }else{
      if(this.props.num_mode == 2){
        this._handleResetClick();
        this._handleStartClick();
      }
      this.setState({
        stateQuestion:{
          btnValidation: "Valider", 
          messageValidation: ""
        }, 
        stepRev: "Question", 
        numQuestion: this.state.numQuestion+1, 
        clock: 'enabled',
        inputResponse: '',
        // inputResponseDisabled: false
      });
    }
    document.querySelector("#inputResponse").value = "";
  }

  viewResult(){
    console.log('result');
  }

  verifKey(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode == '13'){
      if(this.state.stepRev == 'Question'){
        this.validate();
      }else{
        this.next();
      }
    }
  }

  restart(){
    this.setState({
      numQuestion: 0,
      stepRev: "Question",
            stateQuestion: {
              logoUrlValidation: "",
              logoDisplayValidation: "none",
              messageValidation: "",
              btnValidation: "Valider",
              inputTextValue: "",
              colorMessageValidation: "#26DF38"
            },
      score: 0,
      clock: 'enabled'
    });
      if(this.props.num_mode == 2){
        this._handleResetClick();
        this._handleStartClick();
      }
  }

  /////////////////////////////////////////////////////

  _handleStartClick(event) {
    var _this = this;
    if (!this.state.running) {
        this.interval = setInterval(() => {
            this.tick();
        }, 100)

        this.setState({running: true})
    }
}

_handleStopClick(event) {        
    if (this.state.running) {
        clearInterval(this.interval);
        this.setState({running: false})
    }
}

_handleResetClick(event) {
    this._handleStopClick();
    this.update(0, 0, 0);
}

tick() {
    let millis = this.state.millis + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    if (millis === 10) {
        millis = 0;
        seconds = seconds + 1;
    }

    if (seconds === 60) {
        millis = 0;
        seconds = 0;
        minutes = minutes + 1;
    }

    this.update(millis, seconds, minutes);
}

zeroPad(value) {
    return value < 10 ? `0${value}` : value;
}

update(millis, seconds, minutes) {
    this.setState({
        millis: millis,
        seconds: seconds,
        minutes: minutes
    });
}
////////////////////////////////////////////////////////////
  render() {
    let displayExo = 'block';
    let displayRes = 'none';
    /** Fonction a éxécuter lors de l'appuis sur le bouton vert */
    let func = '';
    if(this.state.stepRev == "Question"){
      func = this.validate;
    }else if(this.state.stepRev == "Validation"){
      func = this.next;
    }else{
      func = this.viewResult;
      displayExo = 'none';
      displayRes = 'flex';
    }
    /************************* */
    let text = '...';
    if(this.state.expressions[this.state.numQuestion] !== undefined){
      text = this.state.expressions[this.state.numQuestion].english_value;
    }

    let clock = '';
    if(this.props.num_mode == 2){
      let count = 0;
      if(this.state.clock == 'enabled'){
        count = this.durationCount;
      }
      clock = <ReactCountdownClock 
                seconds={count}
                color="#ffd23d"
                alpha={0.9}
                size={100}
                onComplete={this.validate.bind(this)} /> 

    }
    return (
            <div style={{width: '100%'}}>
                
                <div id="clock" style={{position: 'fixed', top: '78px', right: '80px'}}>{clock}</div>
                <div style={{width: '80%', margin: 'auto'}}>{this.props.serie.name_serie}</div>
                <div className="block-serie">
                  <div style={{display: displayExo}}>
                    <div style={{paddingTop: "35px",textAlign: "center",fontWeight: "bold",fontSize: "30px"}}>{capitalizeFirstLetter(text)}</div>
                    <div style={{textAlign: "center"}}>
                      <input 
                        type="text" 
                        id="inputResponse" 
                        value={this.state.inputResponse} 
                        style={{width: "90%", height: "80px", fontSize: "40px", marginTop: "50px"}} 
                        onChange={ () => {this.setState({ inputResponse: document.querySelector("#inputResponse").value})} }
                        onKeyPress={this.verifKey.bind(this)}
                        autoComplete="off"
                        disabled={this.state.inputResponseDisabled}
                      />
                    </div>
                    <div style={{height:"30px", marginLeft:"30px", marginTop:"10px", fontSize: "30px", color: this.state.stateQuestion.colorMessageValidation}}>{this.state.stateQuestion.messageValidation}</div>
                  
                    <div style={{textAlign: "center"}}>
                      <div className="btn-serie" onClick={func.bind(this)}>{this.state.stateQuestion.btnValidation}</div>
                    </div>
                  </div>
                  <div style={{display: displayRes, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <div>
                      <div style={{textAlign: 'center', fontSize: '2em'}}>Score</div>
                      <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '100px', marginTop: '-10px'}}>
                        <span style={{fontSize: '2em'}}>{this.state.score}</span>/<span style={{fontSize: '1em', color:'#C2BEBE'}}>{this.state.expressions.length}</span>
                      </div>
                      <div style={{marginTop: '-37px', backgroundColor: '#3B74FE'}} className="btn-serie" onClick={this.restart.bind(this)}>Recommencer</div>
                    </div>
                  </div>
                </div>

                {/* <div className="segments">
                    <span className="mins">{this.zeroPad(this.state.minutes)}:</span> 
                    <span className="secs">{this.zeroPad(this.state.seconds)} </span> 
                    <span className="millis">.0{this.state.millis}</span>
                </div> */}

            </div>
    );

  }
}