import React, { Component } from 'react';
import {WIDTH, HEIGHT} from './constants'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Konva from 'konva';
import SideLine from './SideLine'
import Box from './Box'


export default class BoxCanvas extends Component{
    
    state = {
        colorBody: 'grey',
        colorLine: 'brown',
        colorBoxes: 'violet',
        row: 4,
        colomn: 6,
        marginWidth: 0,
        marginHeight: 0
    };

    componentWillMount(){ 
        this.setState({
            marginWidth: WIDTH / (this.state.colomn + 2),
            marginHeight: HEIGHT / (this.state.row + 2)
        })
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
                    bottom: this.gridY(i) + this.state.marginHeight}
                );       
            }
        }
        return coords
    }

    gridX = (i) => this.state.marginWidth * (i + 1) 

    gridY = (j) => this.state.marginHeight  * (j + 1)
 
    handleClick = () => {
        this.setState({
          color: Konva.Util.getRandomColor()
        });
    }
    
    render(){   
        const border = 5;
        const shadow = 5;
        // this.newGame();
        const circles = this.circleGridCoords().map((el,index)=>{
            return <Circle key={index} x={el.x} y={el.y} radius={10} fill="red" />
        })
        // const lines = this.drawLine(20,20,100,20)
        const linesVertical = this.lineVerticalCoords().map((el,index)=>{
            return (
                // this.drawLine(el.x0, el.y0, el.x1, el.y1, index)
                <SideLine 
                    x0 ={el.x0}
                    y0 = {el.y0}
                    x1 = {el.x1} 
                    y1 = {el.y1}
                    index = {index}
                    color = {this.state.colorLine}
                />
            )
        })

        const linesHorisontal = this.lineHorisontalCoords().map((el,index)=>{
            return (
                // this.drawLine(el.x0, el.y0, el.x1, el.y1, index)
                <SideLine 
                    x0 ={el.x0}
                    y0 = {el.y0}
                    x1 = {el.x1} 
                    y1 = {el.y1}
                    index = {index}
                    color = {this.state.colorLine}
                />
            )
        })
        
        const boxes = this.boxesCoords().map((el, index) =>{
            return (
                <Box
                    key = {index}
                    left={el.left}
                    top={el.top}
                    right={el.right}
                    bottom={el.bottom}
                    color={this.state.colorBoxes}
                />  
            )
        })
       
        return(
            <div>
                 
                <Stage onMouseMove={this.highlightSide} width={WIDTH+border*2+shadow} height={HEIGHT+border*2+shadow}>
                    <Layer ref= 'layer'> 
                        <Rect
                            x={border}
                            y={border}
                            width={WIDTH+border}
                            height={HEIGHT+border}
                            fill={this.state.colorBody}
                            shadowBlur={shadow}
                            stroke={'black'} 
                            strokeWidth={border}
                            // onClick={this.handleClick}
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









// boxes = []
    // newGame = () => {
    //     this.playersTurn = Math.random() >= 0.5;

        
    //     for (let i = 0; i < this.state.row; i++ ){
    //         this.boxes[i] = []
    //         for(let j = 0; j < this.state.colomn; j++){
    //             this.boxes[i][j] = new Box(this.gridX(j), this.gridY(i), this.state.marginWidth, this.state.marginHeight);
    //         }
    //     }
    // }

    // drawBoxes = () => {
    //     for (let row of this.boxes){
    //         for(let box of row){
    //             box.drawSides();
    //             box.drawFill();
    //         }
    //     }
    // }

    // highlightSide = (x, y) => {

    //     // clear previous highlighting
    //     for (let row of this.boxes) {
    //         for (let square of row) {
    //             square.highlight = null;
    //         }
    //     }

    //     // check each cell
    //     let rows = this.boxes.length;
    //     let cols = this.boxes[0].length;
    //     var currentCells = [];
    //     OUTER: for (let i = 0; i < rows; i++) {
    //         for (let j = 0; j < cols; j++) {
    //             if (this.boxes[i][j].contains(x, y)) {

    //                 // highlight current
    //                 let side = this.boxes[i][j].highlightSide(x, y);
    //                 if (side != null) {
    //                     currentCells.push({row: i, col: j});
    //                 }

    //                 // determine neighbour
    //                 let row = i, col = j, highlight, neighbour = true;
    //                 if (side == Side.LEFT && j > 0) {
    //                     col = j - 1;
    //                     highlight = Side.RIGHT;
    //                 } else if (side == Side.RIGHT && j < cols - 1) {
    //                     col = j + 1;
    //                     highlight = Side.LEFT;
    //                 } else if (side == Side.TOP && i > 0) {
    //                     row = i - 1;
    //                     highlight = Side.BOT;
    //                 } else if (side == Side.BOT && i < rows - 1) {
    //                     row = i + 1;
    //                     highlight = Side.TOP;
    //                 } else {
    //                     neighbour = false;
    //                 }

    //                 // highlight neighbour
    //                 if (neighbour) {
    //                     this.boxes[row][col].highlight = highlight;
    //                     currentCells.push({row: row, col: col});
    //                 }

    //                 // no need to continue
    //                 break OUTER;
    //             }
    //         }
    //     }
    // }