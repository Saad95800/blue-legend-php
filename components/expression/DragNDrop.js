import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export default class DragNDrop extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return(
            <Draggable>

              <div className="dnd">
                {this.props.children}
              </div>

          </Draggable>
        );
    }
}