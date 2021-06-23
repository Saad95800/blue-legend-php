import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SerieListRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let series = '';

    if(this.props.data.series.length > 0){
      series = this.props.data.series.map( (serie, index) => {
        console.log(serie)
        let link = `/revision-mode/texte/${serie.fk_id_text}/serie/${serie.id_serie}/content/1`;
        let serieName = serie.name_serie.length > 20 ? serie.name_serie.substring(0, 20)+'...' : serie.name_serie;
        return <Link
                to={link}
                key={index}>
                  <div key={serie.id_serie} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px'}} className="list-hover-item">
                    <div style={{textAlign: 'center'}}>{serieName}</div>
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