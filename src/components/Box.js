import React, { Component } from 'react';
// import Konva from 'konva';
import { Rect } from 'react-konva';

export default class Box extends Component{
    
    render(){
        const {left, top, right, bottom} = this.props
        // console.log(topSide)
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