import React, { Component } from 'react';
import { Line } from 'react-konva';

export default class SideLine extends Component{
    state = {
        color: '',
        fixed: false 
    }

    componentWillMount(){
        this.setState({
            color: this.props.color
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reset !== this.props.reset){
            this.resetColor();
        }
    }

    resetColor = () =>{
        this.setState({
            color: this.props.color,
            fixed: false
        })
    }

    handleMouseOver = () => {
        if (!this.state.fixed)  
            return this.setState({
                color: this.props.playerMove ? '#80ff80' : '#ff80ff'
            })
    }

    handleMouseOut = () => {
        if (!this.state.fixed)  
            return this.setState({
                color: this.props.color
            })  
    }

    handleClick = (el) => {
        if (!this.state.fixed){
            this.setState ({color: this.props.playerMove ? '#009900' : '#990099', fixed: true})
            this.props.onClick(el.currentTarget.attrs.points)
        
        }
    }

    render(){   
        const { x0, y0, x1, y1} = this.props
        return(
            <Line
                points ={[x0, y0, x1, y1]}
                stroke = {this.state.color}
                strokeWidth ={18}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
                onClick = {this.handleClick}
                
            /> 
        )
    }
}