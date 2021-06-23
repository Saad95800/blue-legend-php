import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class contentRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    // console.log(this.props);  
    let id_texte = this.props.data.location.pathname.split("/")[3];
    let id_serie = this.props.data.location.pathname.split("/")[5];
    return (
            <div>
                <h3>Que souhaitez-vous réviser</h3>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Link to={`/revision-mode/texte/${id_texte}/serie/${id_serie}/content/1`} id={1}><div style={styles.itemBtn}>Mots</div></Link>
                  <Link to={`/revision-mode/texte/${id_texte}/serie/${id_serie}/content/2`} id={2}><div style={styles.itemBtn}>Expressions</div></Link>
                  <Link to={`/revision-mode/texte/${id_texte}/serie/${id_serie}/content/3`} id={3}><div style={styles.itemBtn}>Mots & Expressions</div></Link>
                </div>
            </div>
    );

  }
}

let styles = {
  itemBtn: {
    display: 'inline-flex',
    width: '100px',
    height: '50px',
    border: '1px solid',
    margin: '10px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
}