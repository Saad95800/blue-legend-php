import React, { Component } from 'react';
import axios from 'axios';
import {insertLog} from './../functions';

export default class SerieList extends Component {

  constructor(props){
    super(props);

    insertLog(axios, 16, 1)

  }

  render() {

    return (
            <div className="container-serie-list container-page display-flex-center">

            </div>
    );
  }

}