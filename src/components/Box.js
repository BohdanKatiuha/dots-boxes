import React, { Component } from 'react';
import { Rect } from 'react-konva';

export default class Box extends Component{
    
    render(){
        const {left, top, right, bottom} = this.props
        return(
            <Rect
                x={left}
                y={top}
                width={right - left}
                height={bottom - top}
                fill={this.props.color} 
            />
        )
    }
}