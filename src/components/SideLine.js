import React, { Component } from 'react';
// import Konva from 'konva';
import { Line } from 'react-konva';

export default class SideLine extends Component{
    state = {
        color: '',
        fixed: false,
        strokeWidth: 20,
        opacity: 0
    }

    componentWillMount(){
        this.setState({
            color: this.props.color,
            // course: (Math.random() > 0.5) ? false : true
        })
    }


    handleMouseOver = () => {
        if (!this.state.fixed)  
            return this.setState({
                strokeWidth: 20, 
                color: 'blue', 
                opacity: 1
            })
    }

    handleMouseOut = () => {
        if (!this.state.fixed)  
            return this.setState({
                strokeWidth: 25, 
                color: this.props.color, 
                opacity: 0
            })  
    }

    

    handleClick = (el) => {
        // console.log(el.currentTarget.attrs.points)
        if (!this.state.fixed){
            this.setState ({color: this.props.course ? '#009900' : '#990099', fixed: true})
            this.props.onClick(el.currentTarget.attrs.points)
        }
    }

    render(){   
        const { x0, y0, x1, y1} = this.props
        // console.log(index)
        return(
            <Line
                // key = {index}
                points ={[x0, y0, x1, y1]}
                tension ={-0.5}  
                stroke = {this.state.color}
              //  shadowBlur ={2}
                strokeWidth ={12}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
                onClick = {this.handleClick}
                opacity = {1}
            /> 
        )
    }
}