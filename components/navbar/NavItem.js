import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NavItem extends Component {

  constructor(props){
    super(props);
  }

  colorClickItem(event){
    if(this.props.classContainer == 'bloc-btn-menu-vitrine'){
      window.location.href = '/';
    }else if(this.props.classContainer == 'bloc-btn-menu-right'){
      event.preventDefault();
      axios({
        method: 'post',
        url: '/logout',
        responseType: 'json',
        data: {}
      })
      .then((response) => {
        console.log(response);
        if(response.statusText == 'OK'){
          window.location.href = '/';
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }else{
      this.props.colorClickItem(event);
    }
  }

  colorHoverItem(event){
      this.props.colorHoverItem(event);
  }

  colorMouseOutItem(event){
      this.props.colorMouseOutItem(event);
  }

  render() {
    let color = 'rgb(117, 222, 235, 0)';
    if(this.props.url_courante == this.props.url || this.props.isSelected){
      color = 'rgb(32, 96, 250)';
    }
    let style = this.props.style;
    style = Object.assign({backgroundColor: color}, style);
    return (
        <div className={this.props.classContainer} style={style} >
            <Link
                to={this.props.url}
                className={this.props.classItem} 
                onMouseOver={this.colorHoverItem.bind(this)} 
                onMouseOut={this.colorMouseOutItem.bind(this)} 
                onClick={this.colorClickItem.bind(this)} 
                id={this.props.id}>
            </Link>
            <div className={this.props.position == "left"? 'a1':'at1'}>
              <div className={this.props.position == "left"? 'a2':'at2'}></div>
              <div className={this.props.position == "left"? 'a3':'at3'}>{this.props.title}</div>
            </div>
            {/* <span style={this.props.cssTitle}>{this.props.title}</span> */}
        </div>
    );
  }
}
