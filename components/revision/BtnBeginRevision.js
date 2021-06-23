import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class btnBeginRevision extends Component {

  constructor(props){
    super(props);

    let id_serie = this.props.id_serie;


    this.state = {
      id_serie: id_serie
    }
  }

  render() {
    let url = this.props.data.location.pathname;
    let id_texte = url.split("/")[3];
    let id_serie = url.split("/")[5];
    let num_content = url.split("/")[7];
    let num_mode = url.split("/")[9];

    return (
            <div style={{textAlign: 'center'}}>
                <Link style={{textDecoration: 'none', display: 'inline-block'}} to={`/revision-serie/texte/${id_texte}/serie/${id_serie}/content/${num_content}/mode/${num_mode}`}><div style={styles.btnBegin}>Commencer</div></Link>
            </div>
    );

  }
}

let styles = {
  btnBegin: {
    marginTop: '90px',
    width: '400px',
    height: '150px',
    borderRadius: '80px',
    backgroundColor: '#FFD23D',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px'
  }
}