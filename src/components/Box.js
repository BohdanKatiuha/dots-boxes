import React, { Component } from 'react';
// import Konva from 'konva';
import { Rect } from 'react-konva';

export default class Box extends Component{
    state = {
        color: '',
        leftSide: false,
        topSide: false,
        rightSide: false,
        bottomSide: false
    }

    componentWillMount =() => this.setState({color: this.props.color})

    componentDidUpdate(prevProps, prevState){
         if(this.props.color !== this.state.color){
            if( this.state.leftSide && this.state.topSide && this.state.rightSide && this.state.bottomSide){
                this.setState({color: this.props.color})
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps !== this.props){
           
            this.setState({
                leftSide: this.props.leftSide,
                topSide: this.props.topSide,
                rightSide: this.props.rightSide,
                bottomSide: this.props.bottomSide
            })
        }
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (nextProps !== this.props){
            
            if( this.state.leftSide && this.state.topSide && this.state.rightSide && this.state.bottomSide){
                this.setState({color: 'white'})
            }
        }  
    }

    render(){
        const {left, top, right, bottom, index, topSide} = this.props
        console.log(topSide)
        return(
            <Rect
                key = {index}
                x={left}
                y={top}
                width={right - left}
                height={bottom - top}
                fill={this.props.color} 
                //shadowBlur={2}
                stroke={'black'} 
                strokeWidth={1}
            /> 
        )
    }
}