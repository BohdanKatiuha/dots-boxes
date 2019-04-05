import React, { Component } from 'react';
// import Konva from 'konva';
import { Rect } from 'react-konva';

export default class Box extends Component{
    state = {
        color: ''
    }

    componentWillMount =() => this.setState({color: this.props.color})

    render(){
        const {left, top, right, bottom, color} = this.props
        return(
            <Rect
                    x={left}
                    y={top}
                    width={right - left}
                    height={bottom - top}
                    fill={color} 
                    shadowBlur={2}
                    stroke={'black'} 
                    strokeWidth={1}
                /> 
        )
    }
}