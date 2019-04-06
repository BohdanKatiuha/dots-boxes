import React, { Component } from 'react';
import {WIDTH, HEIGHT} from './constants'
import { Stage, Layer, Rect, Circle } from 'react-konva';
// import Konva from 'konva';
import SideLine from './SideLine'
import Box from './Box'


export default class BoxCanvas extends Component{
    
    state = {
        colorBody: '#002266',
        colorLine: '#0099ff',
        colorBoxes: '#e6f5ff',
        colorCircle: '#c2c2d6',
        row: 3,
        colomn: 4,
        marginWidth: 0,
        marginHeight: 0,
        coordsBoxes: [],
        course: '',
        player1CounterFillBox: 0,
        player2CounterFillBox: 0
    };

    componentWillMount(){ 
        this.setState({
            marginWidth: WIDTH / (this.state.colomn + 2),
            marginHeight: HEIGHT / (this.state.row + 2),
            course: ( Math.random() > 0,5 ) ? false : true
        })
        
    } 

    componentDidMount(){
        this.boxesCoords()
    }
    
    circleGridCoords = () => {
        var coords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn + 1; j++){
                coords.push({x: this.gridX(j),y: this.gridY(i)});       
            }
        }
        return coords
    }

    lineVerticalCoords = () => {
        var coords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn; j++){
                coords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j) + this.state.marginWidth, 
                    y1: this.gridY(i)}
                );       
            }
        }
        return coords
    }

    lineHorisontalCoords = () => {
        var coords = [];
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn +1; j++){
                coords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j), 
                    y1: this.gridY(i) + this.state.marginHeight}
                );       
            }
        }
        return coords
    }

    
    boxesCoords = () => {
        var coords = []
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn; j++){
                 coords.push({
                        left: this.gridX(j), 
                        top: this.gridY(i), 
                        right: this.gridX(j) + this.state.marginWidth, 
                        bottom: this.gridY(i) + this.state.marginHeight,
                        sides: {left: false, top: false, right: false, bottom: false},
                        color: this.state.colorBoxes
                    })
                      
            }
        }

        this.setState({coordsBoxes: coords})
    }

    gridX = (i) => this.state.marginWidth * (i + 1) 

    gridY = (j) => this.state.marginHeight  * (j + 1)

    

    handleClickLine = (el) => {
        console.log(this.state.course)
        var course = this.state.course
        var checkCourse = true
        const coords = this.state.coordsBoxes.map(boxCoords =>{
            console.log(boxCoords)
            
            if( el[0] === boxCoords.left && el[1] === boxCoords.top && el[2] === boxCoords.left && el[3]  === boxCoords.bottom ){
                boxCoords.sides.left = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.course ? '#33ff33' : '#ff33ff'
                    this.state.course ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    // this.setState({ course: !this.state.course })
                   
                    course = (checkCourse) ? !course : course
                    checkCourse = false

                }
            } else if(el[0] === boxCoords.left && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.top){
                boxCoords.sides.top = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.course ? '#33ff33' : '#ff33ff'
                    this.state.course ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    // this.setState({ course: !this.state.course })
                    
                    course = (checkCourse) ? !course : course
                    checkCourse = false
                }
            } else if(el[0] === boxCoords.right && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.bottom ){
                boxCoords.sides.right = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.course ? '#33ff33' : '#ff33ff'
                    this.state.course ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    // this.setState({ course: !this.state.course })
                    
                    course = (checkCourse) ? !course : course
                    checkCourse = false
                }
            } else if(el[0] === boxCoords.left && el[1].toFixed(5)  === boxCoords.bottom.toFixed(5) && el[2]  === boxCoords.right && el[3].toFixed(5) === boxCoords.bottom.toFixed(5) ){
                boxCoords.sides.bottom = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.course ? '#33ff33' : '#ff33ff'
                    this.state.course ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    // this.setState({ course: !this.state.course })
                    
                    course = (checkCourse) ? !course : course
                    checkCourse = false
                }
            }
            
        })
        
       
        this.setState({coordsBox: coords, course: !course })
        
        
    }

    winner = () =>{
            
        if(this.state.player1CounterFillBox + this.state.player2CounterFillBox === this.state.colomn * this.state.row){
            if(this.state.player1CounterFillBox > this.state.player2CounterFillBox){
                return(
                    <div> playes1 wins game</div>
                )
            }else if (this.state.player1CounterFillBox < this.state.player2CounterFillBox){
                return(
                    <div> playes2 wins game</div>
                )
            }else{
                return(
                    <div> draw game</div>
                )
            }
        }
        
    }
    
    render(){   
        const border = 10;
        const shadow = 10;
       
        const circles = this.circleGridCoords().map((el,index)=>{
            return <Circle key={index} x={el.x} y={el.y} radius={10} fill={this.state.colorCircle} />
        })
       
        const linesVertical = this.lineVerticalCoords().map((el,index)=>{
            return (
                
                <SideLine
                    key = {index}  
                    x0 ={el.x0}
                    y0 = {el.y0}
                    x1 = {el.x1} 
                    y1 = {el.y1}
                    index = {index+1}
                    color = {this.state.colorLine}
                    onClick = {this.handleClickLine}
                    course = {this.state.course}
                />
            )
        })

        const linesHorisontal = this.lineHorisontalCoords().map((el,index)=>{
            return (
                
                <SideLine
                    key = {index} 
                    x0 ={el.x0}
                    y0 = {el.y0}
                    x1 = {el.x1} 
                    y1 = {el.y1}
                    
                    color = {this.state.colorLine}
                    onClick = {this.handleClickLine}
                    course = {this.state.course}
                />
            )
        })
        // console.log(this.state.coordsBoxes)
        const boxes = this.state.coordsBoxes.map((el, index) =>{
            return (
                <Box
                    key = {index}
                    left={el.left}
                    top={el.top}
                    right={el.right}
                    bottom={el.bottom}
                    color={el.color}
                    leftSide = {el.sides.left}
                    topSide = {el.sides.top}
                    rightSide = {el.sides.right}
                    bottomSide = {el.sides.bottom}
                />  
            )
        })



        const player1 = <div> <h1>player 1</h1> fill boxes: {this.state.player1CounterFillBox} </div>
        const player2 = <div> <h1>player 2</h1> fill boxes: {this.state.player2CounterFillBox} </div>
        const winner = this.winner()

        return(
            <div>
                 <div>
                     {player1}
                     {player2}
                     {winner}
                 </div>
                <Stage onMouseMove={this.highlightSide} width={WIDTH+border*2+shadow} height={HEIGHT+border*2+shadow}>
                    <Layer ref= 'layer'> 
                        <Rect
                            x={border}
                            y={border}
                            width={WIDTH+border}
                            height={HEIGHT+border}
                            fill={this.state.colorBody}
                            shadowBlur={shadow}
                            stroke={'#0099ff'} 
                            strokeWidth={border}
                            
                            
                        />  
                        {boxes}
                        {linesVertical}
                        {linesHorisontal}
                        {circles}
  
                    </Layer>
                </Stage> 
            </div>
        )
    }
}
